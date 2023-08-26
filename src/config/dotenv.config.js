import dotenv from "dotenv";



const environment = "DEVELOPMENT";

dotenv.config({
  path:environment=== "DEVELOPMENT"? "./.env.development" : "./.env.production"
});


export default{
  environment: environment,
  port: process.env.PORT,
  mongourl: process.env.MONGO_URL,
  adminname: process.env.ADMIN_NAME,
  adminpass: process.env.ADMIN_PASS,
  sshurl: process.env.SSH_URL
}