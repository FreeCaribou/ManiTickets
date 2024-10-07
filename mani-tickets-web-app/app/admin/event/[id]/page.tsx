import { AdminEventDetail } from "@/shared/components/page-components/Admin/Event/AdminEventDetail";
import { IEvent } from "@/shared/models/event";
import { getOneEventImpl } from "@/shared/services/event.service";
import { lastValueFrom } from "rxjs";

export default async function Page({ params }: { params: { id: string } }) {
    const event: IEvent = await lastValueFrom(getOneEventImpl(params.id));

    return (<AdminEventDetail event={event} />);
}