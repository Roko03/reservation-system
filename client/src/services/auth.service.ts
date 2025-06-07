import { PATCH_REQUEST_PARAMETERS, POST_REQUEST_PARAMETERS, authHeaders } from '@/config/constants.config';
import { LoginFormValues, SignUpFormValues } from '@/config/forms/form-models.config';
import { ErrorModel } from '@/model/error.model';
import { LoginResponse, PayloadResponse, RegisterResponse, VerifyResponse } from '@/types/response.type';

export default class AuthService {
  public static async register(payload: SignUpFormValues): Promise<PayloadResponse<boolean | null>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/signup`, {
        ...POST_REQUEST_PARAMETERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: null, message: body.message };
      }

      const { message }: RegisterResponse = await response.json();

      return { payload: true, message };
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
      await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/logout`, { headers: authHeaders() });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    }
  }

  public static async verify(token: string): Promise<PayloadResponse<boolean | null>> {
    try {
      const response = await fetch(`${import.meta.env.VITE_WS_API_URL}/auth/verify/${token}`, {
        ...PATCH_REQUEST_PARAMETERS,
      });

      if (!response.ok) {
        const body: ErrorModel = await response.json();

        return { payload: null, message: body.message };
      }

      const { message }: VerifyResponse = await response.json();

      return { payload: true, message };
    } catch {
      return { payload: null, message: 'An unexpected error occurred.' };
    }
  }
}
