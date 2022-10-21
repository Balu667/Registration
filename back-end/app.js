const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const app = express();

app.use(express.json());


app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
   next();
 });


app.use("/api", userRoutes);

const uri = "mongodb+srv://mahendra:Balumahi7780@cluster0.wlu0ovk.mongodb.net/dokonoly?retryWrites=true&w=majority"

async function connect() {
    try{
      await mongoose.connect(uri);
      console.log("connected to mongoDb");
    }catch(err){
      console.log(err)
    }
}

connect();

app.listen(4000,() => console.log("app is listing on port 4000"));