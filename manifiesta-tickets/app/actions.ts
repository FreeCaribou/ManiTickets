'use server'

import { createOneEvent } from "@/shared/services/event.service";
import { redirect } from "next/navigation";
import { lastValueFrom } from "rxjs";

export async function AcreateNewEvent(formData: FormData) {
    await lastValueFrom(createOneEvent({
        label: formData.get('label'),
        beginDate: formData.get('beginDate'),
        endDate: formData.get('endDate'),
    }));

    redirect('/admin/event');
}