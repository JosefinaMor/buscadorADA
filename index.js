const moviePaging = document.getElementById("movie-paging");

fetch('https://ghibliapi.herokuapp.com/films')
.then(res => res.json())
.then((data)=>{
    console.log(data);
    var i = 0;
    const cardsHTML = data.reduce((acc, element) =>{
        if (i < 4){
            acc = acc +`<div class="card">
                            <img src="${element.image}">
                            <h4>${element.original_title_romanised}</h4>
                            <span>${element.original_title}</span>
                        </div>` 
            i++;
        } 
        return acc;   
    },"");
    moviePaging.innerHTML = cardsHTML;
})