import { authHeaders } from '@/config/constants.config';
import { ObjectModel } from '@/model/object.model';
import { PaginatedResponse } from '@/types/response.type';
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
}
