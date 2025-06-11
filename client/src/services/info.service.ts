import { authHeaders } from '@/config/constants.config';
import { InfoModel, InfoReservationModel } from '@/model/info.model';
import { createQueryParams } from '@/utils/static/queryParams';

export default class InfoService {
  public static async getInfo(): Promise<InfoModel | null> {
    try {
      const url = `${import.meta.env.VITE_WS_API_URL}/info`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return null;
    }
  }

  public static async getReservations(year?: number): Promise<InfoReservationModel | null> {
    try {
      const queryParams = createQueryParams({
        year,
      });

      const url = `${import.meta.env.VITE_WS_API_URL}/info/reservations${queryParams}`;

      const response = await fetch(url, { headers: authHeaders() });

      return await response.json();
    } catch {
      return null;
    }
  }
}
