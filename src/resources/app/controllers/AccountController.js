const User = require('../models/Post');
const Post = require('../models/User');
const bcrypt = require('bcryptjs');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class AccountController {

    register(req, res, next) {
        res.send('Day la trang danh ky');
    }

    registerDB(req, res, next) {
        const password_hash = bcrypt.hashSync(req.body.password, 8);
        const entity = {
            username: req.body.username,
            fullname: req.body.fullname,
            gender: req.body.gender,
            identity: req.body.identity,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password_hash, 
            avatar: req.body.avatar, 
            level: req.body.level, //renter, owner
        }
        User.findOne({ username: req.params.username }, function (err, user) {
            if (user) {
                return res.render('register', {
                    layout: false,
                    message: 'Tên đăng nhập đã tồn tại!!!',
                    values: req.body,
                })

            } else {
                const user = new User(entity);
                user.save()
                    .then(() => res.redirect('/login'))
                    .catch(error => { })
            }
        })
    }

    login(req, res, next) {
        res.send('Day la trang dang nhap')
    }

    loginDB(req, res, next) {
        User.findOne({ username: req.body.username })
            .then(user => {
                const compare = bcrypt.compareSync(req.body.password, user.password_hash);
                if (!compare) {
                    return res.render('login', {
                        layout: false,
                        message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                        values: req.body,
                    })
                }
            })
            .catch(() => res.render('login', {
                layout: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                values: req.body,
            }))
    }

    profile(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(account => {
                Post.find({ owner: req.params.id })
                    .then(posts => res.json({ account, posts }))
            })
    }

    profileNav(req,res, next){

    }

    editProfile(req, res, next){

    }
    changePasswordDB(req, res, next){

    }

    changeInfoDB(req, res, next){

    }
    
    logout(req, res, next){

    }

    
}
module.exports = new AccountController;