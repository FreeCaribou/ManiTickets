'use client'

import { AcreateNewEvent } from "@/app/actions";
import { IEvent } from "@/shared/models/event";
import { Button, Card, Title, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';
import { useForm } from "@mantine/form";

export function AdminEvent(props: { events: IEvent[] }) {
    const createNewEvent = AcreateNewEvent.bind(null);
    const eventForm = useForm({
        initialValues: {
            label: '',
            beginDate: '',
            endDate: '',
        }
    })

    return (
        <div>
            <Title ta="center" c="colorPrimary">Events</Title>
            {props.events.length > 0 ? <p>Here is the list</p> : <p>No event present</p>}
            {props.events.map(event => (
                <Card>
                    {event.label}
                </Card>
            ))}

            <form action={createNewEvent}>
                <Text>Create a new event</Text>
                <TextInput
                    withAsterisk
                    label="Label"
                    name="label"
                    {...eventForm.getInputProps('label')}
                />
                <DateTimePicker label="Begin date" placeholder="Pick date and time for the begin date" name="beginDate" dropdownType="modal"/>
                <DateTimePicker label="End date" placeholder="Pick date and time for the end date" name="endDate" dropdownType="modal"/>
                <Button color="colorPrimary" type="submit">Create new event</Button>
            </form>
        </div>
    )
}