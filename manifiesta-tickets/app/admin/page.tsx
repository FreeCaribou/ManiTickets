import { getAllTicketsType } from '@/shared/services/tickets-type.sevice';
import { Admin } from '../../components/Admin/Admin';
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
