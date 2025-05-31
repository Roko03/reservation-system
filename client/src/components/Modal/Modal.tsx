import { JSX } from 'react';

import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import colors from '@/styles/themes/colors';

interface ModalProps extends DialogProps {
  title: string | undefined;
  onClose: () => void;
  description?: string;
  onConfirm?: () => void;
  confirmBtnText?: string;
  ConfirmBtnProps?: ButtonProps;
  hideConfirmButton?: boolean;
  onCancel?: () => void;
  cancelBtnText?: string;
  CancelBtnProps?: ButtonProps;
  hideCancelButton?: boolean;
  titleActions?: JSX.Element | null;
  icon?: React.ReactNode;
  customButton?: React.ReactNode;
}

const Modal = ({
  open,
  title,
  onClose,
  description,
  onConfirm,
  confirmBtnText = 'Confirm',
  ConfirmBtnProps,
  hideConfirmButton = false,
  onCancel,
  cancelBtnText = 'Cancel',
  CancelBtnProps,
  hideCancelButton = false,
  titleActions,
  customButton,
  children,
  ...props
}: ModalProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    {...props}
    sx={{
      '& .MuiDialog-paper': {
        overflow: customButton ? 'visible' : 'hidden',
      },
    }}
  >
    <DialogTitle component="div" display="flex" justifyContent="space-between" alignItems="flex-start">
      <Stack>
        <Typography variant="h2">{title}</Typography>
        {description && (
          <Typography variant="body1" color={colors.black950}>
            {description}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={3}>
        {titleActions && <Box flex="none">{titleActions}</Box>}
        <IconButton size="large" onClick={onClose} sx={{ color: colors.black950 }}>
          <CloseRounded />
        </IconButton>
      </Stack>
    </DialogTitle>
    {children && (
      <DialogContent dividers sx={{ pb: 3 }}>
        {children}
      </DialogContent>
    )}
    {(!hideCancelButton || !hideConfirmButton) && (
      <DialogActions disableSpacing sx={{ gap: customButton ? 1 : 2 }}>
        {!hideCancelButton && (
          <Button onClick={onCancel} size="large" color="secondary" fullWidth {...CancelBtnProps}>
            {cancelBtnText}
          </Button>
        )}
        {customButton ? (
          <Box sx={{ width: '100%' }}>{customButton}</Box>
        ) : (
          !hideConfirmButton && (
            <Button onClick={onConfirm} fullWidth size="large" {...ConfirmBtnProps}>
              {confirmBtnText}
            </Button>
          )
        )}
      </DialogActions>
    )}
  </Dialog>
);

export default Modal;
