'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';

interface DocumentUploaderProps {
  onUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export function DocumentUploader({
  onUpload,
  acceptedTypes = ['.pdf', '.ifc', '.xlsx', '.docx'],
  maxFiles = 10,
}: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles((prev) => [...prev, ...droppedFiles].slice(0, maxFiles));
    },
    [maxFiles]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, maxFiles);
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, maxFiles));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onUpload(files);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag and drop files here, or{' '}
          <label className="text-primary cursor-pointer hover:underline">
            browse
            <input
              type="file"
              className="hidden"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
            />
          </label>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supported: {acceptedTypes.join(', ')}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full">
            Start Compliance Audit
          </Button>
        </div>
      )}
    </div>
  );
}
