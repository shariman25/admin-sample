var express = require('express');
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const mongoose = require('mongoose');
const AdminBroExpressjs = require('admin-bro-expressjs')
const bcrypt = require('bcrypt')

//const Emp = require('./Models/emp')
const User = require('./models/user')
const AdminBroOptions = require('./options')

var username = 'admin'
var password = 'Passw0rd' //password will be changed after some period.
var dbName = 'adminManager'

const app = express();
const dbUrl = 'mongodb+srv://' + username + ':' + password + '@cluster1.yjabv.mongodb.net/' + dbName + '?retryWrites=true&w=majority'
const port = 7002

//redirect to admin page
app.get('/', function (req, res) {
    res.redirect('/admin'); // main page url
});


const run = async () => {

    //create DB connection
    mongoose.connect(dbUrl, {useNewUrlParser: true});
    mongoose.connection.once('open',function(){
        console.log('Database connected Successfully');
    }).on('error',function(err){
        console.log('Error', err);
    })

    //register adapter
    AdminBro.registerAdapter(AdminBroMongoose)

    const adminBro = new AdminBro(AdminBroOptions)

    //init router
    const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
        authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
            return user
            }
            // if (password === user.encryptedPassword) {
            //   return user
            // }
        }
        return false
        },
        cookiePassword: 'session Key',
    })

    //set router
    app.use(adminBro.options.rootPath, router)

    //create listern port
    app.listen(port, function () {
        console.log('Listening to Port '+port);
    });


};


module.exports = run, app;