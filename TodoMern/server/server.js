const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const TodoModel = require('./Models/Todos');
const db = require('./config/db');

dotenv.config();
db.connectDB()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hey, I am working!');
});

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=> res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add', async (req, res) => {
    try {
        const task = req.body.tasks;
        const newTask = await TodoModel.create({
            task: task
        });
        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
