'use client';

import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { cn } from '@/lib/utils';

export function DocumentUpload() {
  const handleFilesSelected = (files: File[]) => {
    console.log('Files selected:', files);
    // TODO: Handle file upload
    // You can implement your upload logic here
    // Example: uploadFiles(files);
  };

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-emerald-600" />
          Document Ingestion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FileUpload
          onFilesSelected={handleFilesSelected}
          accept=".ifc,.pdf,.xlsx,.zip"
          multiple
          maxSize={100 * 1024 * 1024} // 100MB max file size
        >
          {({ isDragging, openFileDialog }) => (
            <div
              className={cn(
                'rounded-lg border-2 border-dashed p-12 text-center transition-colors cursor-pointer',
                isDragging
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                  : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
              )}
              onClick={openFileDialog}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Upload className="h-10 w-10 text-gray-400" />
              </div>
              
              <h3 className="mt-4 text-lg font-semibold">
                {isDragging ? 'Drop files here' : 'Drag & drop files'}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Supports .ifc, .pdf, .xlsx, and .zip archives
              </p>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  <Upload className="h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>
          )}
        </FileUpload>
      </CardContent>
    </Card>
  );
}
