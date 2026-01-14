import { FileUpload } from '@/components/ui/file-upload';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Example 1: Simple upload with default UI
 */
export function SimpleUploadExample() {
  return (
    <FileUpload
      onFilesSelected={(files) => console.log('Files:', files)}
      accept="image/*"
      multiple
    />
  );
}

/**
 * Example 2: Custom styled upload zone
 */
export function CustomUploadExample() {
  return (
    <FileUpload
      onFilesSelected={(files) => console.log('Files:', files)}
      accept=".pdf,.doc,.docx"
      multiple={false}
    >
      {({ isDragging, openFileDialog }) => (
        <div
          onClick={openFileDialog}
          className={`
            flex items-center justify-center p-8 border-2 border-dashed rounded-lg
            cursor-pointer transition-all
            ${isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium">
              {isDragging ? 'Drop document here' : 'Upload Document'}
            </p>
          </div>
        </div>
      )}
    </FileUpload>
  );
}

/**
 * Example 3: Compact button upload
 */
export function ButtonUploadExample() {
  return (
    <FileUpload
      onFilesSelected={(files) => console.log('Files:', files)}
      accept="*"
      multiple
    >
      {({ openFileDialog }) => (
        <Button onClick={openFileDialog} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      )}
    </FileUpload>
  );
}

/**
 * Example 4: With file size validation
 */
export function ValidatedUploadExample() {
  const handleFiles = (files: File[]) => {
    // Additional validation or processing
    files.forEach(file => {
      console.log(`Uploading ${file.name} (${file.size} bytes)`);
    });
  };

  return (
    <FileUpload
      onFilesSelected={handleFiles}
      accept=".jpg,.jpeg,.png"
      multiple
      maxSize={5 * 1024 * 1024} // 5MB limit
    >
      {({ isDragging, openFileDialog }) => (
        <div
          onClick={openFileDialog}
          className={`
            p-6 border-2 border-dashed rounded-lg cursor-pointer
            ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}
          `}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-center text-sm text-gray-600">
            Upload images (max 5MB each)
          </p>
        </div>
      )}
    </FileUpload>
  );
}
