import dotenv from "dotenv";



const mode = process.argv[2];

dotenv.config({
  path:mode=== "DEVELOPMENT"? "./.env.development" : "./.env.production"
});


export default{
  port: process.env.PORT,
  mongourl: process.env.MONGO_URL,
  adminname: process.env.ADMIN_NAME,
  adminpass: process.env.ADMIN_PASS,
  sshurl: process.env.SSH_URL,
  apiUrl: process.env.API_URL,
  googleUser: process.env.GOOGLE_MAIL,
  googlePass: process.env.GOOGLE_PASS
}