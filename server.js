const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Connected!');
});

const userRouter = require('./src/routes/User');
app.use('/api', userRouter);

const channelRouter = require('./src/routes/Channel');
app.use('/api', channelRouter);

const videoRouter = require('./src/routes/Video');
app.use('/api', videoRouter)

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`); 
});

mongoose.connect('mongodb+srv://kunjal:kunjal@videoapi.vtt3e.mongodb.net/test', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Connected to database')
});