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

document.addEventListener('DOMContentLoaded', async () =>{
  const data = await dataFetch()
  createToDoList(data)
})

const dataFetch =  async() => {
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
    let completeList = '<ul>';
    data.forEach(element => {
      if(element.complete === 'true'){
        completeList += `<li><strike>${element.todo}</strike></li>
        `
      } else if(element.complete === 'false') {
        completeList += `<li><p>${element.todo}</p></li>`
      }
    })
    completeList += '</ul>';
    document.body.innerHTML = completeList;
    
  } catch (error) {
    console.log('No data found to create the To Do List')
  }
}

