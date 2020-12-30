const User = require('../models/User');
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class PostController {
    createPost(req, res, next) {
        res.render('createPost', {
            layout: false,
        })
    }
    createPostDB(req, res, next) {

        req.body.author = req.session.authUser._id;
        var address = {
            ward: req.body.ward,
            district: req.body.district,
            province: req.body.province,
            detail: req.body.detail_address,
        };

        var images = [];
        if (typeof req.body.images_room == 'string') {
            images.push(req.body.images_room)
        } else {
            for (var i = 0; i < req.body.images_room.length; i++) {
                images.push(req.body.images_room[i]);
            }
        }

        var equipments = {
            airconditional: req.body.airconditional == 'Yes' ? 'Có' : 'Không',
            bathroom: req.body.bathroom == 'Yes' ? 'Có' : 'Không',
            freazer: req.body.freazer == 'Yes' ? 'Có' : 'Không',
            hottank: req.body.hottank == 'Yes' ? 'Có' : 'Không',
            closed: req.body.closed == 'Yes' ? 'Có' : 'Không',
            washingmachine: req.body.washing_machine == 'Yes' ? 'Có' : 'Không',
            balcony: req.body.balcony == 'Yes' ? 'Có' : 'Không',
            kitchen: req.body.kitchen,
            wc: req.body.so_phong_WC,
            bedroom: req.body.so_phong_ngu,
            floors: req.body.so_tang,
            floor: req.body.vi_tri_tang,
        }
        var cost;
        if (req.body.rentcost.length <= 6) {
            cost = req.body.rentcost.slice(0, req.body.rentcost.length - 3) + '.' + req.body.rentcost.slice(-3)
        } else {
            cost = req.body.rentcost.slice(0, req.body.rentcost.length - 6) + '.' + req.body.rentcost.slice(-6, -3) + '.' + req.body.rentcost.slice(-3)
        }
        const entity = {
            checked: req.session.authUser.level == 'admin' ? 1 : 0,
            title: req.body.title,
            owner: req.body.author,
            thumbnail: images[0],
            address: address,
            contact: req.session.authUser.phone,
            nearby: req.body.address_description,
            description: req.body.description,
            rentcost: cost,
            availabletime: req.body.availabletime,
            roomtype: req.body.rent,
            area: req.body.area,
            electric: req.body.electric,
            water: req.body.water,
            equipments: equipments,
            images: images,
            infoOwner: req.body.owner == 'Yes' ? 'Chung chủ' : 'Không chung chủ',
            key: removeVietnameseTones(address.detail + ' ' + req.body.title + ' ' + req.body.address_description + ' ' + req.body.rent),
        }

        const post = new Post(entity);

        post.save()
            .then(() => {
                return res.render('createPost', {
                    layout: false,
                    message: req.session.authUser.level == 'admin' ? "Tạo bài viết thành công" : "Bạn đã tạo bài viết thành công. Hãy chờ admin phê duyệt bài viết của bạn.",
                })
            })
            .catch(error => { })
    }

    deletePost(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                if (req.session.authUser && req.session.authUser._id == post.owner && post.checked != 1) {
                    Post.deleteOne({ slug: req.params.slug })
                        .then(() => res.redirect(`/account/${req.session.authUser._id}`))
                        .catch(next);
                }else{
                    res.render('error', {
                        layout: false,
                    })
                }
            })
    }

    postDetail(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                let extendedTime = post.extendedTime || post.createdAt.getTime();
                if (Date.now() - extendedTime >= post.availabletime * 86400000) {
                    post.availabletime = 0;
                    post.markModified('availabletime');
                    post.save()
                        .then(post => mongooseToObj(post))
                        .then(post => getPostInfo(post))
                        .then((post) => {
                            if (req.session.authUser && req.session.authUser._id == post.owner) {
                                return res.render('postDetail', {
                                    layout: false,
                                    post,
                                })
                            } else {
                                res.redirect('back')
                            }

                        })
                } else {
                    post.viewed += 1;
                    post.save()
                        .then(post => mongooseToObj(post))
                        .then(post => getPostInfo(post))
                        .then((post) => {
                            return res.render('postDetail', {
                                layout: false,
                                post,
                            })
                        })
                }
            })
            .catch(() => {
                res.render('error', {
                    layout: false,
                })
            })
    }

    addComment(req, res, next) {
        var comment = {
            authorName: req.session.authUser.fullname,
            authorId: req.session.authUser._id,
            authorAvatar: req.session.authUser.avatar,
            content: req.body.content,
            star: req.body.star_voted == false ? 0 : req.body.star_voted,
            date: req.body.date,
        }
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                post.comments.push(comment);
                post.save()
                    .then(() => res.json(post.comments))
                    .catch(() => { })
            })
    }

    reportPost(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            // .then(post => mongooseToObj(post))
            .then(post => {
                post.isReported = true;
                post.markModified('isReported')
                post.save()
                    .then(() => res.json(post.isReported))
            })
            .catch(() => {
                res.render('error', {
                    layout: false,
                })
            })
    }

    extendPost(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                post.extendedTime = Date.now();
                post.availabletime = req.query.days
                post.save()
                    .then(() => {
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
                    })
            })
    }

    modifySaved(req, res, next) {
        if (req.session.authUser) {
            Post.findOne({ _id: req.query.post })
                .then(post => {
                    post.saved += req.query.key == 'saved' ? 1 : -1;
                    post.save()
                        .then(() => { res.json(post.saved) })
                })
        }
    }

    search(req, res, next) {
        var apartment = 0;
        var miniApartment = 0;
        var motel = 0;
        var house = 0;
        Post.count({ roomtype: 'Chung cư', availabletime: { $gt: 0 }, checked: 1 }, function (err, number) {
            if (number) {
                apartment = number
            }
        })
        Post.count({ roomtype: 'Chung cư mini', availabletime: { $gt: 0 }, checked: 1 }, function (err, number) {
            if (number) {
                miniApartment = number
            }
        })
        Post.count({ roomtype: 'Phòng trọ', availabletime: { $gt: 0 }, checked: 1 }, function (err, number) {
            if (number) {
                motel = number
            }
        })
        Post.count({ roomtype: 'Nhà nguyên căn', availabletime: { $gt: 0 }, checked: 1 }, function (err, number) {
            if (number) {
                house = number
            }
        })
        setTimeout(() => {
            Post.aggregate([
                { '$match': { checked: 1, availabletime: { $gt: 0 } } },
                {
                    '$group': {
                        '_id': '$address.province',
                        'totalPosts': { '$sum': 1 },
                    }
                },
                {
                    '$sort': { 'totalPosts': -1 }
                }
            ], (err, postsProvince) => {
                postsProvince.forEach((province, index) => {
                    province.index = index + 1;
                })
                res.render('search', {
                    layout: false,
                    apartment,
                    miniApartment,
                    house,
                    motel,
                    postsProvince
                })
            })
        }, 500)
    }

    searchResult(req, res, next) {
        var query = {
            checked: 1,
            statusrent: false,
            availabletime: { $gt: 0 }
        }
        if (req.query.province) {
            query["address.province"] = req.query.province;
        }
        if (req.query.district) {
            query["address.district"] = { $regex: '.*' + req.query.district };
        }
        if (req.query.ward) {
            query["address.ward"] = { $regex: '.*' + req.query.ward };
        }
        if (req.query.roomType) {
            query.roomtype = req.query.roomType;
        }
        if (req.query.maxPrice && req.query.minPrice) {
            query.rentcost = { $gt: req.query.minPrice, $lt: req.query.maxPrice }
        }

        if (req.query.area) {
            if (req.query.area.length == 33) {
                query.area = { $lt: 20 }
            } else if (req.query.area.length == 8) {
                query.area = { $gt: req.query.area.slice(0, 2) * 1, $lt: req.query.area.slice(-3, -1) * 1 }
            } else if (req.query.area.length == 5) {
                query.area = { $gt: 50 }
            }
        }
        if (req.query.bedrooms) {
            query["equipments.bedroom"] = { $lt: req.query.bedrooms.slice(0, 1) * 1 }
        }
        if (req.query.tulanh) {
            query["equipments.freazer"] = 'Có'
        }
        if (req.query.dieuhoa) {
            query["equipments.airconditional"] = 'Có'
        }
        if (req.query.nonglanh) {
            query["equipments.hottank"] = 'Có'
        }
        if (req.query.chungchu) {
            query.infoOwner = "Chung chủ"
        }
        if (req.query.search) {
            // let queryStr = removeVietnameseTones(req.query.search);
            // let queryArr = queryStr.split(" ");
            // let result =  queryArr.join('.*');
            // query.key = {$regex: '.*'+result+'.*'}
            query.$text = { $search: req.query.search }
        }
        let total = 0;
        Post.count(query, function (err, number) {
            if (number) {
                total = number;
            }
        })
        let sort;
        if (req.query.sort == 'old') {
            sort = { 'createdAt': 1 }
        } else if (req.query.sort == 'cheap') {
            sort = { 'rentcost': 1 }
        } else if (req.query.sort == 'expensive') {
            sort = { 'rentcost': -1 }
        } else {
            sort = { 'createdAt': -1 }
        }
        Post.find(query).limit(10).skip(10 * req.query.page || 0).sort(sort)
            .then(posts => multipleMongooseToObj(posts))
            .then(posts => getPostsInfo(posts))
            .then(posts => res.json({
                posts,
                total,
                saved: req.session.authUser ? req.session.authUser.saved : '',
            }))

    }

    editPost(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                if (post.checked == 1 || !req.session.authUser || post.owner != req.session.authUser._id) {
                    return res.render('error', {
                        layout: false,
                    })
                } else {
                    return res.render('editPost', {
                        layout: false,
                        post: mongooseToObj(post),
                    })
                }
            })
    }
    editPostDB(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                req.body.author = req.session.authUser._id;
                var address = {
                    ward: req.body.ward,
                    district: req.body.district,
                    province: req.body.province,
                    // detail: req.body.detail_address,
                };

                var images = [];
                if (typeof req.body.images_room == 'string') {
                    images.push(req.body.images_room)
                } else {
                    for (var i = 0; i < req.body.images_room.length; i++) {
                        images.push(req.body.images_room[i]);
                    }
                }

                var equipments = {
                    airconditional: req.body.airconditional == 'Yes' ? 'Có' : 'Không',
                    bathroom: req.body.bathroom == 'Yes' ? 'Có' : 'Không',
                    freazer: req.body.freazer == 'Yes' ? 'Có' : 'Không',
                    hottank: req.body.hottank == 'Yes' ? 'Có' : 'Không',
                    kitchen: req.body.kitchen,
                    wc: req.body.so_phong_WC,
                    bedroom: req.body.so_phong_ngu,
                    floors: req.body.so_tang,
                    floor: req.body.vi_tri_tang,
                }
                var cost;
                if (req.body.rentcost.length <= 6) {
                    cost = req.body.rentcost.slice(0, req.body.rentcost.length - 3) + '.' + req.body.rentcost.slice(-3)
                } else {
                    cost = req.body.rentcost.slice(0, req.body.rentcost.length - 6) + '.' + req.body.rentcost.slice(-6, -3) + '.' + req.body.rentcost.slice(-3)
                }

                post.checked = 0;
                post.title = req.body.title;
                post.owner = req.body.author;
                post.thumnail = images[0];
                post.address = address;
                post.contact = req.session.authUser.phone;
                post.nearby = req.body.address_description;
                post.description = req.body.description;
                post.rentcost = cost;
                post.roomtype = req.body.rent;
                post.area = req.body.area;
                post.electric = req.body.electric;
                post.water = req.body.water;
                post.equipments = equipments;
                post.images = images;
                post.infoOwner = req.body.info_owner;
                post.key = removeVietnameseTones(address.detail + ' ' + req.body.address_description + ' ' + req.body.rent);


                // const post = new Post(entity);
                post.save()
                    .then(() => res.render('editPost', {
                        layout: false,
                        message: "Bạn đã chỉnh sửa bài viết thành công. Hãy chờ admin phê duyệt bài viết của bạn.",
                    }))
            })
    }

    getInfo(req, res, next) {
        Post.findOne(req.query.key ? { _id: req.query.key } : { slug: req.query.slug })
            .then(post => mongooseToObj(post))
            .then(post => getPostInfo(post))
            .then(post => res.json(post))
    }

}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}
async function getPostInfo(post) {
    var user = await User.findOne({ _id: post.owner });
    post.authorName = user.fullname;
    post.authorAvatar = user.avatar;

    // let createdUser = user.createdAt;
    // date = ("0" + createdUser.getDate()).slice(-2);
    // month = ("0" + (createdUser.getMonth() + 1)).slice(-2);
    // year = createdUser.getFullYear();
    // post.authorCreated = date + '/' + month + '/' + year;

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
module.exports = new PostController;