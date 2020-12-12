const User = require('../models/User');
const Post = require('../models/Post');

const bcrypt = require('bcryptjs');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class AccountController {

    register(req, res, next) {
        res.render('register', {
            layout: false,
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
            checked: req.body.checked * 1,
            password_hash,
            level: req.body.level, //renter, owner
        }
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user) {

                return res.render('register', {
                    layout: false,
                    message: 'Tên đăng nhập đã tồn tại!!!',
                    values: req.body,
                    tab: req.body.level == 'renter' ? true : false,
                })

            } else {
                if (entity.level == 'owner') {
                    const user = new User(entity);
                    user.save()
                        .then(() => res.render('register', {
                            layout: false,
                            messageSuccess: '*Đăng ký thành công!!! Hãy chờ admin phê duyệt yêu cầu của bạn.',
                            values: req.body,
                        }))
                        .catch(error => { })
                } else {
                    const user = new User(entity);
                    user.save()
                        .then(() => res.redirect('/account/login'))
                        .catch(error => { })
                }
            }
        })
    }

    login(req, res, next) {
        res.render('login', {
            layout: false,
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
            if (user.checked == 0 || user.checked == -1) {
                return res.render('login', {
                    layout: false,
                    message: 'Hãy chờ admin phê duyệt tài khoản của bạn!!!',
                    values: req.body,
                })
            } else {
                res.redirect(url)
            }

        })
    }

    manageAdmin(req, res, next) {
        if (req.session.authUser._id == '5fb7e2f7662281052c43df98' && req.params.id == '5fb7e2f7662281052c43df98') {
            var option = req.query.option * 1;
            if (option == 0) {
                User.find({ checked: 0 })
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 1) {
                User.find({ checked: 1 })
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 2) {
                User.find({ checked: -1 })
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 3) {
                User.find({ checked: -2 })
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 4) {
                Post.find({ checked: 0 })
                    .then(posts => multipleMongooseToObj(posts))
                    .then(posts => getPostsInfo(posts))
                    .then(posts => res.json(posts))
                    .catch(() => { })
            } else if (option == 5) {
                Post.find({ checked: 1 })
                    .then(users => multipleMongooseToObj(users))
                    .then(posts => getPostsInfo(posts))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 6) {
                Post.find({ checked: -1 })
                    .then(posts => getPostsInfo(posts))
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 7) {
                User.find({ checked: 0 })
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else if (option == 8) {
                User.findOne({ _id: req.session.authUser._id })
                    .then(admin => mongooseToObj(admin))
                    .then(admin => {
                        res.json(admin.messages)
                    })
                    .catch(() => { })
            } else {
                return res.render('manage', {
                    layout: false,
                })
            }
        } else {
            return res.render('error', {
                layout: false,
            })
        }
    }

    submitMessage(req, res, next) {
        var message = req.body;
        User.findOne({ _id: message.owner.id })
            .then(owner => {
                owner.messages.push(message.content);
                message.owner.avatar = owner.avatar;
                message.owner.seen = false;
                message.owner.username = owner.username;
                owner.save()
                    .then(() => {
                        User.findOne({ level: 'admin' })
                            .then(admin => {
                                let loca = 0;
                                let check = 0;
                                admin.messages.forEach((message, index) => {
                                    if (message.id == owner.id) {
                                        check = 1;
                                        loca = index;
                                    }
                                })
                                if (check == 0) {
                                    admin.messages.unshift(message.owner);
                                    admin.save()
                                        .then(() => { res.json('success') })
                                } else {
                                    let arr = admin.messages.splice(loca, 1);
                                    admin.messages.unshift(arr[0]);
                                    admin.messages[0].seen = false;
                                    admin.save()
                                        .then(() => { res.json('success') })
                                }
                            })
                    })
            })
            .catch(() => { })

    }

    seenMessage(req, res, next) {
        User.findOne({ level: 'admin' }, (err, admin) => {
            admin.messages[req.params.index].seen = true;
            admin.markModified('messages')
            admin.save()
                .then(() => res.json('success'))
        })

    }

    actionAdmin(req, res, next) {
        if (req.session.authUser._id == '5fb7e2f7662281052c43df98') {
            if (req.body.type == 'user') {
                User.findOne({ _id: req.body.id })
                    .then(user => {
                        user.checked = req.body.status;
                        user.notifications.push({
                            avatar: user.avatar,
                            id: user._id,
                            content: req.body.status == 1 ? 'Admin đã phê duyệt tài khoản của bạn.' : 'Admin đã từ chối tài khoản của bạn.'
                        })
                        user.save()
                            .then(() => res.json(user._id))
                            .catch(() => { })
                    })
            } else if (req.body.type == 'post') {
                Post.findOne({ _id: req.body.id })
                    .then(post => {
                        post.checked = req.body.status;
                        post.save()
                            .then(() => {
                                User.findOne({ _id: post.owner })
                                    .then(user => {
                                        user.notifications.push({
                                            avatar: user.avatar,
                                            id: user._id,
                                            content: req.body.status == 1 ? 'Admin đã phê duyệt bài viết của bạn.' : 'Admin đã từ chối bài viết của bạn.'
                                        })
                                        user.save()
                                            .then(() => {
                                                res.json(user._id)
                                            })
                                    })
                            })
                    })
            }
        } else {
            return res.render('error', {
                layout: false,
            })
        }
    }

    getInfoById(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(user => mongooseToObj(user))
            .then(user => {
                user.password_hash = '';
                res.json(user)
            })
    }

    getInfo(req, res, next) {
        User.findOne({ username: req.query.key })
            .then(user => mongooseToObj(user))
            .then(user => {
                user.password_hash = '';
                res.json(user)
            })
    }
    getNoti(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(user => {
                res.json(user.notifications.reverse())
            })
            .catch(() => { })
    }
    profile(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then(account => {
                Post.find({ owner: req.params.id }).limit(10)
                    .then(posts => res.json({ account, posts }))
            })
            .catch(() => res.send('Khong ton tai nguoi dung'))

    }

    // profileNav(req, res, next) {
    //     User.findOne({ _id: req.params.id })
    //         .then(account => {
    //             Post.find({ owner: req.params.id }).limit(10)
    //                 .then(posts => res.json({ account, posts }))
    //         })
    //         .catch(() => res.send('Khong ton tai nguoi dung'))
    // }

    editProfile(req, res, next) {

    }
    changePasswordDB(req, res, next) {

    }

    changeInfoDB(req, res, next) {

    }

    logout(req, res, next) {
        req.session.isAuthenticated = false;
        req.session.authUser = null;
        //tra ve trang truoc do
        // console.log(req.headers.referer)
        res.redirect(req.headers.referer || '/');
    }

    restrictLogin(req, res, next) {
        if (!req.session.isAuthenticated) {
            return res.redirect(`/account/login?retUrl=${req.originalUrl}`)
        }
        next()
    }
    restrictRegister(req, res, next) {
        if (req.session.isAuthenticated) {
            return res.redirect(`/`)
        }
        next()
    }

}

async function getMessagesInfo(posts) {
    for (var message of messages) {
        var user = await User.findOne({ _id: message.owner });
        message.ownerName = user.fullname;
        message.ownerAvatar = user.avatar;
        message.ownerUsername = user.username;
        message.ownerGender = user.gender;
        message.ownerPhone = user.phone;
        message.ownerEmail = user.email;
        message.ownerAddress = user.address;
        // let date_ob = message.updatedAt;
        // let date = ("0" + date_ob.getDate()).slice(-2);
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // let year = date_ob.getFullYear();
        // message.date = date + '/' + month + '/' + year;
    }
    return messages
}
async function getPostInfo(post) {
    var user = await User.findOne({ _id: post.owner });
    post.authorName = user.fullname;
    post.authorAvatar = user.avatar;

    let updatedTime = post.updatedAt;
    let date = ("0" + updatedTime.getDate()).slice(-2);
    let month = ("0" + (updatedTime.getMonth() + 1)).slice(-2);
    let year = updatedTime.getFullYear();
    post.updatedTime = date + '/' + month + '/' + year;

    let createdTime = post.createdAt;
    date = ("0" + createdTime.getDate()).slice(-2);
    month = ("0" + (createdTime.getMonth() + 1)).slice(-2);
    year = createdTime.getFullYear();
    post.createdDate = date + '/' + month + '/' + year;
    return post;
}
async function getPostsInfo(posts) {
    for (var post of posts) {
        var user = await User.findOne({ _id: post.owner });
        post.authorName = user.fullname;
        post.authorAvatar = user.avatar;

        let updatedTime = post.updatedAt;
        let date = ("0" + updatedTime.getDate()).slice(-2);
        let month = ("0" + (updatedTime.getMonth() + 1)).slice(-2);
        let year = updatedTime.getFullYear();
        post.updatedTime = date + '/' + month + '/' + year;

        let createdTime = post.createdAt;
        date = ("0" + createdTime.getDate()).slice(-2);
        month = ("0" + (createdTime.getMonth() + 1)).slice(-2);
        year = createdTime.getFullYear();
        post.createdDate = date + '/' + month + '/' + year;
    }
    return posts
}

module.exports = new AccountController;