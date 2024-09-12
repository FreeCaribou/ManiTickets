'use server'

import { IEvent } from "@/shared/models/event";
import { ITicketType } from "@/shared/models/ticket-type";
import { createOneEvent } from "@/shared/services/event.service";
import { createOneTicketType } from "@/shared/services/ticket-type.sevice";
import { redirect } from "next/navigation";
import { lastValueFrom } from "rxjs";

export async function AcreateNewEvent(formData: FormData) {
    const newEvent: IEvent = await lastValueFrom(createOneEvent({
        label: formData.get('label'),
        beginDate: new Date(formData.get('beginDate').toString()),
        endDate: new Date(formData.get('endDate').toString()),
    }));

    redirect('/admin/event/' + newEvent._id);
}

export async function AcreateNewTicketType(formData: FormData) {
    const newTicketType: ITicketType = await lastValueFrom(createOneTicketType({
        label: formData.get('label'),
        price: formData.get('price'),
        eventId: formData.get('eventId'),

    }));

    redirect('/admin/ticket-type');
    // redirect('/admin/ticket-type/' + newTicketType._id);
}