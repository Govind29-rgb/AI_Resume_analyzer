import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onFileSelect: (file: File | null) => void;
};

const formatSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileUploader: React.FC<Props> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0] || null;
    setFile(selected);
    onFileSelect(selected);
  }, [onFileSelect]);

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition"
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded">
            <div className="flex items-center space-x-3">
              <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button onClick={removeFile} className="p-2 hover:bg-red-100 rounded">
              <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <img src="/icons/info.svg" alt="upload" className="w-12 h-12" />
            </div>
            <p className="text-lg text-gray-500">
              <span className="font-semibold text-gray-700">Click to Upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-400">PDF only (Max 20 MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
