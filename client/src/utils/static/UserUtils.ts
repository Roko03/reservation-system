import { roleDefaultRoute } from '@/config/role-default-routes.config';
import { UserModel, UserRoleName } from '@/model/user.model';

export default class UserUtils {
  public static getDefaultRoute = (role: UserRoleName): string => roleDefaultRoute[role] || '/login';

  public static getUserCountByRole = (users: UserModel[], filter: string): number => {
    if (filter === 'All') {
      return users.length;
    }

    return users.filter(user => user.role === filter).length;
  };
}
