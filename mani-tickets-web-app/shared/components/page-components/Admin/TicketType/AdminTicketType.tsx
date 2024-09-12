'use client'

import { AcreateNewTicketType } from "@/app/actions";
import { IEvent } from "@/shared/models/event"

export function AdminTicketType(props: { events: IEvent[], defaultEventId: string, openAddNew: boolean }) {
    const createNewEvent = AcreateNewTicketType.bind(null);

    return (
        <>
            <p>Will come later, need rework</p>

            <form action={createNewEvent}>
                <h3>Create a new ticket type</h3>

                <label htmlFor="label" className="form-label">Ticket type label label *</label>
                <input type="text" className="form-control" id="label" name="label" />

                <label htmlFor="price" className="form-label">Price *</label>
                <input type="number" className="form-control" id="price" name="price" step="any" />

                <label htmlFor="eventId" className="form-label">Event linked *</label>
                <select className="form-select" id="eventId" name="eventId">
                    {props.events.map(event => {
                        return event._id.toString() === props?.defaultEventId?.toString() ?
                            (
                                <option key={event._id.toString()} value={event._id.toString()} selected>
                                    {event.label}
                                </option>
                            ) :
                            (
                                <option key={event._id.toString()} value={event._id.toString()}>
                                    {event.label}
                                </option>
                            )
                    })}
                </select>

                <button className="btn btn-primary mt-5" type="submit">
                    Create new ticket type <i className="bi bi-plus-circle" />
                </button>
            </form>
        </>
    )
}