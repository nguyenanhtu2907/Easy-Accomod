const User = require('../models/User');
const Post = require('../models/Post');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');
const { post } = require('../routes/account');
const { info } = require('node-sass');

class AccountController {

    register(req, res, next) {
        res.render('register', {
            layout: false,
        });
    }

    registerDB(req, res, next) {
        const password_hash = bcrypt.hashSync(req.body.password, 8);
        var gender = '';
        if (req.body.gender == 'male') {
            gender = 'Nam'
        } else if (req.body.gender == 'female') {
            gender = 'Nữ'
        } else {
            gender = 'Khác'
        }
        const entity = {
            username: req.body.username,
            fullname: req.body.fullname,
            gender: gender,
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
                Post.find({ checked: 1 }).limit(5).sort({ saved: -1 })
                    .then(savedPosts => multipleMongooseToObj(savedPosts))
                    .then(savedPosts => {
                        Post.find({ checked: 1 }).limit(5).sort({ viewed: -1 })
                            .then(viewedPosts => multipleMongooseToObj(viewedPosts))
                            .then(viewedPosts => {
                                User.find({ level: 'owner' }).sort({ totalPost: -1 }).limit(5)
                                    .then(owners => {
                                        res.json({ savedPosts, viewedPosts, owners })
                                    })
                                    .catch(() => { })
                            })
                            .catch(() => { })
                    })
                    .catch(() => { })
            } else if (option == 8) {
                User.findOne({ _id: req.session.authUser._id })
                    .then(admin => mongooseToObj(admin))
                    .then(admin => {
                        res.json(admin.messages)
                    })
                    .catch(() => { })
            }else if (option == 9) {
                Post.find({ isReported: true })
                    .then(posts => getPostsInfo(posts))
                    .then(users => multipleMongooseToObj(users))
                    .then(users => res.json(users))
                    .catch(() => { })
            } else {
                var price1 = 0, price2 = 0, price3 = 0, price4 = 0, price5 = 0;
                var acceptOwner = 0, waitingOwner = 0, rejectOwner = 0;
                var rentPost = 0, availablePost = 0, waitingPost = 0, rejectPost = 0, expiredPost = 0;
                var month = [];
                var profit = [];
                var owners = [];

                User.find({}, (err, users) => {
                    Post.find({}, (err, posts) => {
                        posts.forEach(post => {
                            if (post.checked == 0) {
                                waitingPost++;
                            } else if (post.checked == -1) {
                                rejectPost++;
                            } else if (post.checked == 1) {
                                if (post.availabletime == 0) {
                                    expiredPost++;
                                } else {
                                    availablePost++;
                                }
                            }
                            if (post.rentcost >= '5.000.000') {
                                price1++;
                            } else if (post.rentcost >= '4.000.000' && post.rentcost < '5.000.000') {
                                price2++;
                            } else if (post.rentcost >= '3.000.000' && post.rentcost < '4.000.000') {
                                price3++;
                            } else if (post.rentcost >= '2.000.000' && post.rentcost < '3.000.000') {
                                price4++;
                            } else {
                                price5++;
                            }
                        })
                        users.forEach(user => {
                            if (user.level == 'admin') {
                                var index = user.profit.length - 1;
                                var under = user.profit.length > 12 ? user.profit.length - 12 : 0;
                                for (index; index >= under; index--) {
                                    month.unshift(user.profit[index].month)
                                    profit.unshift((user.profit[index].total / 1000000).toFixed(2))
                                }
                                let months = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"];
                                let monthLength = month.length;
                                if (monthLength < 12) {
                                    let i = 12 - monthLength - 1;
                                    for (i; i >= 0; i--) {
                                        month.unshift(months[(i + 12) % 12])
                                        profit.unshift(0)
                                    }
                                }
                            } else if (user.level == 'owner') {
                                owners.push(user);
                            }
                        })
                        owners.forEach(owner => {
                            if (owner.checked == 0) {
                                waitingOwner++;
                            } else if (owner.checked == 1) {
                                acceptOwner++;
                            } else {
                                rejectOwner++;
                            }
                        })

                        return res.render('manage', {
                            layout: false,
                            price1, price2, price3, price4, price5,
                            waitingOwner, acceptOwner, rejectOwner,
                            availablePost, expiredPost, waitingPost, rejectPost, rentPost,
                            month, profit,
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
                        post.isReported = false;
                        if (req.body.status == 1) {
                            post.extendedTime = Date.now();
                        }
                        post.save()
                            .then(() => {
                                User.findOne({ _id: post.owner })
                                    // .then(owner => mongooseToObj(owner))
                                    .then(owner => {
                                        if (req.body.status == 1) {
                                            owner.totalPost++;
                                        }
                                        owner.notifications.push({
                                            avatar: owner.avatar,
                                            content: req.body.status == 1 ? 'Admin đã phê duyệt bài viết của bạn.' : 'Admin đã từ chối bài viết của bạn.'
                                        })
                                        // owner.markModified('totalPost')
                                        console.log(owner.totalPost)
                                        owner.save()
                                            .then(() => {
                                                if (req.body.status == 1) {
                                                    var months = ["January", "February", "March", "April", "May", "June",
                                                        "July", "August", "September", "October", "November", "December"];
                                                    var indexMonth = new Date().getMonth();
                                                    var currentMonth = months[indexMonth];
                                                    User.findOne({ level: 'admin' })
                                                        .then(admin => {
                                                            if (admin.profit[admin.profit.length - 1].month == currentMonth) {
                                                                admin.profit[admin.profit.length - 1].total += post.availabletime * 25000;
                                                            } else {
                                                                admin.profit.push({
                                                                    month: currentMonth,
                                                                    total: post.availabletime * 25000
                                                                })
                                                            }
                                                            admin.markModified('profit')
                                                            admin.save()
                                                                .then(() => {
                                                                    return res.json(admin.level);
                                                                })
                                                        })
                                                } else {
                                                    return res.json(owner.level);
                                                }
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
        if (req.session.authUser && req.session.authUser._id == req.params.id && req.session.authUser.level == 'renter') {
            res.redirect('/')
        } else {
            var userTarget;
            var posted;
            var waiting;
            var saved;
            var expired;
            User.findOne({ _id: req.params.id }, function (err, user) {
                if (!user) {
                    return res.render('error', {
                        layout: false
                    })
                } else {
                    userTarget = user;
                    let numberExpired = 0;
                    Post.count({ owner: req.params.id, availabletime: 0, checked: 1 }, function (err, num) {
                        if (num) {
                            numberExpired = num
                        }
                    })
                    let numberWaiting = 0;
                    Post.count({ owner: req.params.id, checked: 0 }, function (err, num) {
                        if (num) {
                            numberWaiting = num
                        }
                    })
                    let numberPosted = 0;
                    Post.count({ owner: req.params.id, availabletime: { $gt: 0 }, checked: 1 }, function (err, num) {
                        if (num) {
                            numberPosted = num
                        }
                    })

                    Post.find({ owner: req.params.id, availabletime: { $gt: 0 }, checked: 1, statusrent: false }).limit(7).sort({ 'viewed': -1 })
                        .then(posts => multipleMongooseToObj(posts))
                        .then(posts => getPostsInfo(posts))
                        .then(posts => {
                            if (userTarget) {
                                if (req.session.authUser) {
                                    expired = {
                                        totalPosts: numberExpired,
                                        page: (numberExpired > 10 ? Math.ceil(numberExpired / 10) : 1),
                                        showPage: numberExpired > 10 ? 1 : 0,
                                        showTab: req.session.authUser._id == req.params.id ? 1 : 0,
                                    }
                                    waiting = {
                                        totalPosts: numberWaiting,
                                        page: (numberWaiting > 10 ? Math.ceil(numberWaiting / 10) : 1),
                                        showPage: numberWaiting > 10 ? 1 : 0,
                                        showTab: req.session.authUser._id == req.params.id ? 1 : 0,
                                    }
                                    saved = {
                                        totalPosts: req.session.authUser.saved.length,
                                        page: (req.session.authUser.saved.length > 10 ? Math.ceil(req.session.authUser.saved.length / 10) : 1),
                                        showPage: req.session.authUser.saved.length > 10 ? 1 : 0,
                                        showTab: req.session.authUser._id == req.params.id ? 1 : 0,
                                    }
                                }
                                posted = {
                                    totalPosts: numberPosted,
                                    page: (numberPosted > 10 ? Math.ceil(numberPosted / 10) : 1),
                                    showPage: numberPosted > 10 ? 1 : 0,
                                }

                                return res.render('profile', {
                                    layout: false,
                                    userTarget: mongooseToObj(userTarget),
                                    posted,
                                    waiting,
                                    saved,
                                    expired,
                                    posts,
                                    query: req.query.tab ? req.query.tab : 'posted',
                                })
                            } else {
                                return res.render('error', {
                                    layout: false
                                })
                            }
                        }) //render profile page
                        .catch(() => { res.send(error) }) //reder error
                }
            })
        }
    }

    profileNav(req, res, next) {
        if (req.query.tab == 'expired') {
            Post.find({ owner: req.params.id, availabletime: 0, checked: 1, statusrent: false }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
                .then(posts => multipleMongooseToObj(posts))
                .then(posts => getPostsInfo(posts))
                .then(posts => res.json({
                    // total: number,
                    saved: req.session.authUser ? req.session.authUser.saved : '', //account 1 vao account 2 thi se thay duoc nhung bai viet nao minh dang saved
                    posts,
                }))
                .catch(() => { })
        } else if (req.query.tab == 'waiting') {
            Post.find({ owner: req.params.id, checked: 0 }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
                .then(posts => multipleMongooseToObj(posts))
                .then(posts => getPostsInfo(posts))
                .then(posts => res.json({
                    // total: number,
                    saved: req.session.authUser ? req.session.authUser.saved : '', //account 1 vao account 2 thi se thay duoc nhung bai viet nao minh dang saved
                    posts,
                }))
                .catch(() => { })
        } else if (req.query.tab == 'saved') {
            // var ids = req.session.authUser.saved.map(id => {
            //     return mongoose.Types.ObjectId(id);
            // })
            Post.find({ _id: { $in: req.session.authUser.saved } }).limit(10).skip(req.query.page * 10 || 0)
                .then(posts => multipleMongooseToObj(posts))
                .then(posts => getPostsInfo(posts))
                .then(posts => {
                    res.json({
                        saved: req.session.authUser ? req.session.authUser.saved : '', //account 1 vao account 2 thi se thay duoc nhung bai viet nao minh dang saved
                        posts: posts,
                    })
                })
        } else {
            Post.find({ owner: req.params.id, availabletime: { $gt: 0 }, checked: 1, statusrent: false }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
                .then(posts => multipleMongooseToObj(posts))
                .then(posts => getPostsInfo(posts))
                .then(posts => res.json({
                    // total: number,
                    posts,
                    saved: req.session.authUser ? req.session.authUser.saved : '', //account 1 vao account 2 thi se thay duoc nhung bai viet nao minh dang saved
                }))
                .catch(() => { })
        }
    }

    addToSavedList(req, res, next) {
        if (req.session.authUser) {
            User.findOne({ _id: req.session.authUser._id })
                .then(user => {
                    let index = user.saved.indexOf(req.query.post);
                    if (index == -1) {
                        user.saved.push(req.query.post)
                        req.session.authUser.saved.push(req.query.post)
                        user.save()
                            .then(() => { res.json(user.saved) })
                    } else {
                        user.saved.splice(index, 1);
                        req.session.authUser.saved.splice(index, 1);
                        user.save()
                            .then(() => { res.json(user.saved) })
                    }
                })
        }
    }

    editProfile(req, res, next) {

        if (req.params.id === req.session.authUser._id && (req.query.type === 'info' || req.query.type === 'password')) {
            User.findOne({ _id: req.params.id })
                .then(user => mongooseToObj(user))
                .then(user => {
                    res.render('editProfile', {
                        layout: false,
                        user,
                        type: req.query.type,
                    })
                })
        } else {
            return res.render('error', {
                layout: false,
            })
        }
    }

    editProfileDB(req, res, next) {
        if (req.query.type == 'info') {
            User.findOne({ _id: req.params.id })
                .then(user => {
                    if(req.body.avatar){
                        user.avatar = req.body.avatar;
                        req.session.authUser.avatar = req.body.avatar;
                    }
                    user.fullname = req.body.fullname;
                    req.session.authUser.fullname = req.body.fullname;
                    user.phone = req.body.phone;
                    user.identity = req.body.identity;
                    user.email = req.body.email;
                    user.address = req.body.ward + ', ' + req.body.district + ', ' + req.body.province;
                    user.user_description = req.body.user_description;
                    user.save()
                        .then(() => {
                            res.render('editProfile', {
                                layout: false,
                                user: req.body,
                                type: req.query.type,
                                message: "Sửa thông tin cá nhân thành công!"
                            })
                        })
                })
        } else if (req.query.type == 'password') {
            User.findOne({ _id: req.params.id }, function (err, user) {
                const rs = bcrypt.compareSync(req.body.old_pass, user.password_hash);
                if (!rs) {
                    res.render('editProfile', {
                        layout: false,
                        user: req.session.authUser,
                        type: req.query.type,
                        message: '*Mật khẩu cũ không đúng!!!',
                    })
                }
                const password_hash = bcrypt.hashSync(req.body.new_pass, 8);
                user.password_hash = password_hash;
    
                user.save()
                    .then(() => res.render('editProfile', {
                        layout: false,
                        user: req.session.authUser,
                        type: req.query.type,
                        message: 'Đổi mật khẩu thành công',
                    }))
                    .catch(error => { })
            })
        }
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