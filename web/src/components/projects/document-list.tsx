"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Code,
  File,
  ExternalLink,
  Download,
  Trash2,
  Plus,
  Link as LinkIcon,
  Upload,
} from "lucide-react";
import { format } from "date-fns";

interface Document {
  id: string;
  name: string;
  description: string | null;
  type: string;
  s3Key: string | null;
  externalUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  createdAt: string;
  uploadedBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface DocumentListProps {
  documents: Document[];
  canEdit: boolean;
  onDownload?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  onAddLink?: () => void;
  onUpload?: () => void;
}

const typeIcons: Record<string, typeof FileText> = {
  business: FileText,
  technical: Code,
  general: File,
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentList({
  documents,
  canEdit,
  onDownload,
  onDelete,
  onAddLink,
  onUpload,
}: DocumentListProps) {
  const t = useTranslations("ProjectComponents");

  const typeLabels: Record<string, string> = {
    business: t("typeBusiness"),
    technical: t("typeTechnical"),
    general: t("typeGeneral"),
  };

  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredDocs = documents.filter((doc) => {
    if (filter !== "all" && doc.type !== filter) return false;
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters and actions */}
      <div className="flex items-center gap-4">
        <Input
          placeholder={t("searchDocuments")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t("filterType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allTypes")}</SelectItem>
            <SelectItem value="business">{t("typeBusiness")}</SelectItem>
            <SelectItem value="technical">{t("typeTechnical")}</SelectItem>
            <SelectItem value="general">{t("typeGeneral")}</SelectItem>
          </SelectContent>
        </Select>
        {canEdit && (
          <div className="flex gap-2 ml-auto">
            {onAddLink && (
              <Button variant="outline" size="sm" onClick={onAddLink}>
                <LinkIcon className="h-4 w-4 mr-1" />
                {t("addLink")}
              </Button>
            )}
            {onUpload && (
              <Button size="sm" onClick={onUpload}>
                <Upload className="h-4 w-4 mr-1" />
                {t("upload")}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Document grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
          <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>{documents.length === 0 ? t("noDocumentsYet") : t("noDocumentsMatch")}</p>
          {canEdit && documents.length === 0 && (
            <div className="flex gap-2 justify-center mt-4">
              {onAddLink && (
                <Button variant="outline" size="sm" onClick={onAddLink}>
                  <Plus className="h-4 w-4 mr-1" />
                  {t("addLink")}
                </Button>
              )}
              {onUpload && (
                <Button size="sm" onClick={onUpload}>
                  <Plus className="h-4 w-4 mr-1" />
                  {t("uploadFile")}
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => {
            const Icon = typeIcons[doc.type] || File;
            const isLink = !!doc.externalUrl;

            return (
              <Card key={doc.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {typeLabels[doc.type]} &bull;{" "}
                            {format(new Date(doc.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                        {isLink && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      {doc.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {doc.description}
                        </p>
                      )}
                      {doc.fileSize && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatFileSize(doc.fileSize)}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isLink ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => window.open(doc.externalUrl!, "_blank")}
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            {t("open")}
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7"
                            onClick={() => onDownload?.(doc)}
                          >
                            <Download className="h-3.5 w-3.5 mr-1" />
                            {t("download")}
                          </Button>
                        )}
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-destructive hover:text-destructive"
                            onClick={() => onDelete?.(doc)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
