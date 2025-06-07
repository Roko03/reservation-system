import { POST_REQUEST_PARAMETERS, authHeaders } from '@/config/constants.config';
import { LoginFormValues, SignUpFormValues } from '@/config/forms/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { LoginResponse, PayloadResponse } from '@/types/response.type';

export default class AuthService {
  public static async register(payload: SignUpFormValues): Promise<PayloadResponse<string | null>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/signup`, {
        ...POST_REQUEST_PARAMETERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: null, message: body.message };
      }

      const { userId, token }: LoginResponse = await response.json();

      return { payload: JSON.stringify({ id: userId, accessToken: token }) };
    } catch {
      return { payload: null, message: 'An unexpected error occurred.' };
    }
  }

  public static async login(payload: LoginFormValues): Promise<PayloadResponse<string | null>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/signin`, {
        ...POST_REQUEST_PARAMETERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: null, message: body.message };
      }

      const { userId, token }: LoginResponse = await response.json();

      return { payload: JSON.stringify({ id: userId, accessToken: token }) };
    } catch {
      return { payload: null, message: 'An unexpected error occurred.' };
    }
  }

  public static async logout(): Promise<void> {
    try {
      await fetch(`${import.meta.env.VITE_CAPAX_WS_API_URL}/auth/logout`, { headers: authHeaders() });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    }
  }
}
