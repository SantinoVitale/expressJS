import passport from "passport";
import local from "passport-local"
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import GitHubStrategy from "passport-github";

const localStrategy = local.Strategy;
const initializatePassport = () => {
  passport.use("register", new localStrategy(
    {passReqToCallback: true, usernameField: "email"}, async (req, username, password, done) => {
      const {firstName, lastName, age, email} = req.body;
      try{
        let user = await userModel.findOne({email: username});
        if(user){
          console.log("User already exist");
          return done(null, false)
        }
        const newUser = {
          firstName,
          lastName,
          email,
          age,
          password: createHash(password)
        }
        let result = await userModel.create({newUser})
        return done(null, result)
      }catch(error){
        return done("Error al obtener el usuario " + error)
      }

      
    }

  ))
  passport.use("login", new localStrategy({usernameField: "email"}, async(username, password, done) => {
    try{
      const user = await userModel.findOne({email: username})
      if(!user){
        console.log("User dont exist");
        return done(null, false)
      }
      if(!isValidPassword(user, password)) return done(null, false);
      return done(null, user)
    } catch(error) {
      return done(error)
    }
  }))
  passport.use("github", new GitHubStrategy({
    clientID: "Iv1.19ea2091c62da1fc",
    clientSecret: "4b412401a176602bb98428bf030675077324f9e8",
    callbackURL: "http://localhost:8080/api/session/githubcallback"
  }, async (accessToken, refreshToken, profile, done) => {
    try{
      console.log(profile);
      let user = await userModel.findOne({email: profile._json.email})
      if(!user){
        let newUser = {
          firstName: profile._json.firstName,
          lastName: "",
          age: 18,
          email: profile._json.email,
          password: ""
        }
        let result = await userModel.create(newUser)
        done(null, result)
      } else {
        done(null, user)
      }
    } catch (error){
      return done(error)
    }
  }))
  passport.serializeUser((user, done) => {
    done(null, user._id)
    })

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
  })
}
export default initializatePassport;