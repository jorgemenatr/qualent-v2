"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Music, Upload, Loader2, AlertCircle } from "lucide-react";

interface Report {
  slug: string;
  title: string;
}

interface AudioUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reports: Report[];
  existingSlugs: string[];
  cognitoId: string;
  onSuccess: () => void;
}

const AUDIO_MIME_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/m4a",
  "audio/x-m4a",
];
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

export function AudioUploadDialog({
  open,
  onOpenChange,
  reports,
  existingSlugs,
  cognitoId,
  onSuccess,
}: AudioUploadDialogProps) {
  const [selectedSlug, setSelectedSlug] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Filter reports that don't have audio yet
  const availableReports = reports.filter(
    (r) => !existingSlugs.includes(r.slug)
  );

  const handleSlugChange = (slug: string) => {
    setSelectedSlug(slug);
    const report = reports.find((r) => r.slug === slug);
    if (report) {
      setName(report.title);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!AUDIO_MIME_TYPES.includes(selectedFile.type)) {
      setError("Please select an audio file (MP3, WAV, OGG, M4A)");
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        `File size must be less than 200MB (yours: ${(selectedFile.size / 1024 / 1024).toFixed(1)}MB)`
      );
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Try to extract duration from audio file
    const audio = new Audio();
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      const totalSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      URL.revokeObjectURL(audio.src);
    };
    audio.src = URL.createObjectURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !selectedSlug || !name || !duration) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate duration format (MM:SS or M:SS)
    if (!/^\d{1,2}:\d{2}$/.test(duration)) {
      setError("Duration must be in format MM:SS (e.g., 12:34)");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Step 1: Create record and get upload URL
      const createRes = await fetch("/api/admin/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cognito-id": cognitoId,
        },
        body: JSON.stringify({
          slug: selectedSlug,
          name,
          description: description || null,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          duration,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || "Failed to create audio record");
      }

      setUploadProgress(30);

      // Step 2: Upload file to S3
      const uploadRes = await fetch(createData.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to S3");
      }

      setUploadProgress(100);

      // Success - reset form and close
      resetForm();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedSlug("");
    setName("");
    setDescription("");
    setDuration("");
    setFile(null);
    setError(null);
    setUploadProgress(0);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Upload Audio for Report
          </DialogTitle>
          <DialogDescription>
            Upload an audio version of a report for the listening feature.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="report">Report *</Label>
            <Select value={selectedSlug} onValueChange={handleSlugChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                {availableReports.length === 0 ? (
                  <SelectItem value="_none" disabled>
                    All reports have audio
                  </SelectItem>
                ) : (
                  availableReports.map((report) => (
                    <SelectItem key={report.slug} value={report.slug}>
                      {report.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., AI Automation ROI Guide"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Audio File *</Label>
            <Input
              id="file"
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name} (
                {(file.size / 1024 / 1024).toFixed(1)}MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (MM:SS) *</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 12:34"
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">
              Auto-detected from file, or enter manually
            </p>
          </div>

          {loading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={loading || !file || !selectedSlug || !name || !duration}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
