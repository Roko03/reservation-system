import { authHeaders } from '@/config/constants.config';
import { InfoModel } from '@/model/info.model';

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
}
