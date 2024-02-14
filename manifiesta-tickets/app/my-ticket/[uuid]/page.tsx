import { MyTicketUuid } from '@/shared/components/page-components/MyTicketUuid/MyTicketUuid';
import { MongoClient } from 'mongodb';

export default async function MyTicketPage({ params }: { params: { uuid: string } }) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  const database = client.db(process.env.MONGODB_DB);
  const collection = database.collection('command');
  const result = await collection.findOne({ uuid: params.uuid });
  delete result._id;

  if (!result) {
    console.log('bad - dont find')
    return <div>Dont find ticket: {params.uuid} ...</div>
  }

  return <MyTicketUuid row={result} />
}