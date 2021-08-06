const express = require('express'); //express variable
const path = require('path'); //node for handling paths
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express(); //initialises an app with express


//init middleware
//app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepage route
app.get('/', (req,res) => res.render('index',{
    title: 'member app',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000; //variable for the port

app.listen(PORT, () => {
    console.log(`Server port: ${PORT} http://localhost:5000/`)
});