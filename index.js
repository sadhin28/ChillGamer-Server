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
app.get('/ping',(req,res)=>{
    res.send('Pong')
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
          app.get("/top-rated", async (req, res) => {
      const cursor = GameReviewCollection.find().sort({ rating: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
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