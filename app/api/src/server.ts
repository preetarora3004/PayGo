import app from "./app";
import { ApiError } from "./utils/error";

const PORT = process.env.PORT;

function start() {
    try {
        if(!PORT) {
            throw new ApiError(400, "Port not defined")
        }

        app.listen(PORT, ()=> {
            console.log(`App is listening on the PORT ${PORT}`)
        })
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

start();
