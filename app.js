const   express = require('express'),
        app = express(),
        requestTickets = require('./modules/ticket');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// index route
app.get('/', (req, res) => {
    res.redirect('/tickets');
});
app.get('/tickets', (req, res) => {
    const url = 'https://evannguyen.zendesk.com/api/v2/tickets.json';
    requestTickets(url, (authenError, err, statusCode) => {
        res.render('error', {
            authenError: authenError,
            err: err,
            statusCode: statusCode
        });
    }, (returnedData) => {
        let tickets = returnedData['tickets'];
        //set default variables
        let totalTickets = tickets.length,
            pageSize = 25,
            pageCount = Math.ceil(totalTickets / pageSize),
            currentPage = 1,
            ticketsArrays = [],
            ticketsList = [];

        //split list into groups
        while (tickets.length > 0) {
            ticketsArrays.push(tickets.splice(0, pageSize));
        }

        //set current page if specifed as get variable (eg: /?page=2)
        if (typeof req.query.page !== 'undefined') {
            currentPage = +req.query.page;
        }

        //show list of tickets from group
        ticketsList = ticketsArrays[+currentPage - 1];

        //render tickets.ejs view file
        res.render('tickets', {
            tickets: ticketsList,
            pageSize: pageSize,
            totalTickets: totalTickets,
            pageCount: pageCount,
            currentPage: currentPage
        });
    });
});

// show route
app.get('/tickets/:id', (req, res) => {
    const ticketId = req.params.id;
    const url = 'https://evannguyen.zendesk.com/api/v2/tickets/' + ticketId + '.json';

    requestTickets(url, (authenError, err, statusCode) => {
        res.render('error', {
            authenError: authenError,
            err: err,
            statusCode: statusCode
        });
    }, (returnedData) => {
        const ticket = returnedData;
        res.render('show', { ticket: ticket });
    });
});

app.listen(3000, () => {
    console.log('Zendesk ticket viewer app has started');
});