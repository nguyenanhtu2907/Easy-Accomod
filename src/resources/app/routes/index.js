const homeRouter = require('./home');
const accountRouter = require('./account');
// const postRouter = require('./post');

function route(app) {

    // kiem tra da dang nhap hay chua
    // app.use(function (req, res, next) {
    //     if (req.session.isAuthenticated === null) {
    //         req.session.isAuthenticated = false;
    //     }
    //     res.locals.localIsAuthenticated = req.session.isAuthenticated;
    //     res.locals.localAuthUser = req.session.authUser;
    //     next();
    // })

    app.use('/account', accountRouter);

    // app.use('/post', postRouter);

    app.use('/', homeRouter);
}
module.exports = route;