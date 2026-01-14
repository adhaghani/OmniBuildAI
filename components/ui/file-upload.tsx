'use client';

import { useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  children?: (props: {
    isDragging: boolean;
    openFileDialog: () => void;
  }) => ReactNode;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFilesSelected,
  accept = '*',
  multiple = true,
  maxSize,
  children,
  className,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [inputId] = useState(() => `file-upload-${Math.random().toString(36).substr(2, 9)}`);

  const validateFiles = useCallback((files: File[]): File[] => {
    if (!maxSize) return files;
    
    return files.filter(file => {
      if (file.size > maxSize) {
        console.warn(`File ${file.name} exceeds maximum size of ${maxSize} bytes`);
        return false;
      }
      return true;
    });
  }, [maxSize]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, [disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [disabled, validateFiles, onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
    
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [disabled, validateFiles, onFilesSelected]);

  const openFileDialog = useCallback(() => {
    if (disabled) return;
    document.getElementById(inputId)?.click();
  }, [disabled, inputId]);

  return (
    <>
      <input
        type="file"
        id={inputId}
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'transition-colors',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
      >
        {children ? (
          children({ isDragging, openFileDialog })
        ) : (
          <div
            className={cn(
              'rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer',
              isDragging
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
            )}
            onClick={openFileDialog}
          >
            <p className="text-sm text-muted-foreground">
              {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
