import axios from 'axios';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { from, map, Observable } from 'rxjs';


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
const database = client.db(process.env.MONGODB_DB);
const collection = database.collection('payment');

const vwMerchantId = process.env.VIVA_WALLET_MERCHANT_ID;
const vwApiKey = process.env.VIVA_WALLET_API_KEY

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

export function getToken(): Observable<any> {
    return from(axios.get<any>(
        `https://www.vivapayments.com/api/messages/config/token`,
        {
            auth: {
                username: vwMerchantId,
                password: vwApiKey,
            },
        },
    )).pipe(
        map(r => {
            return NextResponse.json(r.data, { status: 200 });
        })
    );
}
