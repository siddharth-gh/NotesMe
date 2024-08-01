const moment = require('moment');
const makeDate = () => {
    const date = new Date();
    return (moment(date).format('MMMM Do YYYY, h:mm a')); // e.g., "July 31st 2024, 3:45:29 pm"
}

module.exports = makeDate