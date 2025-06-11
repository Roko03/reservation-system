import { DELETE_REQUEST_PARAMETERS, PATCH_REQUEST_PARAMETERS, authHeaders } from '@/config/constants.config';
import { ProfileFormValues } from '@/config/forms/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { ReservationModel } from '@/model/reservation.model';
import { UserModel } from '@/model/user.model';
import { PaginatedResponse, PayloadResponse } from '@/types/response.type';
import { createQueryParams } from '@/utils/static/queryParams';

export default class MeService {
  public static async getProfileReservations(
    pageNumber?: number
  ): Promise<PaginatedResponse<Omit<ReservationModel, 'user'>>> {
    try {
      const queryParams = createQueryParams({
        pageSize: 12,
        pageNumber,
      });

      const url = `${import.meta.env.VITE_WS_API_URL}/me/reservation${queryParams}`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return { entities: [], totalCount: 0 };
    }
  }

  public static async updateProfile(payload: ProfileFormValues): Promise<PayloadResponse<boolean | UserModel>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/me`, {
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

      return await response.json();
    } catch (error) {
      return { payload: false };
    }
  }

  public static async deleteProfile(): Promise<PayloadResponse<boolean>> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/me`;
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
