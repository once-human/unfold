import dotenv from 'dotenv';
dotenv.config(); // ✅ Must come FIRST

import { app } from "./app.js";


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
