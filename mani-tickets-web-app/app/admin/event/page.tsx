import { AdminEvent } from "@/shared/components/page-components/Admin/Event/AdminEvent";
import { IEvent } from "@/shared/models/event"
import { getAllEventsImpl } from "@/shared/services/event.service"
import { lastValueFrom } from "rxjs";

export default async function Page() {

    const events: IEvent[] = await lastValueFrom(getAllEventsImpl());
 
    return (<AdminEvent events={events} />);

}