// TODO verify login and if good, return JWT
export async function POST(request: Request) {
    const body = await request.json();
    return Response.json({
        hello: 'world but in login - POST', 
        world: body
    });
}