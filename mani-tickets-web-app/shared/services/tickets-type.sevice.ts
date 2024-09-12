import { Observable, catchError, map, of, mergeMap, forkJoin, from, tap } from "rxjs";
import { NextResponse } from 'next/server';
import { verifyJwt } from "./token.service";
import { MongoClient } from 'mongodb';
import { dbNameTicketType } from "../models/tickets-type";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DB);
const collection = database.collection(dbNameTicketType);

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

export function getAllTicketsType(): Observable<any> {
    return from(client.connect()).pipe(
        mergeMap(() => collection.find().toArray()),
    );
}

// TODO protect the route ?
export function getAllTicketsTypeRoute(): Observable<any> {
    return this.getAllTicketsType().pipe(
        map(data => NextResponse.json({ data }, { status: 200 }))
    );
}

// TODO type that and better error
export function createTicketsTypeRoute(body: any): Observable<any> {
    const errors = ticketsTypeBodyValidator(body);
    if (errors.error) {
        return of(NextResponse.json({ errors }, { status: 400 }));
    }

    const doc = {
        label: body.label,
        price: parseInt(body.price),
        created_on: new Date().toISOString(),
    }

    return verifyJwt(body.authToken).pipe(
        mergeMap(() => from(client.connect())),
        mergeMap(() => collection.insertOne(doc)),
        mergeMap(result => {
            return forkJoin([collection.findOne({ _id: result.insertedId }), collection.find().toArray(), of(result)])
        }),
        map(([data, allData, result]) => {
            return NextResponse.json({ data, allData, result }, { status: 200 });
        }),
        catchError((error) => {
            console.warn('error', error)
            return of(NextResponse.json({ token: 'bad' }, { status: 400 }));
        }),
        tap(() => client.close()),
    )
}