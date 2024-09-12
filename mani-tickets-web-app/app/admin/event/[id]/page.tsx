import { IEvent } from "@/shared/models/event";
import { getOneEvent } from "@/shared/services/event.service";
import { lastValueFrom } from "rxjs";

export default async function AdminEventIdPage({ params }: { params: { id: string } }) {
    console.log('id of event searched', params.id)

    const event: IEvent = await lastValueFrom(getOneEvent(params.id));

    console.log('and the event ?', event)

    return ('hello');
}