import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Chip, Stack, Typography } from '@mui/material';

import FormInput from '@/components/Forms/FormInput';
import StaticDatePicker from '@/components/StaticDatePicker/StaticDatePicker';
import { CreateReservationFormValues } from '@/config/form-models.config';
import { GetAvailableTimesFormValues } from '@/types/available-time.type';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import DateTime from '@/utils/static/DateTime';
import { getAvailableTimeObject } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';

const ObjectReservationForm = () => {
  const { selectedObject, availableTimes } = useObjectStore();
  const { watch, setValue } = useFormContext<CreateReservationFormValues>();
  const { date, time } = watch();

  const { isMobile } = useBreakpoint();

  const handleTimeSelect = (selectedTime: string) => {
    setValue('time', selectedTime, { shouldValidate: true });
  };

  useEffect(() => {
    const shouldFetchTime = date && selectedObject;

    if (!shouldFetchTime) return;

    const payload: GetAvailableTimesFormValues = {
      objectId: selectedObject.id,
      date: DateTime.formatFull(date),
    };

    getAvailableTimeObject(payload);
  }, [date, selectedObject]);

  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={2} pt={2}>
      <FormInput
        name="date"
        renderInput={({ field }) => <StaticDatePicker value={field.value} onChange={field.onChange} />}
      />
      {availableTimes && availableTimes.length > 0 && (
        <Stack spacing={1} sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Select time
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {availableTimes.map(timeSlot => (
              <Chip
                size="medium"
                key={timeSlot}
                label={timeSlot}
                variant={time === timeSlot ? 'filled' : 'outlined'}
                onClick={() => handleTimeSelect(timeSlot)}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ObjectReservationForm;
