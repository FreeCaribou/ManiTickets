'use client'

import { Title, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';

export function Login() {
    const loginForm = useForm({
        initialValues: {
            password: '',
        }
    })

    function login(values: { password: string }) {
        axios.post(`${window.location.origin}/api/login`, { password: values.password }).then(d => {
            console.log('data of post', d)
        });
    }

    return (
        <>
            <Title ta="center" c="colorPrimary">Login Page</Title>
            <form onSubmit={loginForm.onSubmit((values: { password: string }) => login(values))}>
                <TextInput
                    withAsterisk
                    label="Password"
                    placeholder="azerty0123"
                    {...loginForm.getInputProps('password')}
                />
                <Button type="submit">Login</Button>
            </form>
        </>
    )
}