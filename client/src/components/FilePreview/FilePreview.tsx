import React from 'react';

import { CloseRounded, Download, PictureAsPdf } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { saveAs } from 'file-saver';

import Popup from '@/components/Popup';
import { DocumentDescriptor } from '@/types/document.type';
import useToggleState from '@/utils/hooks/useToggleState';
import FileUtils from '@/utils/static/FileUtils';

import styles from './FilePreview.module.scss';

interface FilePreviewProps {
  item: File | DocumentDescriptor;
  onRemove?: () => void;
  disabled?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ item, onRemove, disabled = false }) => {
  const [popupOpen, togglePopupOpen] = useToggleState();

  const { url, name, type, size } =
    item instanceof File
      ? {
          url: URL.createObjectURL(item),
          name: item.name,
          type: item.type,
          size: FileUtils.calcFileSize(item.size),
        }
      : {
          url: item.url,
          name: item.fileName,
          type: item.mimeType,
          size: item.fileSize,
        };

  const renderFilePreview = () => {
    switch (type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/heic':
      case 'image/svg+xml':
        return (
          <Box onClick={togglePopupOpen}>
            <img src={url} alt={name} className={styles.previewImage} />
          </Box>
        );
      case 'application/pdf':
        return <PictureAsPdf className={styles.previewPDF} />;
      default:
        return <p>Unsupported file type</p>;
    }
  };

  const handleDownload = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      saveAs(xhr.response, name);
    };

    xhr.send();
  };

  return (
    <>
      <Popup open={popupOpen} onClose={togglePopupOpen}>
        <img src={url} alt={name} width="100%" />
      </Popup>
      <Paper variant="outlined" classes={{ root: styles.root }} className={styles.container}>
        <Stack direction="row" alignItems="center">
          {renderFilePreview()}
          <Stack ml={2} paddingRight={6}>
            <Typography variant="body2" className={styles.name}>
              {name}
            </Typography>
            <Typography variant="body3" className={styles.size}>
              {size}
            </Typography>
          </Stack>
          <IconButton className={styles.button} onClick={onRemove || handleDownload} disabled={disabled}>
            {onRemove ? <CloseRounded /> : <Download />}
          </IconButton>
        </Stack>
      </Paper>
    </>
  );
};

export default FilePreview;
