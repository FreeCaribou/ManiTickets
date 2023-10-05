'use client'

import { Title, Text, Button } from '@mantine/core';
import axios from 'axios';

export function Admin() {

    function onSendTestMailClick() {
        console.log('you have click bro, nice')

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
        const msg = {
            to: '',
            from: '',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
    
        sgMail.send(msg);

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