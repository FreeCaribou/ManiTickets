'use client'

import { getCookie } from '@/shared/functions/getCookie';
import { Title, Text, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';

export function TicketsType() {

    const ticketTypeForm = useForm({
        initialValues: {
            label: '',
            price: '',
        }
    })

    function onCreateNewTicketTypeClick() {
        console.log('we create a new type of ticket', ticketTypeForm, ticketTypeForm.values, getCookie('auth'))
        axios.post(`${window.location.origin}/api/tickets-type`, { label: ticketTypeForm.values.label, price: ticketTypeForm.values.price, authToken: getCookie('auth') }).then(d => {
            // TODO the else, show what happen
            console.log('the new ticket', d)
        });
    }
    
    return (
        <>
            <Title ta="center" c="colorPrimary">Ticket type</Title>
            <Text>Create a new ticket type</Text>
            <form>
                <TextInput
                    withAsterisk
                    label="Label"
                    {...ticketTypeForm.getInputProps('label')}
                />
                <TextInput
                    withAsterisk
                    label="Price"
                    {...ticketTypeForm.getInputProps('price')}
                />
                <Button m="sm" onClick={onCreateNewTicketTypeClick}>Create</Button>
            </form>
        </>
    )
}