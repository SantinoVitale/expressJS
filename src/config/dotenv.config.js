import dotenv from "dotenv";

dotenv.config();

export default{
  port: process.env.PORT,
  mongourl: process.env.MONGO_URL,
  adminname: process.env.ADMIN_NAME,
  adminpass: process.env.ADMIN_PASS,
  sshurl: process.env.SSH_URL
}