const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const config = require('config')


const app = express()

// Enable All CORS Requests
app.use(cors())

// Express v4.16.0 and higher
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// DB Cofig
const db = config.get("mongoURI")

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


// # Use Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))



// # Setup before deploy.
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(
            __dirname,
            'client',
            'build',
            'index.html'
        ))
    })
}


// # Set port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))



// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);