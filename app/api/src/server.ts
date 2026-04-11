import app from "./app";

const PORT = process.env.PORT;

function start() {
    try {
        if(!PORT) {
            throw new Error("Port not defined")
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