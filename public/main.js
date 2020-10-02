// fetch('/api/todoList')
// .then((response)=>{
//   return response.json()
// })
// .then((data)=>{
//   console.log(data)
//   let completeList = '<ul>'
//   data.forEach(element => {
//     if(element.complete === 'true'){
//       completeList += `<li><strike>${element.todo}</strike></li>


//       `
//     } else if(element.complete === 'false') {
//       completeList += `<li><p>${element.todo}</p></li>`
//     }
//   })
//   completeList += '</ul>'
//   document.body.innerHTML = completeList
// })


// Async Refactor with Try and Catch
const toDoApi = '/api/todoList'

document.addEventListener('DOMContentLoaded', async () => {
  const data = await dataFetch()
  createToDoList(data)
  formButton()
  // deleteTask()
})

const dataFetch = async () => {
  try {
    let response = await fetch(toDoApi);
    let data = await response.json();
    return data

  } catch (error) {
    console.log(`Incorrect ${toDoApi}`)
  }
}

const createToDoList = (data) => {
  try {
    let ul = document.getElementById('ul');
    ul.innerHTML = ''
    data.forEach(element => {
      if (element.complete === 'true') {
        ul.innerHTML +=
        `<li>
        <strike>${element.todo}</strike>
        <button onclick ="deleteTask('${element.id}')">Delete</button>
        </li>
        `
      } else if (element.complete === 'false') {
        ul.innerHTML +=
        `<li>
        ${element.todo}
        <button onclick ="deleteTask('${element.id}')">Delete</button>
        </li>`
      }
    })
      ;

  } catch (error) {
    console.log('No data found to create the To Do List')
  }
}


const formButton = async () => {
  let form = document.getElementById('toDoForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Click')
    axios.post(toDoApi, {
      todo: e.target.elements.todo.value
    })
      .then(async res => {
        if (res.status >= 200 & res.status < 300) {
          const data = await dataFetch()
          createToDoList(data)
          form.reset()
        }
      })
  })
}


const deleteTask = async (id) => {
  console.log('click')

  axios.delete(`/api/todoList/${id}`)
    .finally(async res => {
      const data = await dataFetch()
      createToDoList(data)
    })

}

