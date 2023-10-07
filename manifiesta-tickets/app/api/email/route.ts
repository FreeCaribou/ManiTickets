// TODO protect this route
export async function GET(request: Request) {
    console.log('HELLO we try send mail')

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
    const msg = {
        to: process.env.TEST_MAIL,
        from: process.env.TEST_MAIL,
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    // sgMail.send(msg);

    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log('PERKELE', process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
            console.log(error);
            // console.log(error.response);
        }
    })();

    return Response.json({
        hello: 'world'
    });
}