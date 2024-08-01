const express = require('express');
const connectToDB = require('./db')
const app = express();
require('dotenv').config();
const user = require('./models/user')
app.use(express.json());
const cors = require('cors');

app.use(cors());

connectToDB();

app.get('/', async (req, res) => {
    res.send("<h1>Welcome to SidNotes backend");
})

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'))

const PORT = process.env.PORT || 8080


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});