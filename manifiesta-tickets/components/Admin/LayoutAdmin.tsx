'use client'

import { Container, Tabs } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function LayoutAdmin() {
    const [active] = useState(usePathname());

    const tabs: { value: string, label: string }[] = [
        { value: '/admin', label: 'Admin' },
        { value: '/admin/selling', label: 'Selling' },
        { value: '/admin/tickets-type', label: 'Tickets Type' },
        { value: '/', label: 'Home Page' },
    ];

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab.value} key={tab.value}>
            <a href={tab.value}>{tab.label}</a>
        </Tabs.Tab>
    ));

    return (
        <>
            <Container>
                <Tabs variant="outline" defaultValue={active}>
                    <Tabs.List>
                        {items}
                    </Tabs.List>
                </Tabs>
            </Container>
        </>
    )
}