export type GoogleAuthData = {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    isVerified: boolean
};

export type GoogleAuthTokenData = Partial<GoogleAuthData> & { access_token: string }