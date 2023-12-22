import express from "express";
import cors from 'cors';
import pg from 'pg';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


const saltRounds = 4;
const app = express();
app.use(cors());
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BlogSpot",
    password: "abcd",
    port: 5432,
});

db.connect();

app.post("/register", async (req, res) => {
    let { username, password } = req.body;
    if ((await db.query(`select * from users where username = '${username}'`)).rows[0] == null) {
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                console.log("error" + err);
                res.send("Error occured");
            }
            else {
                await db.query(`insert into users(username, password) values('${username}','${hashedPassword}')`);
                res.send("Registered successfully");
            }
        })
    }
    else {
        res.send("username already taken");
    }
});

app.post("/login", async (req, res) => {
    let { username, password } = req.body;
    let prevId = (await db.query(`select sessionid from users where username = '${username}'`)).rows[0];
    console.log(prevId);
    if (prevId != null && prevId.sessionid == req.headers.cookie?.split('=')[1]) {
        res.send("already logged in");
    }
    else {
        let hashedPassword = ((await db.query(`select * from users where username = '${username}' `)).rows[0]);

        if (hashedPassword == null) {
            res.send("user not registered");
        }
        else {
            bcrypt.compare(password, hashedPassword.password, async (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("Error occured");
                }
                if (result == false) {
                    res.send("Wrong password");
                }
                else {
                    const sessionId = uuidv4();
                    await db.query(`update users set sessionid = '${sessionId}' where username = '${username}'`);
                    res.cookie('session', sessionId, { maxAge: 900000 });
                    res.send("Logged in successfully.");
                }
            })
        }
    }
})

app.get('/', (req, res) => {
    db.query("select * from blog").then((resp) => {
        res.send(resp.rows);
    });
});
app.post("/del", async (req, res) => {
    await db.query(`delete from blog where id = ${req.body.id};`);
    res.send();
});
app.post('/create', async (req, res) => {
    console.log(req.body);
    await db.query(`insert into blog(post, title, author) values('${req.body.post}','${req.body.title}','${req.body.author}')`);
    res.send();
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});