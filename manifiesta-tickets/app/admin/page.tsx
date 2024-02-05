import { Admin } from '@/shared/components/Admin/Admin';
import { getAllTicketsType } from '@/shared/services/tickets-type.sevice';
import { lastValueFrom } from 'rxjs';

export default async function AdminPage() {
  const ticketsType = await lastValueFrom(getAllTicketsType());

  console.log('tickets type', ticketsType)

  return (
    <div>
      <Admin ticketsType={ticketsType} />
    </div>
  )
}
