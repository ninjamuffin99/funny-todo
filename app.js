const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

var mongoose = require("mongoose");
const { json } = require('body-parser');
mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {Schema} = mongoose;

const boardSchema = new Schema({
    tasks: Array,
    name: String
});

const todoSchema = new Schema({
    task: String,
    done: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

const Board = mongoose.model("Board", boardSchema);

app.get('/', (req, res) => 
{
    res.sendFile(__dirname + '/views/index.html');

});

app.get("/boards/:boardname", (req, res)=>
{
    Board.findOne({name: req.params.boardname}, (err, board)=>
    {
        res.json(board);
    });

    // res.json()
});

app.post("/api/boardredirect", (req, res)=>
{
    Board.create({tasks: [], name: req.body.board}, (err, board)=>
    {
        if (err) return console.log(err);
        
        res.redirect("/boards/" + req.body.board);
    });

    
});

app.post("/api/task", (req, res) => 
{

    // res.json({body: req.body});
    Todo.create({task: req.body.task, done: false}, function (err, todo)
    {
        if (err) return console.log(err);

        res.json(todo);
    });
});

app.get('/task', (req, res)=>{
    Todo.find({done: false}, function (err, todo)
    {
        res.json({ayay: todo});
    });
});


app.listen(port, ()=>{console.log(`App listening on http://localhost:${port}`)});