'use client'

import { DateTransform } from "@/shared/components/shared-components/DateTransform";
import { IEvent } from "@/shared/models/event";
import Link from "next/link";

export function AdminEventDetail(props: { event: IEvent }) {

    return (
        <div>
            <h2>Detail of <em>{props.event.label}</em></h2>
            <h3><DateTransform date={props.event.beginDate} /> --- <DateTransform date={props.event.endDate} /></h3>

            <Link href={`/admin/ticket-type?defaultEventId=${props.event._id}&openAddNew=true`}>
                <button className="btn btn-info" type="submit">
                    <i className="bi bi-ticket" />Add a ticket type <i className="bi bi-plus-circle" />
                </button>
            </Link>
        </div>
    )
}