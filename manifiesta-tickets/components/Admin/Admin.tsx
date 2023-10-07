'use client'

import { Title, Text, Button } from '@mantine/core';
import axios from 'axios';

export function Admin() {

    function onSendTestMailClick() {
        console.log('you have click bro, nice')

        axios.get(`${window.location.origin}/api/email`).then(d => {
            console.log('data of get send mail', d)
            // TODO the else, show what happen
        });
    }

    return (
        <>
            <Title ta="center" c="colorPrimary">Admin Page</Title>
            <Text>Hello mister admin</Text>
            <Button onClick={onSendTestMailClick}>Test Send Mail</Button>
        </>
    )
}