import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // In production, JWT_SECRET should be securely loaded from .env
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_for_local_testing',
    });
  }

  async validate(payload: any) {
    // payload contains the decoded Supabase JWT token
    // The user's UUID is payload.sub
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
