const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB yessss'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

};

module.exports = { connectDB };
