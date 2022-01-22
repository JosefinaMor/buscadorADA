const moviePaging = document.getElementById("movie-paging");
const firstPage = document.getElementById("first-page");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");
const lastPage = document.getElementById("last-page");

const infoMovieSelected = document.getElementById("info-movie-selected");
const ratingScore = document.getElementById("rating-score");

const queryInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


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
const num = [{num:1},{num:1},{num:1}];
console.log("num" + num.length)

const showMoreInformation = (iValue, data) =>{
    if (data === []){
        notFoundMessage();
        console.log("data")
    }
    const filmNumber = createCardsInHTML(iValue, data)
    const cards = document.querySelectorAll(".card");
    cards.forEach((element)=>{
        element.onclick = () =>{
            fetch(`https://ghibliapi.herokuapp.com/films/${element.id}`)
            .then(res => res.json())
            .then((cardData)=>{
                const charactersArray = cardData.people;
                infoMovieSelected.style.display = "flex";
                createInfoMovieSelected(cardData, createRatingWithStars(cardData.rt_score));
                const closeModalButton = document.getElementById("close-modal-button");
                const showCharactersButton = document.getElementById("show-characters-button");
                const showCharacters = document.querySelector(".characters");
                closeModalButton.onclick = () =>{
                    infoMovieSelected.style.display = "none";
                }
                showCharactersButton.onclick = () =>{
                    console.log(`"holis"+ ${fetchInformation(charactersArray, "characters")}`)

                    showCharacters.innerHTML = fetchInformation(charactersArray, "characters");
                }
            })
        } 
    });
    return filmNumber;
}

const fetchInformation = (arrayRout, condition) =>{ 
    const html = arrayRout.reduce((acc, element)=>{
        fetch(element)
        .then(res => res.json())
        .then((cardData)=>{
            acc = acc + `${createInfoExtra("characters", cardData)}`;
           // console.log(createInfoExtra("characters", cardData))
           // console.log(cardData)
           // console.log(acc)
        })
        return acc;
    }, ``)
    return html;
}

const createInfoExtra = (condition, element) =>{
    var html = ``;
    if(condition === "characters"){
        html = `
            <div class="characterCard">
                <h3>Ashitaka</h3>
                <p>${element.name} is a ${element.gender} with ${element. hair_color} hair and ${element.eye_color} eyes.</p>
            </div>`;
    }
    if(condition === "species"){
        html = ``;
    }
    return html;
}

const createRatingWithStars = (rating) =>{
    var html = ``;
    if(rating > 0 && rating < 21){
        html = `<i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>`
    }
    if(rating > 21 && rating < 41){
        html = `<i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>`
    }
    if(rating > 41 && rating < 61){
        html = `<i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>`
    }
    if(rating > 61 && rating < 81){
        html = `<i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>`
    }
    if(rating > 81 && rating < 101){
        html = `<i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>`
    }
    return html;
}

const createInfoMovieSelected = (cardData, rating) =>{
    const cardHTML = `
    <div id="info-card"> 
        <section> 
            <aside>
                <img src="${cardData.movie_banner}" alt="">
            </aside>
            <article>
                <div>
                    <h2>${cardData.title}</h2>
                    <button>
                        <i class="fas fa-times" id="close-modal-button"></i>
                    </button>
                </div>      
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
                <aside class="rating-score" id="rating-score">${rating}</aside>
            </article>
        </section>
        <section class="extra-information" id="extra-information">
            <hr>
            <button id="show-characters-button"><span>Characters</span><i class="fas fa-chevron-down"></i></button>
            <section class="characters"></section>
            <hr>
            <button id="show-species-button"><span>Species</span><i class="fas fa-chevron-down"></i></button>
            <section class="species"></section>
        </section>
    </div>`
    infoMovieSelected.innerHTML = cardHTML;
}

const prevSubstraction = (iValue, data) =>{
    if (iValue > 5){
        iValue = iValue - 8;
        const pageValue = showMoreInformation(iValue, data);
        return pageValue;
    }
    return 4;
}
const nextPageOperation = (iValue, data) =>{
    if (iValue < data.length){
        const pageValue = showMoreInformation(iValue, data);
        return pageValue;  
    }
    return data.length - 3;
}

const searchByParameter = (param) =>{ //puedo buscar por parametro pero se me complica a la hora de utilizar una sola palabra que me busque opciones
    //nose si es porque la api no lo puede hacer o bueno solo busca por id  
    fetch(`https://ghibliapi.herokuapp.com/films/?title=${param}`)
    .then(res => res.json())
    .then((data)=>{
        showMoreInformation(0, data);
    })
}

const notFoundMessage = () =>{
    moviePaging.innerHTML = `<div class="not-found-message">
                                <i class="far fa-sad-cry"></i>
                                <p>Sorry, but we can't find what you're looking for.</p>
                            </div>`;
}

fetch('https://ghibliapi.herokuapp.com/films')
.then(res => res.json())
.then((data)=>{
    console.log(data)
    filmNumber = showMoreInformation(0, data);
    searchButton.onclick = () =>{
         searchByParameter(queryInput.value);
         queryInput.value = "search by film´s name";
    }
    firstPage.onclick = () =>{
        console.log("first")
        filmNumber = prevSubstraction(1, data);
    }
    prevPageButton.onclick = () =>{
        filmNumber = prevSubstraction(filmNumber, data);
    }
    nextPageButton.onclick = () =>{
        filmNumber = nextPageOperation(filmNumber, data);
    } 
    lastPage.onclick = () =>{
        filmNumber = nextPageOperation((data.length - 1), data);
        console.log("last")
    }    
})