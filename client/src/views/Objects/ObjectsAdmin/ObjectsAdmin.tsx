import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { Button, Container, Paper, Stack } from '@mui/material';

import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Table from '@/components/Table';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import { objectTableColumns } from '@/config/table-columns-config';
import useQueryParams from '@/utils/hooks/useQueryParams';
import {
  getObjects,
  getSelectedObject,
  toggleCreateObjectModal,
  toggleDeleteObjectModal,
  toggleUpdateObjectModal,
} from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';
import CreateObjectModal from '@/views/Objects/partials/CreateObjectModal';
import DeleteObjectModal from '@/views/Objects/partials/DeleteObjectModal';
import ObjectModal from '@/views/Objects/partials/ObjectModal';
import UpdateObjectModal from '@/views/Objects/partials/UpdateObjectModal';
import useObjectView from '@/views/Objects/useObjectView';

const ObjectsAdmin = () => {
  const { pageNumber, searchString, handleSearch, handlePageChange } = useQueryParams();
  const { renderRowActions, closeObjectModal, selectObject } = useObjectView();
  const { objects, isLoading, totalCount, createObjectModalOpen, updateObjectModalOpen, deleteObjectModalOpen } =
    useObjectStore();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    getSelectedObject(id);
  }, [id, objects]);

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    getObjects(PAGE_SIZE, page, searchString);
  }, [pageNumber, searchString]);

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path=":id" element={<ObjectModal onClose={closeObjectModal} />} />
        </Routes>
      )}
      <CreateObjectModal isOpen={createObjectModalOpen} onClose={toggleCreateObjectModal} />
      <UpdateObjectModal isOpen={updateObjectModalOpen} onClose={toggleUpdateObjectModal} />
      <DeleteObjectModal isOpen={deleteObjectModalOpen} onClose={toggleDeleteObjectModal} />
      <Layout isAdmin>
        <Container maxWidth={false}>
          <Paper elevation={0}>
            <Stack
              direction={{ md: 'row' }}
              justifyContent={{ md: 'space-between' }}
              alignItems={{ md: 'center' }}
              mb={1.5}
              gap={1.5}
              pt={12}
            >
              <Search placeholder="Pretrazi" onChange={handleSearch} value={searchString} />
              <Button variant="contained" size="large" onClick={toggleCreateObjectModal}>
                Kreiraj objekt
              </Button>
            </Stack>
            <Table
              onRowClick={selectObject}
              rowActions={renderRowActions}
              showSkeleton={isLoading}
              columns={objectTableColumns}
              rows={objects.map((object, index) => ({
                key: object.id,
                number: `#${(pageNumber - 1) * PAGE_SIZE + index + 1}`,
                name: object.name,
                location: object.location,
                workTime: `${object.workTimeFrom} - ${object.workTimeTo}`,
              }))}
            />
            <Pagination page={pageNumber} onChange={handlePageChange} count={Math.ceil(totalCount / PAGE_SIZE)} />
          </Paper>
        </Container>
      </Layout>
    </>
  );
};

export default ObjectsAdmin;
