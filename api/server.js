const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB connection is successful"))
.catch((err)=>{
    console.log(err);
})
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

app.listen(process.env.PORT, () => console.log('API running on port 5000'));