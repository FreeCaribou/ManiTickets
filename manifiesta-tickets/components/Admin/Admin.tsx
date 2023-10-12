'use client'

import { Title, Text, Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { Template, generate, BLANK_PDF } from '@pdfme/generator';
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
        for(let i = 0; i <ca.length; i++) {
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
        axios.post(`${window.location.origin}/api/email`, {email: testForm.values.email, authToken: getCookie('auth')}).then(d => {
            console.log('data of get send mail', d)
            // TODO the else, show what happen
        });
    }

    function onCreatePdfClick() {
        console.log('trying to make pdf', testForm.values)

        const template: Template = {
            basePdf: BLANK_PDF,
            schemas: [
                {
                    a: {
                        type: 'text',
                        position: { x: 0, y: 0 },
                        width: 100,
                        height: 24,
                    },
                    b: {
                        type: 'text',
                        position: { x: 0, y: 24 },
                        width: 100,
                        height: 24,
                    },
                    c: {
                        type: 'text',
                        position: { x: 0, y: 48 },
                        width: 100,
                        height: 24,
                    },
                    qrCode: {
                        type: 'qrcode',
                        position: { x: 0, y: 72 },
                        width: 100,
                        height: 100,
                    }
                },
            ],
        };

        const inputs = [{
            a: testForm.values.email,
            b: `${new Date().toDateString()} - ${new Date().toTimeString()}`,
            c: 'this is a test, Hello World',
            qrCode: 'www.manifiesta.be'
        }];

        generate({ template, inputs }).then((pdf) => {
            console.log(pdf);
            // Browser
            const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
            window.open(URL.createObjectURL(blob));
        });
    }

    return (
        <>
            <Title ta="center" c="colorPrimary">Admin Page</Title>
            <Text>Hello mister admin</Text>
            <Button m="sm" onClick={onSendTestMailClick}>Test Send Mail</Button>
            <Button m="sm" onClick={onCreatePdfClick}>Test Create PDF</Button>
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