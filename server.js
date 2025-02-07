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
app.use('/admin/slider', adslider);

const adHeroTitle = require('./routers/admin/heroTitleRoute.js');
app.use('/admin/heroTitle', adHeroTitle)

const adCounter = require('./routers/admin/counterRoute.js');
app.use('/admin/counter', adCounter)

const adPartner = require('./routers/admin/partnerRoute.js');
app.use('/admin/partner', adPartner)

const adGeneralSettings = require('./routers/admin/generaSettingsRoute.js')
app.use('/admin/generalSettings', adGeneralSettings);

const adGallery = require('./routers/admin/galleryRoute.js')
app.use('/admin/gallery', adGallery);

const adProduct = require('./routers/admin/productRoute.js')
app.use('/admin/product', adProduct);

const adCategory = require('./routers/admin/categoryRoute.js')
app.use('/admin/category', adCategory);

// const adUser = require('./routers/admin/userRoute.js')
// app.use('/admin/user', adUser);
//Admin routes end









connectDB(); //connect to MongoDB

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});