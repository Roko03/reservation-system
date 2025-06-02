import React, { useState } from 'react';

import { Upload } from '@mui/icons-material';
import { Box, Fab, Stack, Typography } from '@mui/material';
import cx from 'clsx';

import colors from '@/styles/themes/colors';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import FileUtils from '@/utils/static/FileUtils';
import { acceptedAppendixTypes, acceptedImageTypes, acceptedMimeTypes } from '@/utils/static/FormValidator';

import styles from './FileInput.module.scss';

interface FileInputProps {
  onChange: (file: File) => void;
  acceptedFileTypes?: string;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, acceptedFileTypes = acceptedMimeTypes }) => {
  const [drag, setDrag] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { isMobile } = useBreakpoint();

  const handleFileDragEnter = () => setDrag(true);
  const handleFileDragLeave = () => setDrag(false);
  const handleFileDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    setDrag(false);
    setError('');

    if (files) {
      Array.from(files).forEach(async file => {
        if (!acceptedFileTypes.includes(file.type)) {
          setError('One or more files have unsupported type.');

          return;
        }

        const isImage = acceptedImageTypes.includes(file.type);
        const fileToSend = isImage ? await FileUtils.resizeImageFile(file) : file;

        onChange(fileToSend);
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      Array.from(files).forEach(async file => {
        if (!acceptedFileTypes.includes(file.type)) {
          setError('One or more files have unsupported type.');

          return;
        }

        const isImage = acceptedImageTypes.includes(file.type);
        const fileToSend = isImage ? await FileUtils.resizeImageFile(file) : file;

        onChange(fileToSend);
      });
    }
  };

  const renderAcceptedFileTypes = () => {
    if (acceptedFileTypes === acceptedAppendixTypes) {
      return '.pdf';
    }

    return '.jpeg,.jpg,.png,.pdf';
  };

  return (
    <>
      <Box
        className={cx(styles.container, { [styles.active]: drag })}
        onDragEnter={handleFileDragEnter}
        onDragLeave={handleFileDragLeave}
        onDragOver={handleFileDragOver}
        onDrop={handleFileDrop}
      >
        {drag ? (
          <Typography variant="body1">Release to upload</Typography>
        ) : (
          <Stack direction="row" spacing={3} alignItems="center">
            <Fab className={styles.icon}>
              <Upload />
            </Fab>
            <Stack>
              <Typography variant="body1">
                <label>
                  <input
                    type="file"
                    multiple
                    accept={acceptedFileTypes}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  Click to upload
                </label>{' '}
                {!isMobile && 'or drag and drop'}
              </Typography>
              <Typography variant="body2" color={colors.black50}>
                {renderAcceptedFileTypes()}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Box>
      {error && (
        <Typography variant="body2" color={colors.red100} mt={1}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default FileInput;
