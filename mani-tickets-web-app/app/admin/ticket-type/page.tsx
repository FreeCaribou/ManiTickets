import { AdminTicketType } from "@/shared/components/page-components/Admin/TicketType/AdminTicketType";
import { IEvent } from "@/shared/models/event";
import { ITicketType } from "@/shared/models/ticket-type";
import { getAllEvents } from "@/shared/services/event.service";
import { getAllTicketTypes } from "@/shared/services/ticket-type.sevice";
import { lastValueFrom } from "rxjs";


export default async function Page({ searchParams }) {

  const events: IEvent[] = await lastValueFrom(getAllEvents());
  const ticketTypes: ITicketType[] = await lastValueFrom(getAllTicketTypes());

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
