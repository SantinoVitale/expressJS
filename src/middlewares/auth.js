export function checkUser(req, res, next) {
  if(req.session.email){
    return next()
  }
  return res.status(401).render("error-page", {msg: "pls log in"})
}
export function checkAdmin(req, res, next){
  if(req.session.email && req.session.admin === "admin"){
    return next();
  }
  return res.status(401).render("error-page", {msg: "pls log in as a ADMIN"})
}