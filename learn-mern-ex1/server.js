const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

// Bodyparser Middleware
app.use(bodyParser.json())

// DB Cofig
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


// Use Routes
app.use('/api/items', items)


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



const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))



// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);