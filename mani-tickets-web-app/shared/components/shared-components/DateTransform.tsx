export function DateTransform(props: { date: Date }) {
    const date = new Date(props.date);
    return(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`);
}