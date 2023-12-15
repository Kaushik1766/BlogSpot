import express from "express";
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BlogSpot",
    password: "abcd",
    port: 5432,
});

db.connect();

let content = [
    {
        title: "Blue strands in the Sands",
        post: "Mauritania is blue. That sounds strange perhaps. Most people, if they think of the country at all, or know about it for that matter, might say it is more sand coloured. It is 90% desert after all. And sand is everywhere. The desert never far away. Nouadibhou, Mauritinia’s second largest city, feels more like a conglomeration of desert villages then a city. There are a few paved roads, but most of it is rutted tracks, swathes of open sandy patches, low mud brick dwellings, goats, camels, Bedouin tents, and lots and lots of garbage. Most people would say it’s a shithole. I liked it. Mainly because it just isn’t like any other city I have been to. And the fishing port is very interesting. You aren’t allowed to take pictures for some reason, but you are free to stroll around and watch the hustle and bustle that surrounds it. It’s colourful, a mix of Senegalese fishermen and Mauritanian buyers. Colourful not only in dress, but also in skin. From darker tones to lighter ones.",
        author: "Ralf Kreuze",
    },
    {
        title: "Blue strands in the Sands",
        post: "Mauritania is blue. That sounds strange perhaps. Most people, if they think of the country at all, or know about it for that matter, might say it is more sand coloured. It is 90% desert after all. And sand is everywhere. The desert never far away. Nouadibhou, Mauritinia’s second largest city, feels more like a conglomeration of desert villages then a city. There are a few paved roads, but most of it is rutted tracks, swathes of open sandy patches, low mud brick dwellings, goats, camels, Bedouin tents, and lots and lots of garbage. Most people would say it’s a shithole. I liked it. Mainly because it just isn’t like any other city I have been to. And the fishing port is very interesting. You aren’t allowed to take pictures for some reason, but you are free to stroll around and watch the hustle and bustle that surrounds it. It’s colourful, a mix of Senegalese fishermen and Mauritanian buyers. Colourful not only in dress, but also in skin. From darker tones to lighter ones.",
        author: "Ralf Kreuze",
    },
]

app.get('/', (req, res) => {
    db.query("select * from blog").then((resp) => {
        res.send(resp.rows);
    });
});
app.post("/del", async (req, res) => {
    await db.query(`delete from blog where id = ${req.body.id};`);
    res.send();
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});