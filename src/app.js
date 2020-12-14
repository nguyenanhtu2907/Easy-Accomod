const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');
// const methodOverride = require('method-override');
// var bodyParser = require('body-parser');
const route = require('./resources/app/routes');
const db = require('./resources/config/db');

db.connect();
const app = express();
const port = 3000;

// app.use(methodOverride('_method'));

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true 
    }
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));
//Template engine

app.engine('hbs', handlebars({
    extname: '.hbs',
}));

app.use(express.urlencoded({
    limit: '50mb', extended: true
}));
app.use(express.json({ limit: '50mb', extended: true }));


app.set('view engine', 'hbs');
handlebars.create({}).handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
app.set('views', path.join(__dirname, 'resources/views'))

var server = require("http").createServer(app);
var io = require("socket.io")(server);

route(app);


io.on("connection", function (socket) {

    socket.on("disconnect", function () {

    });
    //server lắng nghe dữ liệu từ client
    socket.on("Client-sent-notification", function (data) {

        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        console.log(data)
        socket.broadcast.emit(`${data}`, data);
    });
});
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
