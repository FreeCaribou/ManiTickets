'use client'

import { Title, Text, Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { ITicketsType } from '@/shared/models/tickets-type';
import { useState } from 'react';
import { TicketsChoiceBasket } from '../../shared-components/tickets-choice-basket';

export function Admin(props: { ticketsType: ITicketsType[] }) {
    const [ticketsType] = useState(props.ticketsType.map(tt => { return { ...tt, unit: 0 } }));

    const testForm = useForm({
        initialValues: {
            email: '',
        }
    })

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function onSendTestMailClick() {
        axios.post(`${window.location.origin}/api/selling`, { email: testForm.values.email, authToken: getCookie('auth') }).then(sellings => {
            axios.post(`${window.location.origin}/api/email`, { email: testForm.values.email, uuid: sellings.data.uuid, authToken: getCookie('auth') }).then(d => {
                // TODO the else, show what happen
                console.log('emai send !')
            });
        });
    }

    return (
        <>
            <Title ta="center" c="colorPrimary">Admin Page</Title>
            <Text>Test mock of make tickets order</Text>
            <form>
                <TicketsChoiceBasket ticketsType={ticketsType}></TicketsChoiceBasket>
                <TextInput
                    withAsterisk
                    label="Client email"
                    placeholder="rosa@luxembourg.de"
                    {...testForm.getInputProps('email')}
                />
                <Button m="sm" onClick={onSendTestMailClick}>Test Buy</Button>
            </form>
        </>
    )
}