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

import CreateObjectModal from './partials/CreateObjectModal';
import DeleteObjectModal from './partials/DeleteObjectModal';
import ObjectModal from './partials/ObjectModal';
import UpdateObjectModal from './partials/UpdateObjectModal';
import useObjectView from './useObjectView';

const Objects = () => {
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

    getObjects(page, searchString);
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
      <Layout>
        <Container maxWidth={false}>
          <Paper elevation={0}>
            <Stack
              direction={{ md: 'row' }}
              justifyContent={{ md: 'space-between' }}
              alignItems={{ md: 'center' }}
              mb={1.5}
              gap={1.5}
            >
              <Search placeholder="Search" onChange={handleSearch} value={searchString} />
              <Button variant="contained" size="large" onClick={toggleCreateObjectModal}>
                Create
              </Button>
            </Stack>
            <Table
              onRowClick={selectObject}
              rowActions={renderRowActions}
              showSkeleton={isLoading}
              columns={objectTableColumns}
              rows={objects.map((object, index) => ({
                key: object.id,
                number: `#${index + 1}`,
                name: object.name,
                location: object.location,
                workTime: `${object.workTimeFrom} - ${object.workTimeTo}`,
              }))}
            />
            <Pagination page={pageNumber + 1} onChange={handlePageChange} count={Math.ceil(totalCount / PAGE_SIZE)} />
          </Paper>
        </Container>
      </Layout>
    </>
  );
};

export default Objects;
