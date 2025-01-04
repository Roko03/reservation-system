export type Tokens = {
    access_token: string;
    refresh_token: string;
}

export type AToken = Omit<Tokens, "refresh_token">