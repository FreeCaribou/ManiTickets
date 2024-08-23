import { postPayment } from "@/shared/services/payment.service";
import { lastValueFrom } from "rxjs";

export async function POST(request: Request) {
    const body = await request.json();
    console.log('a payment request arrived', body)
    return await lastValueFrom(postPayment(body));
}