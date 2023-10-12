import * as jose from 'jose';

export async function POST(request: Request) {
    const body = await request.json();
    const authToken = body.authToken;

    if (authToken) {
        var decoded;
        try {
            decoded = await jose.jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN));

            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
            const msg = {
                to: body.email,
                from: process.env.TEST_MAIL,
                subject: 'Manifiesta Ticket Beta Test',
                text: 'Manifiesta Ticket Beta Test',
                html: '<strong>One day we will have a ticket in this mail and it would be nice</strong>',
            };

            sgMail.send(msg);

            (async () => {
                try {
                    console.log('we try sending mail')
                    await sgMail.send(msg);
                    console.log('sending mail is ok')

                    return Response.json({
                        hello: 'world - nice !'
                    });
                } catch (error) {
                    console.log('PERKELE', process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
                    console.log(error);
                    // console.log(error.response);
                }
            })();

        } catch (e) {
            console.log('error', e)
            return Response.json({
                hello: 'world - bad token but worst'
            });
        }

        return Response.json({
            hello: 'world - good !'
        });
    }

    return Response.json({
        hello: 'world - bad token'
    });
}