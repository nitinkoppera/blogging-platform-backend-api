const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// routes
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const commentRoutes = require('./routes/comments');

const app = express();
// http request - contains body such as POST, PUT request
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URL = 'mongodb+srv://nitin:nitin@cluster0.drosrym.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running successfully on ' + PORT);
});
