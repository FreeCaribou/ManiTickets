import { ticketsTypeBodyValidator } from '@/shared/services/tickets-type.sevice';
import { verifyJwt } from '@/shared/services/token.service';
import * as jose from 'jose';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { catchError, map, tap } from 'rxjs';

export async function POST(request: Request) {
    const body = await request.json();
    const authToken = body.authToken;

    const errors = ticketsTypeBodyValidator(body);
    if (errors.error) {
        return NextResponse.json({ errors }, { status: 400 });
    } else {

        // return verifyJwt(authToken).pipe(
        //     tap(() => console.log('halllo')),
        //     catchError(e => {
        //         console.log('big error', e)
        //         return e;
        //     }),
        //     map(() => {
        //         return NextResponse.json({ hello: 'world' }, { status: 200 });
        //     })
        // );

        if (authToken) {
            let decoded;
            let result;
            let data;
            let allData;

            try {
                decoded = await jose.jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN));
    
                const uri = process.env.MONGODB_URI;
                const client = new MongoClient(uri);
                const database = client.db(process.env.MONGODB_DB);
                const collection = database.collection('tickets-type');
                const doc = {
                    label: body.label,
                    price: parseInt(body.price),
                    created_on: new Date().toISOString(),
                }
                result = await collection.insertOne(doc);
                data = await collection.findOne({_id: result.insertedId});
                allData = await collection.find().toArray();
                client.close();
            } catch (e) {
                return Response.json({
                    errors: {error: true, messages: ['Problem probably with DB Connection']}
                }, { status: 400 });
            }
    
            return NextResponse.json({ result, data, allData }, { status: 200 });
        }
    }

    return NextResponse.json({ bad: 'token' }, { status: 400 });
}