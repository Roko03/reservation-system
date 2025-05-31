import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtion/auth/auth.store';

import NavigationMobileAdmin from './NavigationMobileAdmin';
import NavigationMobileSimple from './NavigationMobileSimple';

interface NavigationMobileProps {
  handleClose: () => void;
}

const NavigationMobile = ({ handleClose }: NavigationMobileProps) => {
  const { user } = useAuthStore();

  const isAdmin = user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN]);

  if (isAdmin) {
    return <NavigationMobileAdmin handleClose={handleClose} />;
  }

  return <NavigationMobileSimple handleClose={handleClose} />;
};

export default NavigationMobile;
