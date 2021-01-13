const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
var HttpStatus = require('http-status-codes');

// Express APIs
const branchApi = require('./routes/branch.route');
const carApi = require('./routes/car.route');
const cartypeApi = require('./routes/cartype.route');
const loginApi = require('./routes/login.route');
const messageApi = require('./routes/message.route');
const rentApi = require('./routes/rent.route');
const roleApi = require('./routes/role.route');
const searchApi = require('./routes/search.route');
const startApi = require('./routes/start.route');
const userApi = require('./routes/user.route');
const allApi = require('./routes/all.route');

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
    //console.debug('Connected to port ' + port);
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
        error.statusCode = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    } 
    res.status(error.statusCode).send(error.message);
});