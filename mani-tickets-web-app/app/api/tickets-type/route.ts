import { createTicketTypeRoute, getAllTicketTypesRoute } from '@/shared/services/ticket-type.sevice';
import { lastValueFrom } from 'rxjs';

export async function POST(request: Request) {
    const body = await request.json();
    return await lastValueFrom(createTicketTypeRoute(body));
}

export async function GET() {
    return await lastValueFrom(getAllTicketTypesRoute());
}