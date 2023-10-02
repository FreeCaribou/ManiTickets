import { LayoutAdmin } from "@/components/Admin/LayoutAdmin"

export default function AdminLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {


    return (
      <div>
        <LayoutAdmin />
        {children}
      </div>
    )
  }