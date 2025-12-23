"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onTranscriptLoaded: (transcript: string, fileName: string) => void;
  className?: string;
}

export function FileUpload({ onTranscriptLoaded, className }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const parseFile = async (file: File) => {
    setError("");
    
    // Check file type
    const validTypes = ["text/plain", "application/txt", ""];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    
    if (!validTypes.includes(file.type) && fileExt !== "txt") {
      setError("Please upload a .txt file");
      return;
    }

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setError("File is too large. Maximum size is 1MB");
      return;
    }

    try {
      const text = await file.text();
      
      if (!text || text.trim().length === 0) {
        setError("File is empty");
        return;
      }

      setFileName(file.name);
      onTranscriptLoaded(text, file.name);
    } catch (err) {
      console.error("Error reading file:", err);
      setError("Failed to read file");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const clearFile = () => {
    setFileName("");
    setError("");
  };

  return (
    <Card className={cn("bg-zinc-900 border-zinc-800", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Transcript
        </CardTitle>
        <CardDescription>
          Upload a .txt file containing the sales call transcript
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging ? "border-success bg-success/5" : "border-zinc-700 hover:border-zinc-600",
            fileName && "border-success"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {fileName ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-success" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-white">{fileName}</p>
                  <p className="text-sm text-gray-400">File loaded successfully</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-success hover:text-success/80">Click to upload</span>
                  <span className="text-gray-400"> or drag and drop</span>
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  .txt files up to 1MB
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept=".txt,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}

