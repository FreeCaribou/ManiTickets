// TODO verify login and if good, return JWT
export async function POST(request: Request) {
    const body = await request.json();
    let badPassword = true;
    let token = '';
    if (body.password === process.env.TOKEN) {
        var jwt = require('jsonwebtoken');
        badPassword = false;
        token = jwt.sign({ foo: 'bar' }, process.env.TOKEN);
    }

    return Response.json({
        error: badPassword,
        token,
    });
}