'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';
import '@mantine/dates/styles.css';

const colorPrimary: MantineColorsTuple = [
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b',
    '#21468b'
];

const colorSecondary: MantineColorsTuple = [
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00',
    '#ff9a00'
];

export const theme = createTheme({
    colors: {
        colorPrimary,
        colorSecondary,
    },
    primaryColor: 'colorPrimary',
});