const authorization = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.status(401).json({ "message": "Unauthorized" });
    }
    next();
}
const isAdmin = (req,res,next) =>{
    if(!req.session.isAuth || req.session.authority != "admin" ){
        return res.status(401).json({ "message": "You're not administrator" });
    }
    next();
}
module.exports = {
    authorization,
    isAdmin
};
