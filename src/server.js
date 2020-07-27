const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
var HttpStatus = require('http-status-codes');

// Express APIs
const branchApi = require('./controllers/branch.controller');
const carApi = require('./controllers/car.controller');
const cartypeApi = require('./controllers/cartype.controller');
const loginApi = require('./controllers/login.controller');
const messageApi = require('./controllers/message.controller');
const rentApi = require('./controllers/rent.controller');
const roleApi = require('./controllers/role.controller');
const searchApi = require('./controllers/search.controller');
const startApi = require('./controllers/start.controller');
const userApi = require('./controllers/user.controller');
const allApi = require('./controllers/all.controller');

const onStartDatabaseService = require('./services/onStartDatabase.service');



// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

// Serve static resources
app.use('/src', express.static('src'));
app.use('/assets', express.static('assets'));
app.use('/html', express.static('html'));
app.use('/html/assets/images', express.static('html/assets/images'));



app.use('/api', branchApi)
app.use('/api', carApi)
app.use('/api', cartypeApi)
app.use(loginApi)
app.use('/api', messageApi)
app.use('/api', rentApi)
app.use('/api', roleApi)
app.use('/api', searchApi)
app.use(startApi)
app.use('/api', userApi)
app.use('/api', allApi)

// Define PORT
const port = process.env.PORT || dbConfig.PORT;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
    onStartDatabaseService.AddMongoData();
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (error, req, res, next) {
    console.error(error.message);
    if (!error.statusCode){
        error.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } 
    res.status(error.statusCode).send(error.message);
});