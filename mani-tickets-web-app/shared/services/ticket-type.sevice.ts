import { Observable, catchError, map, of, mergeMap, forkJoin, from, tap } from "rxjs";
import { NextResponse } from 'next/server';
import { verifyJwt } from "./token.service";
import { MongoClient, WithId } from 'mongodb';
import { dbNameTicketType, ITicketType, ticketTypeBodyValidator } from "../models/ticket-type";
import { IError } from "../models/error";
import { convertId } from "../models/mongo-object";
import { getOneEvent } from "./event.service";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DB);
const collection = database.collection(dbNameTicketType);

export function getAllTicketTypesImpl(): Observable<ITicketType[]> {
    return from(client.connect()).pipe(
        mergeMap(() => getAllTicketTypes()),
        tap(() => client.close()),
    );
}

export function getAllTicketTypes(): Observable<ITicketType[]> {
    return from(collection.find().toArray()).pipe(
        map((data: WithId<ITicketType>[]) => data.map(d => convertId(d))),
        mergeMap((ticketTypes: ITicketType[]) => 
            ticketTypes.length > 0 ? forkJoin(ticketTypes.map(tt => linkEventToTicketType(tt))) : of([])
        ),
    );
}

function linkEventToTicketType(ticketType: ITicketType): Observable<ITicketType> {
    return getOneEvent(ticketType.eventId.toString()).pipe(
        map(event => {
            return {
                ...ticketType,
                event
            }
        })
    )
}

export function createOneTicketType(body: any): Observable<ITicketType> {
    const errors: IError[] = ticketTypeBodyValidator(body);
    if (errors.length > 0) {
        throw errors;
    }

    return from(client.connect()).pipe(
        mergeMap(() => collection.insertOne(body)),
        mergeMap(result => collection.findOne({ _id: result.insertedId })),
        map((data: WithId<ITicketType>) => data),
    );
}

// TODO protect the route ?
export function getAllTicketTypesRoute(): Observable<any> {
    return this.getAllTicketsType().pipe(
        map(data => NextResponse.json({ data }, { status: 200 }))
    );
}

// TODO type that and better error
export function createTicketTypeRoute(body: any): Observable<any> {
    const errors: IError[] = ticketTypeBodyValidator(body);
    if (errors.length > 0) {
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
    )
}