const express = require("express");


const app = express();

app.use(express.json());



let todos = [{
    id : "1",
    task : "Wash clothes ",
    completed :  false
}];


function getnextid(){
    if(todos.length === 0 ){
        return "1";
    }
    const maxid = Math.max(...todos.map(e => parseInt(e.id)))
    return (maxid+1).toString(); 
}


app.get('/todos', (req, res) => {
    console.log(__dirname);
    console.log(__filename);
    res.json({
        todos,
        message : "Connection established "
    })
})

// logic to retrieve a particular elelment from a given id 
app.get('/todos/:id', (req, res)=>{
    const todo =todos.find(t =>t.id === (req.params.id))
    if(!todo){
        res.status(404).json({message : "Id not found "});
    }
    else{
        res.json({
            todo,
            msg : "Done"
        })
    }
})


// logic to add more task to the list 
app.post('/todos', (req, res)=>{

    const reqtask = req.body.task;
    const reqcompeted = req.body.completed

    let mynewid = getnextid();
    const newtodo = {
        id : mynewid,
        task : reqtask,
        completed : reqcompeted
    }

    todos.push(newtodo);
    res.status(201).json({message :"Task aded to the list "})
})

// 4. PUT /todos/:id - Update an existing todo item by ID
//     Description: Updates an existing todo item identified by its ID.
//     Request Body: JSON object representing the updated todo item.
//     Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
//     Example: PUT http://localhost:3000/todos/123
//     Request Body: { "title": "Buy groceries", "completed": true }

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ message: "Task not found by the ID" });
    }

    // Update the task and completed status with the values from req.body
  
    todo.completed = req.body.completed;

    res.status(200).json({ message: "Task updated successfully" });
});

app.delete('/todos/:id', (req,res)=>{
    const todoindex = todos.findIndex(t => t.id === (req.params.id));
    if (todoindex === -1){
        res.status(404).json({msg : "Not found "});

    }
    else {
        todos.splice(todoindex, 1);
        res.status(200).json({msg : ' Done '})
    }
})



app.listen(3001, ()=>{
    console.log(`Server ${3001} running on https://localhost:3001`);
})