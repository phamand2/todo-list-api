fetch('/api/todoList')
.then((response)=>{
  return response.json()
})
.then((data)=>{
  console.log(data)
  let completeList = '<ul>'
  data.forEach(element => {
    if(element.complete === 'true'){
      completeList += `<li><strike>${element.todo}</strike></li>
      
      
      `
    } else if(element.complete === 'false') {
      completeList += `<li><p>${element.todo}</p></li>`
    }
  })
  completeList += '</ul>'
  document.body.innerHTML = completeList
})

