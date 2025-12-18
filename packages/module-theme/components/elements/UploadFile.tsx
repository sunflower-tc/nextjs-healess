import { ChangeEvent, DragEvent, useState } from 'react';
import { useToast } from '../toast/hooks';
import { UploadIcon } from './UploadIcon';

export default function UploadFileList({
  loading,
  allowedTypes,
  uploadFiles,
  progress,
  maxWidth,
  maxHeight,
}: {
  loading?: boolean;
  allowedTypes: string[];
  uploadFiles: (files: File) => void;
  progress?: number;
  maxWidth?: number;
  maxHeight?: number;
}) {
  console.log({ allowedTypes });
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const validateAndUpload = (files: FileList) => {
    if (!files || files.length === 0) {
      showToast({ message: 'No Files Selected', type: 'error' });
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type?.split('/')?.[1])) {
        showToast({ message: 'Invalid File Selected', type: 'error' });
        return;
      }
      if (maxWidth || maxHeight) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (
            img.width !== (maxWidth || 0) ||
            img.height !== (maxHeight || 0)
          ) {
            showToast({
              message: `Image dimensions too large. Max allowed: ${maxWidth}x${maxHeight}px`,
              type: 'error',
            });
            URL.revokeObjectURL(img.src);
            return;
          }
          uploadFiles(file);
          URL.revokeObjectURL(img.src);
        };
      } else {
        uploadFiles(file);
      }
    }
  };

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndUpload(e.target.files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndUpload(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border border-dashed border-yellow-600 max-w-sm rounded-lg p-4 transition-all ${
        isDragging ? 'bg-yellow-50 border-2' : ''
      }`}
    >
      <label htmlFor="file" className="cursor-pointer">
        <input
          disabled={!!loading}
          id="file"
          type="file"
          className="hidden"
          onChange={fileHandler}
        />
        <div className="flex border h-full border-tertiaryNeutral-300 rounded-t-md rounded-b-[0] w-full flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon />
          <p className="text-lg font-normal font-RedHat text-caption-100">
            Drag & drop files or Browse
          </p>
        </div>
      </label>
    </div>
  );
}
