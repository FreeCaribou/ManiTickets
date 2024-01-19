import { Observable, catchError, map, of, mergeMap, forkJoin } from "rxjs";
import { NextResponse } from 'next/server';
import { verifyJwt } from "./token.service";
import { MongoClient } from 'mongodb';

// TODO type and return
export function ticketsTypeBodyValidator(body: any) {
    let error = false;
    const messages = [];

    if (!body.label) {
        error = true;
        messages.push('Tickets type need a label');
    }

    if (!body.price || !parseInt(body.price)) {
        error = true;
        messages.push('Tickets type need a price - price need to be a number');
    }

    return { error, messages }
}

// TODO type that and better error
export function createTicketsType(body: any): Observable<any> {
    const errors = ticketsTypeBodyValidator(body);
    if (errors.error) {
        return of(NextResponse.json({ errors }, { status: 400 }));
    }

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection('tickets-type');
    const doc = {
        label: body.label,
        price: parseInt(body.price),
        created_on: new Date().toISOString(),
    }

    return verifyJwt(body.authToken).pipe(
        mergeMap(jwt => {
            return collection.insertOne(doc);
        }),

        mergeMap(result => {
            return forkJoin([collection.findOne({_id: result.insertedId}), collection.find().toArray(), of(result)])
        }),

        map(([data, allData, result]) => {
            client.close();
            return NextResponse.json({ data, allData, result }, { status: 200 });
        }),

        catchError((error) => {
            console.warn('error', error)
            client.close();
            return of(NextResponse.json({ token: 'bad' }, { status: 400 }));
        }),
    )
}