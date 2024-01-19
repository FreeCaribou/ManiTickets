import * as jose from 'jose';
import { Observable, of, from, catchError } from 'rxjs';

export function verifyJwt(token): Observable<any> {
    let error = false;
    const messages = [];
    return from(jose.jwtVerify(token, new TextEncoder().encode(process.env.TOKEN))).pipe(
        catchError((err, caught) => {
            console.log('eeeeeerror', err, caught)
            return caught;
        })
    );
}