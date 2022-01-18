const moviePaging = document.getElementById("movie-paging");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");

const infoMovieSelected = document.getElementById("info-movie-selected");

var filmNumber = 0; // this var is for making the paging where I count the displayed movies and subtract them from the movies array

const createCardsInHTML = (iValue, data) =>{//I receive the displayed movies and subtract them from the movies array
    var i = iValue;
    const cardsHTML = data.reduce((acc, element, index) =>{
        if (i === index){
            if (i < iValue+4 && i >= iValue){
                acc = acc +`<div class="card" id="${element.id}">
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
            .then((cardData)=>{
                createInfoMovieSelected(cardData);
            })
        } 
    });
    return filmNumber;
}

const createInfoMovieSelected = (cardData) =>{
    const cardHTML = `<div>
    <aside>
        <img src="${cardData.movie_banner}" alt="">
    </aside>
    <article>
        <h2>${cardData.title}</h2>
        <h3><span>${cardData.original_title}</span> (${cardData.original_title_romanised})</h3>
        <p>${cardData.description}</p>
        <div class="film-information">
            <section class="info-director-producer">
                <p>Director: ${cardData.director}</p>
                <p>Producer: ${cardData.producer}</p>
            </section>
            <section class="info-release-running-time">
                <p>Realise date: ${cardData.release_date}</p>
                <p>Running time: ${cardData.running_time}</p>
            </section>
        </div>
        <aside class="rating-score">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
        </aside>`

        infoMovieSelected.innerHTML = cardHTML;
}

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