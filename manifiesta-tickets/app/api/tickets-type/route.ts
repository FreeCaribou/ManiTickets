import * as jose from 'jose';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const authToken = body.authToken;

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
                price: body.price,
                created_on: new Date().toISOString(),
            }
            result = await collection.insertOne(doc);
            data = await collection.findOne({_id: result.insertedId});
            allData = await collection.find().toArray();
            client.close();
        } catch (e) {
            console.log('error', e)
            return Response.json({
                hello: 'world - bad token but worst'
            });
        }

        return NextResponse.json({ result, data, allData }, { status: 200 });
    }

    return NextResponse.json({ bad: 'token' }, { status: 400 });
}