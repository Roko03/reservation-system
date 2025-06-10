import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Container, Grid, SelectChangeEvent, Stack } from '@mui/material';

import ContactSection from '@/components/ContactSection';
import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';
import ObjectCard from '@/components/ObjectCard';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Select from '@/components/Select';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import { CITY_ARRAY } from '@/model/city.model';
import useQueryParams from '@/utils/hooks/useQueryParams';
import { clearSelectedObject, getObjects, getSelectedObject } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';
import ObjectReservationModal from '@/views/Objects/partials/ObjectReservationModal';

const ObjectsUser = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pageNumber, searchString, handleSearch, handlePageChange } = useQueryParams();
  const { objects, isLoading, totalCount } = useObjectStore();
  const [selectedCity, setSelectedCity] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    getSelectedObject(id);
  }, [id, objects]);

  const closeObjectReservationModal = (): void => {
    clearSelectedObject();
    navigate(`/objects?${searchParams.toString()}`);
  };

  const handleCitySelect = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    if (selectedCity) {
      getObjects(page, searchString, selectedCity);

      return;
    }

    getObjects(page, searchString);
  }, [pageNumber, searchString, selectedCity]);

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path=":id" element={<ObjectReservationModal onClose={closeObjectReservationModal} />} />
        </Routes>
      )}
      <Layout>
        <MainHeroSection title="Objekti" description="Pronađite dostupne termine" />
        <Container component="section" maxWidth={false}>
          <Stack py={4}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} width="fit-content" pb={4}>
              <Search
                placeholder="Pretrazi objekat"
                onChange={handleSearch}
                value={searchString}
                sx={{
                  minWidth: 320,
                }}
              />
              <Select
                value={selectedCity}
                onChange={handleCitySelect}
                options={[
                  { id: '', label: 'All' },
                  ...CITY_ARRAY.map(el => ({
                    id: el,
                    label: el,
                  })),
                ]}
                placeholder="Grad"
                sx={{
                  minWidth: 250,
                }}
              />
            </Stack>
            <Grid container spacing={2}>
              {objects.map(object => (
                <Grid key={object.id} size={{ xs: 12, md: 6, xl: 4 }} justifyContent="center">
                  <ObjectCard {...object} />
                </Grid>
              ))}
            </Grid>
            <Stack pt={4} margin="auto" maxWidth={1100}>
              <Pagination
                page={pageNumber + 1}
                onChange={handlePageChange}
                count={Math.ceil(totalCount / PAGE_SIZE)}
                hideText
              />
            </Stack>
          </Stack>
        </Container>
        <ContactSection />
      </Layout>
    </>
  );
};

export default ObjectsUser;
