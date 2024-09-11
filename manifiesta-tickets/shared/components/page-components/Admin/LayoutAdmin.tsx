'use client'

import { Container, Tabs } from '@mantine/core';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function LayoutAdmin() {
    const [active, setActive] = useState(usePathname());
    const router = useRouter();

    const tabs: { value: string, label: string }[] = [
        { value: '/admin', label: 'Admin' },
        { value: '/admin/event', label: 'Event' },
        { value: '/admin/selling', label: 'Selling' },
        { value: '/admin/tickets-type', label: 'Tickets Type' },
        { value: '/', label: 'Home Page' },
    ];

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab.value} key={tab.value}>
            {tab.label}
        </Tabs.Tab>
    ));

    return (
        <Tabs
            variant="pills"
            value={active}
            onChange={(value) => {
                router.push(`${value}`);
                setActive(value);
            }}>
            <Tabs.List>
                {items}
            </Tabs.List>
        </Tabs>
    )
}