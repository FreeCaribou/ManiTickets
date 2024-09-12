import * as jose from 'jose';
import { Observable, of, from, catchError } from 'rxjs';

// TODO try to manage error message here
export function verifyJwt(token): Observable<any> {
    return from(jose.jwtVerify(token, new TextEncoder().encode(process.env.TOKEN)));
}