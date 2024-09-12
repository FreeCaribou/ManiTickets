'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LayoutAdmin() {
    const pathname = usePathname();

    const tabs: { value: string, label: string }[] = [
        { value: '/admin', label: 'Admin' },
        { value: '/admin/event', label: 'Event' },
        { value: '/admin/selling', label: 'Selling' },
        { value: '/admin/ticket-type', label: 'Ticket Type' },
        { value: '/', label: 'Home Page' },
    ];

    const items = tabs.map((tab) => (
        <li className="nav-item" key={tab.value}>
            <Link
                href={tab.value}
                className={`nav-link ${pathname.split('/')[2] === tab.value.split('/')[2] ? 'active' : ''}`}
            >
                {tab.label}
            </Link>
        </li>
    ));

    return (
        <nav className='navbar navbar-expand-md'>
            <div className='container-fluid'>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-md-flex" id="navbarSupportedContent">
                    <ul className='navbar-nav me-auto mb-2 mb-md-0'>{items}</ul>
                </div>
            </div>
        </nav>
    )
}