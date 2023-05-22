const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://MernChat-User:GKR50FyiNOmcGmJB@cluster0.b7vx366.mongodb.net/',{
        useUnifiedTopology: true,
        useNewUrlParser: true,    
    }
).catch(() => console.error("unable to connect to DB"));