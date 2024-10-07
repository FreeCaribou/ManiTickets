import { AdminTicketType } from "@/shared/components/page-components/Admin/TicketType/AdminTicketType";
import { IEvent } from "@/shared/models/event";
import { ITicketType } from "@/shared/models/ticket-type";
import { getAllEventsImpl } from "@/shared/services/event.service";
import { getAllTicketTypesImpl } from "@/shared/services/ticket-type.sevice";
import { lastValueFrom } from "rxjs";


export default async function Page({ searchParams }) {

  const events: IEvent[] = await lastValueFrom(getAllEventsImpl());
  const ticketTypes: ITicketType[] = await lastValueFrom(getAllTicketTypesImpl());

  console.log('ticket type', ticketTypes)

  return (
    <div>
      <AdminTicketType
        events={events}
        defaultEventId={searchParams?.defaultEventId}
        openAddNew={searchParams?.openAddNew === 'true' ? true : false}
      />
    </div>
  )
}
