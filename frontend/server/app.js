import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import bodyParser from 'body-parser';


export const app = express();
config({path: "./config.env"});

app.use(cors({
    origin: function(origin, callback) {
      console.log('Request origin:', origin); // Debug log
      console.log('Allowed origin:', process.env.FRONTEND_URL); // Debug log
      if (origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods:["GET","POST","PUT","DELETE","OPTION"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/v1/user" , userRouter);


removeUnverifiedAccounts();
connection();


app.use(errorMiddleware);// should be at the last of the code only 


