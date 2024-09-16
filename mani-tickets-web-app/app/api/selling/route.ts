import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const authToken = body.authToken;

  if (authToken) {
    let decoded;
    let result;
    let code;
    let uuid;

    try {
      decoded = await jose.jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN));
      const dateIsoString = new Date().getTime();
      uuid = 'uuid-' + dateIsoString;
      code = 'code-' + dateIsoString;

      const uri = process.env.MONGODB_URI;
      const client = new MongoClient(uri);
      const database = client.db(process.env.MONGODB_DB);
      const collection = database.collection('command');
      const doc = {
        uuid,
        code,
        email: process.env.TEST_MAIL,
        created_on: new Date().toISOString(),
      }
      result = await collection.insertOne(doc);
    } catch (e) {
      return Response.json({
        hello: 'world - bad token but worst'
      });
    }

    return NextResponse.json({ code, uuid, result }, { status: 200 });
  }

  return NextResponse.json({bad: 'token'}, { status: 400 });
}