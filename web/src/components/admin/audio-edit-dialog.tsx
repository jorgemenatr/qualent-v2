"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Music, Save, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface AudioFile {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  s3Key: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  duration: string;
  available: boolean;
}

interface AudioEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audioFile: AudioFile | null;
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

export function AudioEditDialog({
  open,
  onOpenChange,
  audioFile,
  cognitoId,
  onSuccess,
}: AudioEditDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [available, setAvailable] = useState(true);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Populate form when audioFile changes
  useEffect(() => {
    if (audioFile) {
      setName(audioFile.name);
      setDescription(audioFile.description || "");
      setDuration(audioFile.duration);
      setAvailable(audioFile.available);
      setReplaceFile(null);
      setError(null);
    }
  }, [audioFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setReplaceFile(null);
      return;
    }

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

    setReplaceFile(selectedFile);
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

  const handleSave = async () => {
    if (!audioFile || !name || !duration) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate duration format
    if (!/^\d{1,2}:\d{2}$/.test(duration)) {
      setError("Duration must be in format MM:SS (e.g., 12:34)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build update payload
      const payload: {
        name: string;
        description: string | null;
        duration: string;
        available: boolean;
        replaceFile?: {
          fileName: string;
          fileSize: number;
          mimeType: string;
        };
      } = {
        name,
        description: description || null,
        duration,
        available,
      };

      if (replaceFile) {
        payload.replaceFile = {
          fileName: replaceFile.name,
          fileSize: replaceFile.size,
          mimeType: replaceFile.type,
        };
      }

      // Update the record
      const updateRes = await fetch(`/api/admin/audio/${audioFile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cognito-id": cognitoId,
        },
        body: JSON.stringify(payload),
      });

      const updateData = await updateRes.json();

      if (!updateRes.ok || !updateData.success) {
        throw new Error(updateData.error || "Failed to update audio");
      }

      // If replacing file, upload to S3
      if (replaceFile && updateData.uploadUrl) {
        const uploadRes = await fetch(updateData.uploadUrl, {
          method: "PUT",
          body: replaceFile,
          headers: {
            "Content-Type": replaceFile.type,
          },
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload replacement file to S3");
        }
      }

      // Success
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setReplaceFile(null);
      setError(null);
    }
    onOpenChange(newOpen);
  };

  if (!audioFile) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Edit Audio: {audioFile.slug}
          </DialogTitle>
          <DialogDescription>
            Update metadata or replace the audio file.
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
            <Label htmlFor="edit-name">Display Name *</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., AI Automation ROI Guide"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-duration">Duration (MM:SS) *</Label>
            <Input
              id="edit-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 12:34"
              className="w-32"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="edit-available">Available</Label>
              <p className="text-xs text-muted-foreground">
                Show in the audio library
              </p>
            </div>
            <Switch
              id="edit-available"
              checked={available}
              onCheckedChange={setAvailable}
            />
          </div>

          <div className="space-y-2 pt-2 border-t">
            <Label htmlFor="edit-file" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Replace Audio File
            </Label>
            <Input
              id="edit-file"
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
            {replaceFile ? (
              <p className="text-sm text-muted-foreground">
                New file: {replaceFile.name} (
                {(replaceFile.size / 1024 / 1024).toFixed(1)}MB)
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Current: {audioFile.fileName} (
                {(audioFile.fileSize / 1024 / 1024).toFixed(1)}MB)
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || !name || !duration}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
