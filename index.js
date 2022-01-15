fetch('https://ghibliapi.herokuapp.com/people/598f7048-74ff-41e0-92ef-87dc1ad980a9')
.then(res => res.json())
.then((data)=>{
    console.log(data);
})