const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');
const uuid = require('uuid')

const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000; // port to run server on

const app = express();
const server = http.createServer(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));


// GET /api/todos
app.get('/api/todoList', (req,res)=>{
 res.json(data)
})



// GET /api/todos/:id
app.get('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;

  const todos = data.find(element => {
    if(element.id == id){
      return true
    }
    return false
  })
  
  if (!todos) {
    res.status(404).json({msg: 'No ID exist'})
  } else {
    res.json(todos)
  }
})


// POST /api/todos

app.post('/api/todoList', (req,res)=>{
  if(!req.body.todo) {
    res.status(422).json()
    return
  }
  const newToDo = {
    id: uuid.v4(),
    todo: req.body.todo,
    complete: 'false'
  }
  
  data.push(newToDo)
  
  res.status(201).json()
})
  
  // PUT /api/todos/:id ---> Update ID, todo and/or complete
  app.put('/api/todoList/:id', (req,res)=>{
    const { id } = req.params;
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
    const found = data.find(element => element.id === parseInt(id));
    
    if(found){
      const updTask = req.body;
      data.forEach(element => {
        if(element.id === parseInt(id)){
          // The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy
          element.id = updTask.id ? updTask.id : element.id;
          element.todo = updTask.todo ? updTask.todo : element.todo;
          element.complete = updTask.complete ? updTask.complete : element.complete;
          res.json({msg: 'Task updated'})
        }
      })
    } else {
      res.status(400).json({msg: `No task with the id of ${id}`})
    }
  })



// DELETE /api/todos/:id
app.delete('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;
  const found = data.some(element => element.id === parseInt(id));

  if(found){
    // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
    res.json({msg: 'ID deleted', data: data.filter(element => element.id !== parseInt(id))})
  } else {
    res.status(400).json()
  }

})


server.listen(port, hostname, () => {
  // once server is listening, log to the console to say so
  console.log(`Server running at http://${hostname}:${port}/`);
});
