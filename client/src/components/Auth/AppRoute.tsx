import { Navigate } from 'react-router-dom';

import Loader from '@/components/Loader';
import { UserRole, UserRoleName } from '@/model/user.model';
import UserUtils from '@/utils/static/UserUtils';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtion/auth/auth.store';
import Error403 from '@/views/Error403';

interface AppRouteProps {
  variant: 'anonymous' | 'protected';
  component: React.ReactElement;
  accessLevel?: UserRoleName[];
}

const AppRoute = ({ component, variant, accessLevel }: AppRouteProps) => {
  const { user, authenticating } = useAuthStore();

  if (authenticating) {
    return <Loader />;
  }

  if (user) {
    const hasAccess = roleGuard(user.role, accessLevel);

    if (!hasAccess) {
      return <Error403 />;
    }

    return variant === 'anonymous' ? <Navigate to={UserUtils.getDefaultRoute(user.role as UserRole[])} /> : component;
  }

  return variant === 'anonymous' ? component : <Navigate to="/login" />;
};

export default AppRoute;
