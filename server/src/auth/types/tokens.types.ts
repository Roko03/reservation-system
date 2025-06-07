export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type AToken = Omit<Tokens, 'refresh_token'>;

export type ATokenWithUse = {
  userId: string;
  token: string;
};

export type ATokenOnly = {
  token: string;
};
