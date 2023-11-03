import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db(process.env.MONGODB_DB);
    const collection = database.collection('data');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult)
    return NextResponse.json({ data: findResult }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ err: e, message: 'there is an error ...' }, { status: 400 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }



}