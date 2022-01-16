const moviePaging = document.getElementById("movie-paging");

var filmNumber = 0; // this var is for making the paging where I count the displayed movies and subtract them from the movies array

const createCardsInHTML = (iValue, data) =>{//I receive the displayed movies and subtract them from the movies array
    var i = iValue;
    const cardsHTML = data.reduce((acc, element) =>{
        if (i < iValue+4 && i >= iValue){
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
    return i;
}

fetch('https://ghibliapi.herokuapp.com/films')
.then(res => res.json())
.then((data)=>{
    console.log(data);
    filmNumber = createCardsInHTML(0, data); 
    console.log(filmNumber);
    
})