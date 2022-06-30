const requireLogin = (req,res,next) => {
    if (!req.session.user_id) {
        return res.redirect('/users/existing')
    }
    next()
}


module.exports = requireLogin