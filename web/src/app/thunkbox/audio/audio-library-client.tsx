"use client";

import { useState, useEffect } from "react";
import { Clock, Play, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AudioReport {
  slug: string;
  title: string;
  description: string;
  duration: string;
  available: boolean;
  audioUrl: string;
}

interface AudioLibraryClientProps {
  audioReports: AudioReport[];
}

export function AudioLibraryClient({ audioReports }: AudioLibraryClientProps) {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [presignedUrls, setPresignedUrls] = useState<Record<string, string>>({});
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null);

  const handlePlay = (slug: string) => {
    setExpandedReport(slug);
  };

  const handleSelectReport = async (slug: string) => {
    if (expandedReport === slug) {
      setExpandedReport(null);
      return;
    }

    // Fetch presigned URL if we don't have it
    if (!presignedUrls[slug]) {
      setLoadingUrl(slug);
      try {
        const res = await fetch(`/api/audio/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPresignedUrls((prev) => ({ ...prev, [slug]: data.url }));
        }
      } catch (error) {
        console.error("Failed to fetch audio URL:", error);
      }
      setLoadingUrl(null);
    }

    setExpandedReport(slug);
  };

  return (
    <div className="space-y-4">
      {audioReports.map((report) => (
        <Card
          key={report.slug}
          className={`transition-all ${
            expandedReport === report.slug ? "ring-2 ring-primary" : ""
          }`}
        >
          <CardHeader
            className="cursor-pointer"
            onClick={() => report.available && handleSelectReport(report.slug)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {report.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {report.duration}
                </div>
                {report.available ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectReport(report.slug);
                    }}
                  >
                    <Play className="mr-1 h-3 w-3" />
                    {expandedReport === report.slug ? "Hide" : "Play"}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          {expandedReport === report.slug && report.available && (
            <CardContent className="border-t pt-4">
              {loadingUrl === report.slug ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : presignedUrls[report.slug] ? (
                <AudioPlayer
                  src={presignedUrls[report.slug]}
                  title={report.title}
                  onPlay={() => handlePlay(report.slug)}
                />
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Failed to load audio. Please try again.
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/learn/reports/${report.slug}`}>
                    <FileText className="mr-1 h-3 w-3" />
                    Read Written Version
                  </Link>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {audioReports.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No audio reports available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
