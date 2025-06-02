import {
  DELETE_REQUEST_PARAMETERS,
  PATCH_REQUEST_PARAMETERS,
  POST_REQUEST_PARAMETERS,
  authHeaders,
} from '@/config/constants.config';
import { CreateObjectTimeStringFormValues } from '@/config/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { ObjectModel } from '@/model/object.model';
import { PaginatedResponse, PayloadResponse } from '@/types/response.type';
import { createQueryParams } from '@/utils/static/queryParams';

export default class ObjectsService {
  public static async getObjects(pageNumber?: number, search?: string): Promise<PaginatedResponse<ObjectModel>> {
    try {
      const queryParams = createQueryParams({
        pageNumber,
        search,
      });

      const url = `${import.meta.env.VITE_WS_API_URL}/object${queryParams}`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return { entities: [], totalCount: 0 };
    }
  }

  public static async getObject(id: string): Promise<ObjectModel | null> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/object/${id}`;
      const response = await fetch(url, { headers: authHeaders() });
      const object: ObjectModel = await response.json();

      if (!object) {
        return null;
      }

      return object;
    } catch {
      return null;
    }
  }

  public static async createObject(payload: CreateObjectTimeStringFormValues): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/object`, {
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
    } catch {
      return { payload: false };
    }
  }

  public static async editObject(
    id: string,
    payload: CreateObjectTimeStringFormValues
  ): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/object/${id}`, {
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

  public static async deleteObject(id: string): Promise<PayloadResponse<boolean>> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/object/${id}`;
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
