import { DELETE_REQUEST_PARAMETERS, PATCH_REQUEST_PARAMETERS, authHeaders } from '@/config/constants.config';
import { UpdateUserFormValues } from '@/config/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { UserModel } from '@/model/user.model';
import { PaginatedResponse, PayloadResponse } from '@/types/response.type';
import { createQueryParams } from '@/utils/static/queryParams';

export default class UsersService {
  public static async getUsers(pageNumber?: number, search?: string): Promise<PaginatedResponse<UserModel>> {
    try {
      const queryParams = createQueryParams({
        pageNumber,
        search,
      });

      const url = `${import.meta.env.VITE_WS_API_URL}/user${queryParams}`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return { entities: [], totalCount: 0 };
    }
  }

  public static async getUser(id: string): Promise<UserModel | null> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/user/${id}`;
      const response = await fetch(url, { headers: authHeaders() });
      const user: UserModel = await response.json();

      if (!user) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }

  public static async getUserByToken(token: string): Promise<UserModel | null> {
    try {
      const { id } = JSON.parse(token);
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/user/${id}`, { headers: authHeaders() });
      const user: UserModel = await response.json();

      if (!user) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }

  public static async updateUser(
    id: string,
    payload: Pick<UpdateUserFormValues, 'role'>
  ): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/user/${id}`, {
        ...PATCH_REQUEST_PARAMETERS,
        headers: {
          ...PATCH_REQUEST_PARAMETERS.headers,
          ...Object.fromEntries(authHeaders()),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: false, message: body.message };
      }

      return { payload: true };
    } catch (error) {
      return { payload: false };
    }
  }

  public static async deleteUser(id: string): Promise<PayloadResponse<boolean>> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/user/${id}`;
      const response = await fetch(url, {
        ...DELETE_REQUEST_PARAMETERS,
        headers: {
          ...DELETE_REQUEST_PARAMETERS.headers,
          ...Object.fromEntries(authHeaders()),
        },
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: false, message: body.message };
      }

      return { payload: true };
    } catch {
      return { payload: false };
    }
  }
}
