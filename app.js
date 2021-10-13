const express = require('express');
const app = express();
const port = 3000;

var mongoose = require("mongoose");
const { json } = require('body-parser');
mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true });


const {Schema} = mongoose;

const todoSchema = new Schema({
    task: String,
    done: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

app.get('/', (req, res) => 
{
    res.send("hello world!");

});

app.get('/task', (req, res)=>{
    Todo.create({task: "TEST SHIT", done: true}, function (err, todo)
    {
        if (err) return console.log(err);


        Todo.find({done: true}, function (err, todo)
        {
            res.json({ayay: todo});
        });

        
    });
});


app.listen(port, ()=>{console.log(`App listening on http://localhost:${port}`)});