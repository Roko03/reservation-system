import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Container, Grid, Stack } from '@mui/material';

import ContactSection from '@/components/ContactSection';
import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';
import ObjectCard from '@/components/ObjectCard';
import Pagination from '@/components/Pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import useQueryParams from '@/utils/hooks/useQueryParams';
import { clearSelectedObject, getObjects, getSelectedObject } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';
import ObjectReservationModal from '@/views/Objects/partials/ObjectReservationModal';

const ObjectsUser = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pageNumber, handlePageChange } = useQueryParams();
  const { objects, isLoading, totalCount } = useObjectStore();

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

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    getObjects(page);
  }, [pageNumber]);

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
