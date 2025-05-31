import { roleDefaultRoute } from '@/config/role-default-routes.config';
import { UserModel, UserRole } from '@/model/user.model';

export default class UserUtils {
  public static getDefaultRoute = (roles: UserRole[]): string => {
    const matchingRole = roles.find(({ roleName }) => roleDefaultRoute[roleName]);

    return matchingRole ? roleDefaultRoute[matchingRole.roleName] : '/login';
  };

  public static getUserCountByRole = (users: UserModel[], filter: string): number => {
    if (filter === 'All') {
      return users.length;
    }

    return users.filter(user => user.role.some(role => role.roleName === filter)).length;
  };
}
