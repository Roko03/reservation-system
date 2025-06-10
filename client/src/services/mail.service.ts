import { POST_REQUEST_PARAMETERS } from '@/config/constants.config';
import { ContactFormValues } from '@/config/forms/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { PayloadResponse } from '@/types/response.type';

export default class MailService {
  public static async contactMe(payload: ContactFormValues): Promise<PayloadResponse<boolean>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/signin`, {
        ...POST_REQUEST_PARAMETERS,
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
}
