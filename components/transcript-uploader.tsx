"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptUploaderProps {
  onTranscriptLoaded: (transcript: string) => void;
  className?: string;
}

export function TranscriptUploader({ onTranscriptLoaded, className }: TranscriptUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    
    // Check file type
    const validTypes = ['text/plain', 'application/txt', 'text/csv'];
    const validExtensions = ['.txt', '.text', '.csv'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      setError("Please upload a text file (.txt, .text, or .csv)");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      const text = await file.text();
      
      if (text.trim().length === 0) {
        setError("The file is empty. Please upload a file with content.");
        return;
      }

      if (text.length < 50) {
        setError("The transcript seems too short. Please upload a complete transcript.");
        return;
      }

      setFileName(file.name);
      onTranscriptLoaded(text);
    } catch (err) {
      setError("Failed to read the file. Please try again.");
      console.error("File read error:", err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn("bg-zinc-900 border-zinc-800", className)}>
      <CardContent className="pt-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging
              ? "border-success bg-success/5"
              : "border-zinc-700 hover:border-zinc-600"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.text,.csv,text/plain,application/txt,text/csv"
            onChange={handleFileInput}
            className="hidden"
            id="transcript-upload"
          />

          {fileName ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 p-4 bg-success/10 rounded-lg border border-success/30">
                <FileText className="h-10 w-10 text-success flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-lg">{fileName}</p>
                  <p className="text-sm text-success">✓ Ready to analyze</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-gray-400 hover:text-white hover:bg-zinc-800"
                  title="Remove file and upload another"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 italic">
                Scroll down to see the analyze button
              </p>
            </div>
          ) : (
            <>
              <Upload className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Upload Transcript File</h3>
              <p className="text-gray-400 mb-6">
                Drag and drop your transcript file here, or click to browse
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="lg"
                className="bg-success hover:bg-success/90 text-white font-semibold px-6 py-5"
              >
                <Upload className="mr-2 h-5 w-5" />
                Choose File
              </Button>
              <p className="text-xs text-gray-500 mt-6">
                Supports .txt, .text, and .csv files • Maximum 5MB
              </p>
            </>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

