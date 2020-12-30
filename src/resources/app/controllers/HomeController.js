const Post = require('../models/Post')
const User = require('../models/User')
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class HomeController {
    index(req, res, next) {
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
            Post.find({ checked: 1 }).limit(8).sort({ saved: -1 })
                .then(savedPosts => multipleMongooseToObj(savedPosts))
                .then(savedPosts => {
                    Post.find({ checked: 1 }).limit(8).sort({ viewed: -1 })
                        .then(viewedPosts => multipleMongooseToObj(viewedPosts))
                        .then(viewedPosts => {
                            Post.find({ "address.province": 'Hà Nội', checked: 1, availabletime: { $gt: 0 } }).limit(4)
                                .then(hnPosts => multipleMongooseToObj(hnPosts))
                                .then(hnPosts => {
                                    Post.find({ "address.province": 'Hồ Chí Minh', checked: 1, availabletime: { $gt: 0 } }).limit(4)
                                        .then(hcmPosts => multipleMongooseToObj(hcmPosts))
                                        .then(hcmPosts => {
                                            res.render('home', {
                                                layout: false,
                                                savedPosts,
                                                viewedPosts,
                                                hnPosts,
                                                hcmPosts,
                                                firstCity: postsProvince[0],
                                                secondCity: postsProvince[1],
                                            })
                                        })
                                })
                            })
                        .catch(() => { })
                })
                .catch(() => { })
        })
    }
}

module.exports = new HomeController();
