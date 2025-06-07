import { useEffect } from 'react';

import { Container, Paper, Stack, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Table from '@/components/Table';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import { userTableColumns } from '@/config/table-columns-config';
import { USER_ROLE_NAME_LABEL_MAP } from '@/model/user.model';
import useQueryParams from '@/utils/hooks/useQueryParams';
import { getUsers, toggleDeleteUserModal, toggleUpdateUserModal } from '@/valtio/users/users.action';
import { useUsersStore } from '@/valtio/users/users.store';

import DeleteUserModal from './partials/DeleteUserModal';
import UpdateUserModal from './partials/UpdateUserModal';
import useUsersView from './useUserView';

const Users = () => {
  const { pageNumber, searchString, handleSearch, handlePageChange } = useQueryParams();
  const { renderRowActions } = useUsersView();

  const { isLoading, users, totalCount, deleteUserModalOpen, updateUserModalOpen } = useUsersStore();

  useEffect(() => {
    const page = pageNumber - PAGE_NUMBER;

    getUsers(page, searchString);
  }, [pageNumber, searchString]);

  if (!users) {
    return (
      <Layout>
        <Container maxWidth={false}>
          <Paper elevation={0}>
            <Typography>Nema korisnika</Typography>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <>
      <UpdateUserModal isOpen={updateUserModalOpen} onClose={toggleUpdateUserModal} />
      <DeleteUserModal isOpen={deleteUserModalOpen} onClose={toggleDeleteUserModal} />
      <Layout>
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
            </Stack>
            <Table
              rowActions={renderRowActions}
              showSkeleton={isLoading}
              columns={userTableColumns}
              rows={users.map((user, index) => ({
                key: `#${index + 1}`,
                user: `${user.firstname} ${user.lastName}`,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: USER_ROLE_NAME_LABEL_MAP[user.role],
              }))}
            />
            <Pagination page={pageNumber + 1} onChange={handlePageChange} count={Math.ceil(totalCount / PAGE_SIZE)} />
          </Paper>
        </Container>
      </Layout>
    </>
  );
};

export default Users;
