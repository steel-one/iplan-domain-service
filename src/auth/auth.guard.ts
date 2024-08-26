import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { decode, verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

const SUPPORTED_ALGS: jwt.Algorithm[] = ['RS256'];

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwksClient: JwksClient,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getClass(),
    );
    if (isPublic) {
      return true;
    }
    const ctx = context.switchToRpc().getContext();
    const header = ctx.get('Authorization')?.[0];
    const token = (header?.split(' ') ?? [])[1];
    const result = await this.verifyToken(token);
    ctx.userId = result['sub'];
    return !!result;
  }

  async verifyToken(token: string) {
    const jwt = decode(token, { complete: true });
    if (!jwt) {
      return false;
    }
    const key = await this.jwksClient.getSigningKey(jwt?.header.kid);
    try {
      return verify(token, key.getPublicKey(), {
        audience: this.configService.get('Iplan_Domain_Auth_Audience'),
        issuer: this.configService.get('Iplan_Domain_Auth_Issuer'),
        algorithms: SUPPORTED_ALGS,
      });
    } catch (error) {
      return false;
    }
  }
}
