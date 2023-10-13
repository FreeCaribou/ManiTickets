import { MyTicketUuid } from "@/components/my-ticket/my-ticket-uuid";
import { sql } from "@vercel/postgres";

export default async function MyTicketPage({ params }: { params: { uuid: string } }) {
  const { rows } = await sql`SELECT * from selling_ticket_test where uuid=${params.uuid} LIMIT 1`;

  console.log('row ?', rows)

  if (rows.length === 0) {
    console.log('bad - dont find')
    return <div>Dont find ticket: {params.uuid} ...</div>
  }

  return <MyTicketUuid row={rows[0]}/>
}