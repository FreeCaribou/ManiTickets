'use client'

import { AcreateNewEvent } from "@/app/actions";
import { IEvent } from "@/shared/models/event";

export function AdminEvent(props: { events: IEvent[] }) {
    const createNewEvent = AcreateNewEvent.bind(null);

    return (
        <div>
            <h2>Events</h2>

            {props.events.length > 0 ? '' : <h3>No event present</h3>}
            {props.events.map(event => (
                <div key={event._id.toString()} className="card">
                    <div className="card-body">
                        <h4 className="card-title">{event.label}</h4>
                        <p className="card-text">{event.beginDate.toString()} / {event.endDate.toString()}</p>
                    </div>
                </div>
            ))}

            <form action={createNewEvent}>
                <h3>Create a new event</h3>
                
                <label htmlFor="label" className="form-label">Event label *</label>
                <input type="text" className="form-control" id="label" name="label" />

                <label htmlFor="beginDate">Begin date *</label>
                <input id="beginDate" name="beginDate" className="form-control" type="datetime-local" />

                <label htmlFor="endDate">End date *</label>
                <input id="endDate" name="endDate" className="form-control" type="datetime-local" />

                <button className="btn btn-primary" type="submit">Create new event <i className="bi bi-plus-circle"></i></button>
            </form>
        </div>
    )
}