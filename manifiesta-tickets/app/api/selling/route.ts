import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function POST(request: Request) {
  const body = await request.json();

  const authToken = body.authToken;

  if (authToken) {
    var decoded;
    let result;
    let code;
    let uuid;

    try {
      decoded = await jose.jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN));
      const dateIsoString = new Date().getTime();
      uuid = 'uuid-' + dateIsoString;
      code = 'code-' + dateIsoString;

      try {
        result = await sql`INSERT INTO selling_ticket_test(uuid, code, email, created_on) VALUES (${uuid}, ${code}, ${body.email}, ${new Date().toISOString()});`;
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

    } catch (e) {
      return Response.json({
        hello: 'world - bad token but worst'
      });
    }

    return NextResponse.json({ code: code, uuid: uuid }, { status: 200 });
  }

  return NextResponse.json({bad: 'token'}, { status: 400 });
}