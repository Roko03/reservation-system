import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

import ObjectsAdmin from './ObjectsAdmin/ObjectsAdmin';
import ObjectsUser from './ObjectsUser';

const Objects = () => {
  const { user } = useAuthStore();
  const isAdmin = user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN]);

  if (!isAdmin) {
    return <ObjectsUser />;
  }

  return <ObjectsAdmin />;
};

export default Objects;
