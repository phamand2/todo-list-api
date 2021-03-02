const express = require('express');
const bodyParser = require('body-parser');
let data = require('./data');
const uuid = require('uuid')
const methodOverride = require('method-override')

let nextId = 5

const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000; // port to run server on

const app = express();
app.use(methodOverride('_method'))

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static('./public'));



app.get('/', (req,res) =>{
  res.render('home', {
    locals: {
      title: 'Home',
      toDoList: data,
    },
    partials: {
      head: 'partials/head'

    }
  })
})

// GET /api/todos
app.get('/api/todoList', (req,res)=>{
  res.render('todo.html', {
    locals: {
      title: 'To Do List',
      toDoList: data,
    },
    partials: {
      head: 'partials/head'

    }
  })
})



// Add new todo
app.post('/api/todoList', (req,res)=>{
  if(!req.body.todo) {
    res.status(422).render('todo', {
      locals: {
        toDoList: data,
        title: 'To Do List'
      },
      partials: {
        head: 'partials/head'
      }
    })
    return
  }


  const newToDo = {
    id: nextId++,
    todo: req.body.todo,
    complete: 'false'
  }
  
  data.push(newToDo)
  
  res.status(201).render('todo', {
    locals: {
      toDoList: data,
      title: 'To Do List'
    },
    partials: {
      head: 'partials/head'
    }
  })
})



// GET /api/todos/:id
app.get('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;

  const todos = data.find(element => 
    element.id === +id
  )
  
  if (!todos) {
    res.status(404).json({msg: 'No ID exist'})
  } else {
    res.json(todos)
  }
})



  
  // PUT /api/todos/:id ---> Update ID, todo and/or complete
  app.put('/api/todoList/:id', (req,res)=>{
    const { id } = req.params;

    const found = data.find(element => element.id === +id);
    
    if(found){
      const updTask = req.body;
      data.forEach(element => {
        if(element.id === +id){
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


  // app.delete('/api/todoList/:id', (req, res) =>{
  //   const { id } = req.params;

  //   const todoIndex = data.findIndex(element => {
  //     if (element.id === +id) {
  //       return true;
  //     }
  //     return false;
  //   })

  //   console.log(todoIndex)
  
  //   if (todoIndex === -1) {
  //     // send a 404 status
  //     res.status(404).send('Todo not found');
  //   } else {
  //     // otherwise, delete the object at the index found
  //     data.splice(todoIndex, 1);
  //     // send a 204 (no content) response
  //     res.status(204).redirect('/api/todoList');
  //   }
  // })



// DELETE /api/todos/:id
app.delete('/api/todoList/:id', (req,res)=>{
  const { id } = req.params;
  const found = data.find(element => element.id === +id);
  console.log(found)

  if(found){
    let updatedList = data.filter(element => element.id !== found.id);
    data = updatedList
    console.log(data)
    res.redirect('/api/todoList')
  } else {
    res.status(400).json()
  }

})


app.listen(port, hostname, () => {
  // once server is listening, log to the console to say so
  console.log(`Server running at http://${hostname}:${port}/`);
});
