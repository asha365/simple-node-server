const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send("Smple Node Server Running");
})

app.use(cors());
app.use(express.json());

const users = [
    {id: 1, name: 'Fatima', email: 'fatima@gmail.com'},
    {id: 2, name: 'fatiha', email: 'fatiha@gmail.com'},
    {id: 3, name: 'faysal', email: 'faysal@gmail.com'}

]

// username : dbUser1
// password: xNerNn0Er0DSR0JF

const uri = ''
// const uri = "mongodb+srv://dbUser1:xNerNn0Er0DSR0JF@cluster0.qrdxnte.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const userCollection = client.db('simpleNode').collection('users');
        // const user = {name: 'fatima', email: 'fatima@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            console.log('Post API Called');
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
         })
         
    }
    finally{

    }
}
run().catch(error => console.error(error))


// app.get('/users', (req, res) =>{
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0); //filter users by query
//         res.send(filtered);
//     }
//     else{
//         res.send(users);
//     }
    
// })

// app.post('/users', (req, res) => {
//    console.log('Post API Called');
//    const user = req.body;
//    user.id = users.length + 1;
//    users.push(user);
//    console.log(user);
//    res.send(user);
// })

app.listen(port, () =>{
    console.log(`Simple Node Server Running on port ${port}`);
})