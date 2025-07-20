const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
require('dotenv').config()
//middlewire
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send('Chill Gamer Website is running')
})
//===============================
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rrsefbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {

        //create database
        const usersCollection = client.db('ChillGamer-User').collection('Users')
        const GameReviewCollection = client.db("GameReview").collection('Reviews')
        const WatchCollection = client.db("WatchList").collection('WatchItems')
        //top-rated-game
        app.get('/top-rated', async (req, res) => {
            const result = [
                {
                    "_id": "6754f42f66d9dfe1e8f74d1b",
                    "game_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1CbNB3xqoarlnvuiePeLSRTaEXhnEl1Aeg&s",
                    "game_title": "WWE 2K14",
                    "review": "WWE 2K14 is a professional wrestling video game developed by Yuke's and published by 2K for the PlayStation 3 and Xbox 360. It was released on October 29, 2013, in North America, October 30, 2013, in Japan, October 31, 2013, in Australia, and November 1, 2013, in Europe and India. The game's box art features The Rock as the cover athlete.",
                    "rating": "5",
                    "publish_year": "2014",
                    "genres": "Action",
                    "user_email": "mdmotiurrahman383@gmail.com",
                    "user_name": "Md Motiur Rahman"
                },
                {
                    "_id": "6754f35466d9dfe1e8f74d1a",
                    "game_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyJrDBrRNEstswFrQCysT3ijWKwkW703FWMg&s",
                    "game_title": "Age of Mythology",
                    "review": "Age of Mythology is a real-time strategy video game developed by Ensemble Studios and published by Microsoft Game Studios. It was released on October 31, 2002 in North America and on November 14, 2002 in Europe.",
                    "rating": "5",
                    "publish_year": "2002",
                    "genres": "RPG",
                    "user_email": "mdmotiurrahman383@gmail.com",
                    "user_name": "Md Motiur Rahman"
                },
                {
                    "_id": "675558c4aa2d69671def4670",
                    "game_image": "https://play-lh.googleusercontent.com/SIhOPLDreTKrf7VWPhvbHlXR78_IZs3965ilMpbBLQ4OqeyfApDdnT_Kxi7kwnx3i7M=w526-h296-rw",
                    "game_title": "Road Rash",
                    "review": "Road Rash is a motorcycle racing video game series by Electronic Arts in which the player participates in violent, illegal street races. The series started on the Sega Genesis/Mega Drive and was released on various other systems over the years. The game's title is based on the slang term for the severe friction burns that can occur in a motorcycle fall where skin comes into contact with the ground at high speed.",
                    "rating": "5",
                    "publish_year": "2000",
                    "genres": "RPG",
                    "user_email": "mdmotiurrahman383@gmail.com",
                    "user_name": "Md Motiur Rahman"
                },
                {
                    "_id": "67556e07144d2816e9557423",
                    "game_image": "https://media.contentapi.ea.com/content/dam/need-for-speed/images/2017/06/nfspgenkeyartrgbhorz-16x9.jpg.adapt.crop191x100.1200w.jpg",
                    "game_title": "Need for Speed (NFS)",
                    "review": "Need for Speed (NFS) is a racing game franchise published by Electronic Arts and currently developed by Criterion Games (the developers of the Burnout series). The series generally centers around illegal street racing, and tasks players to complete various types of races while evading the local law enforcement in police pursuits. Need for Speed is one of EA's oldest franchises not published under their EA Sports brand.",
                    "rating": "5",
                    "publish_year": "2015",
                    "genres": "RPG",
                    "user_email": "mdmotiurrahman383@gmail.com",
                    "user_name": "Md Motiur Rahman"
                },
                {
                    "_id": "67555ab3aa2d69671def4674",
                    "game_image": "https://th.bing.com/th/id/OIP.XvaeDRGyCeUYJXPR8WkxDQHaEJ?w=285&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                    "game_title": "Marvel's Spider-Man 2",
                    "review": "Marvel's Spider-Man 2 is a 2023 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment. It is based on the Marvel Comics character Spider-Man, and features a narrative inspired by its long-running comic book mythology which is also derived from various adaptations in other media. It is the third entry in the Marvel's Spider-Man series, acting as a sequel to Marvel's Spider-Man (2018) and a follow-up to Marvel's Spider-Man: Miles Morales (2020). The plot follows Peter Parker and Miles Morales as they come into conflict with Kraven the Hunter, who transforms New York City into a hunting ground for super-powered individuals; and with the extraterrestrial Venom symbiote, which bonds itself to Peter and negatively influences him, threatening to destroy his personal relationships.",
                    "rating": "4",
                    "publish_year": "2015",
                    "genres": "RPG",
                    "user_email": "abc@abc.abc",
                    "user_name": "abc"
                },
                {
                    "_id": "67555a42aa2d69671def4673",
                    "game_image": "https://i.ytimg.com/vi/nyHY3Eoa2iA/maxresdefault.jpg",
                    "game_title": "The House of the Dead 2",
                    "review": "The House of the Dead 2[a] is a horror-themed light gun shooter arcade game and the second game in The House of the Dead series of video games. The direct sequel to The House of the Dead, it was developed by Sega for arcades on the Sega NAOMI board in November 1998, and it received several home ports, starting with the Dreamcast in 1999, Microsoft Windows in 2001, Xbox in 2002 as a bonus in The House of the Dead III and on Wii as part of the compilation The House of the Dead 2 & 3 Return. It would also serve as the basis for several spinoff games in the franchise, most notably The Typing of the Dead.",
                    "rating": "4",
                    "publish_year": "2004",
                    "genres": "Action",
                    "user_email": "abc@abc.abc",
                    "user_name": "abc"
                }
            ]
            res.send(result)
        })
        //Post a user
        app.post('/user', async (req, res) => {
            const newuser = req.body;
            res.send(newuser);
            const result = await usersCollection.insertOne(newuser)
            res.send(result)
        })
        //Get a user
        app.get('/user', async (req, res) => {
            const coursor = usersCollection.find();
            const result = await coursor.toArray();
            res.send(result)
        })

        //post a reviews
        app.post('/reviews', async (req, res) => {
            const newReviews = req.body;
            res.send(newReviews);
            const result = await GameReviewCollection.insertOne(newReviews);
            res.send(result)
        })

        //get a reviews
        app.get('/reviews', async (req, res) => {
            const coursor = GameReviewCollection.find();
            const result = await coursor.toArray();
            res.send(result)
        })
        //get review by id
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await GameReviewCollection.findOne(query)
            res.send(result)
        })
        //delete reviews
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await GameReviewCollection.deleteOne(query);
            res.send(result)
        })
        //update reveiw
        app.put('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { Upsert: true };
            const updatereview = req.body;
            const newUpdateReview = {
                $set: {
                    game_image: updatereview.game_image,
                    game_title: updatereview.game_title,
                    review: updatereview.review,
                    rating: updatereview.rating,
                    publish_year: updatereview.publish_year,
                    genres: updatereview.genres,
                    user_email: updatereview.user_email,
                    user_name: updatereview.user_name
                }
            }
            const result = await GameReviewCollection.updateOne(filter, newUpdateReview, options);
            res.send(result)
        })
        //post watch list
        app.post('/watch_list', async (req, res) => {
            const newReviews = req.body;
            res.send(newReviews);
            const result = await WatchCollection.insertOne(newReviews);
            res.send(result)
        })
        //get a watch list
        app.get('/watch_list', async (req, res) => {
            const coursor = WatchCollection.find();
            const result = await coursor.toArray();
            res.send(result)
        })
        //get watch  list by id
        app.get('/watch_list/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await WatchCollection.findOne(query);
            res.send(result)
        })
        //delete watch list by id
        app.delete('/watch_list/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await WatchCollection.deleteOne(query);
            res.send(result)
        })
        //Get last loging by email
        app.patch('/user', async (req, res) => {
            const email = req.body.email;
            const filter = { email }
            const updateDoc = {
                $set: {
                    lastSignInTime: req.body?.lastSignInTime
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);
//===============================


app.listen(port, () => {
    console.log(`Chil-gamer-server is running on port:${port}`)
})