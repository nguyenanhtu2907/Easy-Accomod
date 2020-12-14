<<<<<<< HEAD
class HomeController {
  index(req, res, next) {
    res.render("home");
  }
=======
const User = require('../models/Post')
const Post = require('../models/User')

class HomeController{
    index(req, res, next){
        res.render('home')
    }
>>>>>>> 5b49a35033e466259198237267dbfdb72bd740ff
}

module.exports = new HomeController();
