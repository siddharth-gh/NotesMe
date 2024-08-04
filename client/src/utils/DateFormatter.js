export const formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDateTime = newDate.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // for 12-hour format; use false for 24-hour format
    });
    return formattedDateTime;
}

