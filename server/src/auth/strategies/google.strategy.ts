import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleAuthData } from "../types";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            clientID: config.get("GOOGLE_CLIENT_ID"),
            clientSecret: config.get("GOOGLE_SECRET"),
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user: GoogleAuthData = {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
            profileImage: photos[0].value,
            isVerified: emails[0].verified,
        }
        done(null, user);
    }

}