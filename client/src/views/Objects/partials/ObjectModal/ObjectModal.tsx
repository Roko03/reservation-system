import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import Modal from '@/components/Modal';
import Table from '@/components/Table';
import { unavailablePeriodsTableColumns } from '@/config/table-columns-config';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import DateTime from '@/utils/static/DateTime';
import { useObjectStore } from '@/valtio/objects/objects.store';

import styles from './ObjectModal.module.scss';

interface ObjectModalProps {
  onClose: () => void;
}

const ObjectModal = ({ onClose }: ObjectModalProps) => {
  const { selectedObject } = useObjectStore();
  const { name, location, image, workTimeFrom, workTimeTo, unavailablePeriods } = selectedObject || {};
  const { isMobile } = useBreakpoint();

  return (
    <Modal open fullScreen={isMobile} title={`${name || ''}`} onClose={onClose} hideCancelButton hideConfirmButton>
      <Stack direction="column" spacing={2}>
        <Box className={styles.imageWrapper}>
          <img src={image!} alt="cover" className={styles.image} />
        </Box>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body1" fontWeight={600}>
            Lokacija:
          </Typography>
          <Typography variant="body1">{location}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body1" fontWeight={600}>
            Radno vrijeme:
          </Typography>
          <Typography variant="body1">
            {workTimeFrom} - {workTimeTo}
          </Typography>
        </Stack>
        {unavailablePeriods && unavailablePeriods?.length > 0 && (
          <Stack spacing={1}>
            <Typography variant="body1" fontWeight={600}>
              Nedostupni dani
            </Typography>
            <Table
              columns={unavailablePeriodsTableColumns}
              rows={unavailablePeriods.map((period, index) => ({
                key: `#${index + 1}`,
                startDate: DateTime.formatHR(dayjs(period.startDate)),
                endDate: DateTime.formatHR(dayjs(period.endDate)),
              }))}
            />
          </Stack>
        )}
      </Stack>
    </Modal>
  );
};

export default ObjectModal;
