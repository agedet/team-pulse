import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
