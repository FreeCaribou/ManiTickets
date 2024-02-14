import { Admin } from '@/shared/components/page-components/Admin/Admin';
import { getAllTicketsType } from '@/shared/services/tickets-type.sevice';
import { lastValueFrom } from 'rxjs';

export default async function AdminPage() {
  const ticketsType = await lastValueFrom(getAllTicketsType());

  console.log('tickets type', ticketsType)

  return (
    <div>
      <Admin ticketsType={ticketsType.map(tt => {
        const id = tt._id.toString();
        delete tt._id;
        return { ...tt, id };
      })} />
    </div>
  )
}
