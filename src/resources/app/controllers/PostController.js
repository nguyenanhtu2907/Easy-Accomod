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
        var address = req.body.ward + ', ' + req.body.district + ', ' + req.body.province;
        var images = [];
        if(typeof req.body.images_room == 'string'){
            images.push(req.body.images_room)
        }else{
            for (var i = 0; i < req.body.images_room.length; i++) {
                images.push(req.body.images_room[i]);
            }
        }
        var equipments = [
            req.body.airconditional == 'Yes' ? 'Điều hòa' : '',
            req.body.bathroom == 'Yes' ? 'Phòng tắm' : '',
            req.body.freazer == 'Yes' ? 'Tủ lạnh' : '',
            req.body.hottank == 'Yes' ? 'Nóng lạnh' : '',
            req.body.kitchen,
            req.body.so_phong_WC == '0' ? '' : 'Số phòng WC: ' + req.body.so_phong_WC,
            req.body.so_phong_ngu == '0' ? '' : 'Số phòng ngủ: ' + req.body.so_phong_ngu,
            req.body.so_tang == '0' ? '' : 'Số tầng: ' + req.body.so_tang,
            req.body.vi_tri_tang == '0' ? '' : 'Vị trí tầng: ' + req.body.vi_tri_tang,
        ]
        var cost;
        if(req.body.rentcost.length<=6){
            cost = req.body.rentcost.slice(0,req.body.rentcost.length-3)+'.'+ req.body.rentcost.slice(-3)
        }else{
            cost = req.body.rentcost.slice(0,req.body.rentcost.length-6)+'.'+ req.body.rentcost.slice(-6,-3)+'.'+ req.body.rentcost.slice(-3)
        }
        const entity = {
            checked: req.session.authUser.level == 'admin' ? 1 : 0,
            title: req.body.title,
            owner: req.body.author,
            thumnail: images[0],
            address: address,
            contact: req.session.authUser.phone,
            nearby: req.body.address_description,
            description: req.body.description,
            rentcost: cost,
            roomtype: req.body.rent,
            area: req.body.area,
            electric: req.body.electric,
            water: req.body.water,
            equipments: equipments,
            images: images,
            infoOwner: req.body.info_owner,
            key: removeVietnameseTones(req.body.address_description + ' ' + address + ' ' + equipments.join(' ')),
        }

        const post = new Post(entity);
        post.save()
            .then(() => res.render('createPost', {
                layout: false,
                message: req.session.authUser.level == 'admin' ? "Tạo bài viết thành công" : "Bạn đã tạo bài viết thành công. Hãy chờ admin phê duyệt bài viết của bạn.",
            }))
            .catch(error => { })
    }

    modifySaved(req, res, next){
        if (req.session.authUser) {
            Post.findOne({_id: req.query.post})
            .then(post=>{
                post.saved+=req.query.key=='saved'?1:-1;
                post.save()
                .then(()=>{res.json(post.saved)})
            })
        }
    }

    searchResult(req, res, next) {
        res.render('search', {
            layout: false,
        })
    }

    getInfo(req, res, next) {
        Post.findOne({ _id: req.query.key })
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