// TODO type and return
export function ticketsTypeBodyValidator(body: any) {
    let error = false;
    const messages = [];

    if (!body.label) {
        error = true;
        messages.push('Tickets type need a label');
    }

    if (!body.price || !parseInt(body.price)) {
        error = true;
        messages.push('Tickets type need a price - price need to be a number');
    }

    return {error, messages}
}