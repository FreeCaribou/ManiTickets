import './globals.css';
import  "bootstrap/dist/css/bootstrap.min.css"
import AddBootstrap from "./AddBootstrap";

export const metadata = {
  title: 'Manifiesta Tickets',
  description: 'Managing Tickets for event',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AddBootstrap />
        {children}
      </body>
    </html>
  );
}