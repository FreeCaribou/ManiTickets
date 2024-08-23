import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { from, map, Observable } from 'rxjs';


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DB);
const collection = database.collection('payment');

export function getAllPayment(): Observable<any> {
    return from(collection.find().toArray());
}

export function postPayment(body: any): Observable<any> {

    const doc = {
        label: body?.EventData?.TransactionId || 'lol wrong data',
        created_on: new Date().toISOString(),
    }

    return from(collection.insertOne(doc)).pipe(
        map(r => {
            return NextResponse.json({ r }, { status: 200 });
        })
    );
}