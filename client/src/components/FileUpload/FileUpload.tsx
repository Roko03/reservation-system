import React, { useRef } from 'react';

import { Button } from '@mui/material';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onFileSelected(file);

      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button size="large" variant="contained" onClick={handleButtonClick}>
        Upload image
      </Button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
    </>
  );
};

export default FileUpload;
