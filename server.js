const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/connectdb.js');

require('dotenv').config();

//start middleware
app.use(cors());
app.use(express.json());
//end middleware



//Client routes start
const surface = require('./routers/client/surface.js');
app.use('/', surface);
//Client routes end


//Admin routes start
const adslider = require('./routers/admin/sliderRoute.js')
app.use('/admin/slider',adslider)
//Admin routes end









connectDB(); //connect to MongoDB

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});