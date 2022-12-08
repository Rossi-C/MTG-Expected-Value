const path = require('path')
const cors = require('cors');
const express = require('express')

const app = express();
app.use(cors({
    origin: '*'
}))

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use('*.js', express.static(path.join(__dirname, "..", "client", "build")));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

app.get('/set/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on the port ${PORT}`));