const mongoose = require('mongoose');
const property = require('../../configs/property');

let db = mongoose.connection;
const options = {
    useUnifiedTopology : true, 
    useCreateIndex: true, 
    useNewUrlParser:true, 
    auto_reconnect:true, 
    useFindAndModify:false 
};

db.on('error', function(err){
    console.log(err);
});

db.once('open', function(){
    console.log("Connected to MongoDB");
});

db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

db.on('disconnected', async function() {
    console.log('MongoDB disconnected!');
    
    try {
        await mongoose.connect(property.mongoUrl, options);
    }
    catch(e){
        console.log(e);
    }
    
});

(async () => {
    try {
        let ret = await mongoose.connect(property.mongoUrl, options);
    }
    catch(e){
        console.log(e);
    }
})();

module.exports = db;