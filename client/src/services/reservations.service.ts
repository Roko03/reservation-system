import {
  DELETE_REQUEST_PARAMETERS,
  PATCH_REQUEST_PARAMETERS,
  POST_REQUEST_PARAMETERS,
  authHeaders,
} from '@/config/constants.config';
import { CreateReservationFormValues, UpdateReservationFormValues } from '@/config/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { ReservationFilters, ReservationModel } from '@/model/reservation.model';
import { PaginatedResponse, PayloadResponse } from '@/types/response.type';
import { createQueryParams } from '@/utils/static/queryParams';

export default class ReservationsService {
  public static async getReservations(
    pageNumber?: number,
    filters?: ReservationFilters
  ): Promise<PaginatedResponse<ReservationModel>> {
    try {
      const queryParams = createQueryParams({
        pageNumber,
        objectId: filters?.objectId,
        status: filters?.status,
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      });

      const url = `${import.meta.env.VITE_WS_API_URL}/reservation${queryParams}`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return { entities: [], totalCount: 0 };
    }
  }

  public static async makeReservation(
    id: string,
    payload: CreateReservationFormValues
  ): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/object/${id}/reservation`, {
        ...POST_REQUEST_PARAMETERS,
        headers: {
          ...POST_REQUEST_PARAMETERS.headers,
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

  public static async editReservation(
    id: string,
    payload: UpdateReservationFormValues
  ): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/me/reservation/${id}`, {
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

  public static async deleteReservation(id: string): Promise<PayloadResponse<boolean>> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/me/reservation/${id}`;
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

  public static async approveReservation(id: string): Promise<PayloadResponse<boolean>> {
    try {
      const payload = { approved: true };

      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/reservation/${id}`, {
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

  public static async rejectReservation(id: string): Promise<PayloadResponse<boolean>> {
    try {
      const payload = { approved: false };

      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/reservation/${id}`, {
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
}
