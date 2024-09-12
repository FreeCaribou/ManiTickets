'use client'

import { AcreateNewEvent } from "@/app/actions";
import { IEvent } from "@/shared/models/event";
import Link from "next/link";

export function AdminEvent(props: { events: IEvent[] }) {
    const createNewEvent = AcreateNewEvent.bind(null);

    return (
        <div>
            <h2>Events</h2>

            {props.events.length > 0 ? '' : <h3>No event present</h3>}
            <div className="container">
                <div className="row">
                    {props.events.map(event => (
                        <div key={event._id.toString()} className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <Link href={'/admin/event/' + event._id}>
                                        <h4 className="card-title">{event.label}</h4>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <form action={createNewEvent}>
                <h3>Create a new event</h3>

                <label htmlFor="label" className="form-label">Event label *</label>
                <input type="text" className="form-control" id="label" name="label" />

                <label htmlFor="beginDate">Begin date *</label>
                <input id="beginDate" name="beginDate" className="form-control" type="datetime-local" />

                <label htmlFor="endDate">End date *</label>
                <input id="endDate" name="endDate" className="form-control" type="datetime-local" />

                <button className="btn btn-primary mt-5" type="submit">
                    Create new event <i className="bi bi-plus-circle" />
                </button>
            </form>
        </div>
    )
}