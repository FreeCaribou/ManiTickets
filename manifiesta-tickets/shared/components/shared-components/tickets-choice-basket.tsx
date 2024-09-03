import { ITicketTypeBasket } from "@/shared/models/tickets-type";
import { Badge, Button, Card, Group, Text, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconMinus, IconPlus } from '@tabler/icons-react';

export function TicketsChoiceBasket(props: { ticketsType: ITicketTypeBasket[] }) {
    const [ticketsType, setTicketsType] = useState(props.ticketsType);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(makeTicketsChoiceList());
    }, [ticketsType]);

    function makeTicketsChoiceList() {
        return ticketsType.map((tt, key) =>
            <Card shadow="sm" padding="lg" radius="md" withBorder key={key} mb="md">
                <Card.Section>
                    Here will come the ticket's picture
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                    <Text>{tt.label}</Text>
                    <Badge color="pink">{tt.price}&#x20AC;</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                    Here will come the ticket's description if present
                </Text>
                <Group justify="space-between" mt="md" mb="xs">
                    <Button variant="filled" onClick={() => lessOfTicketType(tt)} disabled={tt.unit === 0}>
                        <IconMinus size={48} />
                    </Button>
                    <Text>{tt.unit} unit(s) choosen</Text>
                    <Button variant="filled" onClick={() => moreOfTicketType(tt)}>
                        <IconPlus size={48} />
                    </Button>
                </Group>
            </Card>
        )
    }

    function moreOfTicketType(ticketType: ITicketTypeBasket) {
        const newTicketsType = [...ticketsType];
        const index = newTicketsType.findIndex(x => x._id === ticketType._id);
        if (index > -1) {
            newTicketsType[index].unit++;
            setTicketsType(newTicketsType);
        }
    }

    function lessOfTicketType(ticketType: ITicketTypeBasket) {
        if (ticketType.unit > 0) {
            const newTicketsType = [...ticketsType];
            const index = newTicketsType.findIndex(x => x._id === ticketType._id);
            if (index > -1) {
                newTicketsType[index].unit--;
                setTicketsType(newTicketsType);
            }
        }
    }

    return (
        <>
            <div>{list}</div>
        </>
    )
}
