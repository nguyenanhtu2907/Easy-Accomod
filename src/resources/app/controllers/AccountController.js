const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class AccountController {

    register(req, res, next) {
        res.render('register',{
            layout:false,
        });
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
            level: req.body.level, //renter, owner
        }
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user) {
                console.log(req.body.level=='renter'?true:false)
                return res.render('register', {
                    layout: false,
                    message: 'Tên đăng nhập đã tồn tại!!!',
                    values: req.body,
                    tab: req.body.level=='renter'?true:false,
                })

            } else {
                if(entity.level == 'owner'){
                    const user = new User(entity);
                    user.save()
                        .then(() => res.render('register', {
                            layout: false,
                            messageSuccess: '*Đăng ký thành công!!! Hãy chờ admin phê duyệt yêu cầu của bạn.',
                            values: req.body,
                        }))
                        .catch(error => { })
                }else{
                    const user = new User(entity);
                    user.save()
                        .then(() => res.redirect('/account/login'))
                        .catch(error => { })
                }
            }
        })
    }

    login(req, res, next) {
        res.render('login',{
            layout:false,
        })
    }

    loginDB(req, res, next) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user) {
                const rs = bcrypt.compareSync(req.body.password, user.password_hash);
                if (!rs) {
                    return res.render('login', {
                        layout: false,
                        message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                        values: req.body,
                    })
                }
            } else {
                return res.render('login', {
                    layout: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                    values: req.body,
                })
            }
            delete user.password_hash;
            req.session.isAuthenticated = true;
            req.session.authUser = user;
            //url lay duoc tu restrict
            const url = req.query.retUrl || '/';

            res.redirect(url)
        })
    }

    profile(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(account => {
                Post.find({ owner: req.params.id }).limit(10)
                    .then(posts => res.json({ account, posts }))
            })
            .catch(() => res.send('Khong ton tai nguoi dung'))

    }

    profileNav(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(account => {
                Post.find({ owner: req.params.id }).limit(10)
                    .then(posts => res.json({ account, posts }))
            })
            .catch(() => res.send('Khong ton tai nguoi dung'))
    }

    editProfile(req, res, next) {

    }
    changePasswordDB(req, res, next) {

    }

    changeInfoDB(req, res, next) {

    }

    logout(req, res, next) {

    }

    restrict(req, res, next) {

    }

}
module.exports = new AccountController;