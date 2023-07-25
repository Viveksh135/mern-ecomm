const passport =require('passport')
exports.isAuth=(req,res,done)=>{
   return passport.authenticate('jwt')
}
//noe if token is right then we can select any token
exports.sanitizeUser=(user)=>{
    return {id:user.id,role:user.role}
}

exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmVjYWYxMjcxZDc4MmVjYWEwMTMxMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkwMjI1MzkzfQ.MdbtekH0dogsxwZI4BNjuyhW0Z6Xqg7Y_nodkaugmpA"
    return token;
};