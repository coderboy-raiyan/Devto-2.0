/* eslint-disable no-console */
/* eslint-disable camelcase */
import mongoose from "mongoose";

const db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqspl.mongodb.net/dev_db?retryWrites=true&w=majority`;

const connectDb = () => {
    if (mongoose.connections[0].readyState) {
        console.log("already connected");
        return;
    }
    mongoose
        .connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

export default connectDb;
