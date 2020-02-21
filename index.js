const express = require('express')
const { EventRecommender, User,  Event}  = require('./events');

const app = express()
const port = 3000

const er = new EventRecommender(); 

// events
app.get('/events', (req, res) => {
    res.json(er.events);
});

app.post('/events', (req, res) => {
    /* 
    TODO 
        - get (id, name, date, category) from user
        - use it to add an event to er
    */
    res.json(er.events);
});

app.delete('/events', (req, res) => {
    /* 
    TODO 
        - get eventId from user
        - use it to delete that event from er
    */
});

// users
app.get('/users', (req, res) => {
    res.send(event.users);
});

app.post('/users', (req, res) => {

});

app.delete('/users', (req, res) => {

});


app.get('/', (req, res) => res.send('Hello People!!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// ":" means to indicate that the endpoint is a user input