'use client'

import { Title, Text, Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { useForm } from '@mantine/form';

export function Admin() {

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
            console.log('selling', sellings, sellings.data)
            axios.post(`${window.location.origin}/api/email`, { email: testForm.values.email, uuid: sellings.data.uuid, authToken: getCookie('auth') }).then(d => {
                console.log('data of get send mail', d)
                // TODO the else, show what happen
            });
        });
    }

    return (
        <>
            <Title ta="center" c="colorPrimary">Admin Page</Title>
            <Text>Hello mister admin</Text>
            <Button m="sm" onClick={onSendTestMailClick}>Test Send Mail</Button>
            <form>
                <TextInput
                    withAsterisk
                    label="Client email"
                    placeholder="rosa@luxembourg.de"
                    {...testForm.getInputProps('email')}
                />
            </form>
        </>
    )
}