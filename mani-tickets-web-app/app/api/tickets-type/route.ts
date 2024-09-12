import { createTicketsTypeRoute, getAllTicketsTypeRoute } from '@/shared/services/tickets-type.sevice';
import { lastValueFrom } from 'rxjs';

export async function POST(request: Request) {
    const body = await request.json();
    return await lastValueFrom(createTicketsTypeRoute(body));
}

export async function GET() {
    return await lastValueFrom(getAllTicketsTypeRoute());
}