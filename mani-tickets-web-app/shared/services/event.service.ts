import { Observable, map, mergeMap, from, tap } from "rxjs";
import { MongoClient, WithId, ObjectId } from 'mongodb';
import { dbNameEvent, eventBodyValidator, IEvent } from "../models/event";
import { IError } from "../models/error";
import { convertId } from "../models/mongo-object";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DB);
const collection = database.collection(dbNameEvent);

export function getAllEvents(): Observable<IEvent[]> {
    return from(client.connect()).pipe(
        mergeMap(() => collection.find().toArray()),
        map((data: WithId<IEvent>[]) => data.map(d => convertId(d))),
        tap(() => client.close()),
    );
}

export function getOneEvent(id: string): Observable<IEvent> {
    return from(client.connect()).pipe(
        mergeMap(() => collection.findOne({ _id: new ObjectId(id) })),
        map((data: WithId<IEvent>) => convertId(data)),
    );
}

export function createOneEvent(body: any): Observable<IEvent> {
    const errors: IError[] = eventBodyValidator(body);
    if (errors.length > 0) {
        throw errors;
    }

    return from(client.connect()).pipe(
        mergeMap(() => collection.insertOne(body)),
        mergeMap(result => collection.findOne({ _id: result.insertedId })),
        map((data: WithId<IEvent>) => data),
        tap(() => client.close()),
    );
}