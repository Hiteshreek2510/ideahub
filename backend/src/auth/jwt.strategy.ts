import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // In production, SUPABASE_JWT_SECRET should be securely loaded from .env
      secretOrKey: process.env.SUPABASE_JWT_SECRET || 'fallback-secret-for-dev',
    });
  }

  async validate(payload: any) {
    // payload contains the decoded Supabase JWT token
    // The user's UUID is payload.sub
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
