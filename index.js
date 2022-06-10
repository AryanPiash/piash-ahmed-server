require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ya21g.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {
    await client.connect();
    const projectsCollection = client.db('piash_ahmed').collection('projects')

    app.get('/projects', async (req, res) => {
        const query = {}
        const cursor = projectsCollection.find(query)
        const projects = await cursor.toArray()
        res.send(projects)
      })

    app.get('/projects/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const project = await projectsCollection.findOne(query)
        res.send(project)
      })


    


  }
  finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('piash ahmed server is running...')
})

app.listen(port, () => {
  console.log(`Listening on port`, port)
})