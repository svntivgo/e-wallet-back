import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  JwtHeader,
  SigningKeyCallback,
  verify,
  VerifyErrors,
  VerifyOptions,
} from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class TokenVerificationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .get('authorization')
      .replace('Bearer ', '');
    return this.getData(token);
  }

  private async getData(token: string): Promise<boolean> {
    const client = jwksClient({
      jwksUri:
        'https://dev-tb7vphht4ydgpnlh.us.auth0.com/.well-known/jwks.json',
    });

    const options: VerifyOptions = { algorithms: ['RS256'] };
    const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
      });
    };

    return new Promise((resolve) => {
      verify(token, getKey, options, (err: VerifyErrors, decoded: any) => {
        // console.log('decoded', decoded);
        // console.log('err', err);
        if (err) resolve(false);
        resolve(true);
      });
    });
  }
}
