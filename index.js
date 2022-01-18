const moviePaging = document.getElementById("movie-paging");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");

var filmNumber = 0; // this var is for making the paging where I count the displayed movies and subtract them from the movies array

const createCardsInHTML = (iValue, data) =>{//I receive the displayed movies and subtract them from the movies array
    var i = iValue;
    const cardsHTML = data.reduce((acc, element, index) =>{
        if (i === index){
            if (i < iValue+4 && i >= iValue){
                acc = acc +`<div class="card" id="card${element.id}">
                                <img src="${element.image}">
                                <h4>${element.title}</h4>
                                <span>${element.original_title}</span>
                            </div>` 
                i++;
            } 
        }
        return acc;   
    },"");  
    moviePaging.innerHTML = cardsHTML;
    return i;
}

const showMoreInformation = (iValue, data) =>{
    const filmNumber = createCardsInHTML(iValue, data)
    const cards = document.querySelectorAll(".card");
    cards.forEach((element)=>{
        element.onclick = () =>{
            fetch(`https://ghibliapi.herokuapp.com/films/${element.id}`)
            .then(res => res.json())
            .then((data)=>{
                
            })
        } 
    });
    return filmNumber;
}

const createMoreInformationCard

const prevSubstraction = (iValue, data) =>{
    if (iValue > 4){
        iValue = iValue - 8;
        const pageValue = showMoreInformation(iValue, data);
        return pageValue;
    }
    return 4;
}

fetch('https://ghibliapi.herokuapp.com/films')
.then(res => res.json())
.then((data)=>{
    console.log(data)
    filmNumber = showMoreInformation(0, data);
    prevPageButton.onclick = () =>{
        filmNumber = prevSubstraction(filmNumber, data);
    }
    nextPageButton.onclick = () =>{
        filmNumber = showMoreInformation(filmNumber, data);
    } 
    
})