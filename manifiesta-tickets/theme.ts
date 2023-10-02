'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

// Real primary is 2 #fdd3e2
const colorPrimary: MantineColorsTuple = [
    '#ffe9f3',
    '#fdd3e2',
    '#f6a5c2',
    '#f0749f',
    '#eb4a82',
    '#e83170',
    '#e82367',
    '#ce1557',
    '#b90a4d',
    '#a30041'
];

// Real secondary is 8 #43a347
const colorSecondary: MantineColorsTuple = [
    '#ecfaee',
    '#ddf2de',
    '#bae2bc',
    '#93d296',
    '#74c577',
    '#5fbc62',
    '#53b857',
    '#43a347',
    '#39903d',
    '#2b7d31'
];

export const theme = createTheme({
    colors: {
        colorPrimary,
        colorSecondary,
    },
    primaryColor: 'colorPrimary',
    primaryShade: 2,
});