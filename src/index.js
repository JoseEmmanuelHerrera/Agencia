const express = require('express');
const morgan = require('morgan');


//Initialitations
const app = express();  

//Settings

app.set('port', process.env.PORT || 4000);

//Middleware

app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Routes

    app.use(require('./routes/index.js'));
    app.use('/autos',require('./routes/autos.js'));
    app.use('/marca',require('./routes/marca.js'));

//Starting server

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});