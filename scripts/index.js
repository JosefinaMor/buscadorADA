//paging buttons 
const moviePaging = document.getElementById("movie-paging");
const firstPage = document.getElementById("first-page");
const prevPageButton = document.getElementById("prev-page-button");
const pageSelect = document.getElementById("page-select");
const nextPageButton = document.getElementById("next-page-button");
const lastPage = document.getElementById("last-page");

const infoMovieSelected = document.getElementById("info-movie-selected");
// Nunca usas esta variable 
const ratingScore = document.getElementById("rating-score");

//search section
const queryInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


var filmNumber = 0; // this var is for making the paging where I count the displayed movies and subtract them from the movies array

const createCardsInHTML = (iValue, data) =>{//I receive the displayed movies and subtract them from the movies array
    var i = iValue;
    const cardsHTML = data.reduce((acc, element, index) =>{
        if (i === index){
            if (i < iValue+4 && i >= iValue){
                acc = acc +`<div class="card" id="${element.id}">
                                <img src="${element.image}" aria-hidden="true" class="desktop-card">
                                <img src="${element.movie_banner}" aria-hidden="true" class="mobile-card">
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

const showMoreInformation = (iValue, data) =>{// i create the cards and put de onclick function to show more informtion
    // mejor escribirlo asi: if (!data) {
    if (data === undefined){
        notFoundMessage();
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
                    showCharacters.innerHTML = fetchInformation(charactersArray, "characters");
                }
            })
            
        }
    });
    return filmNumber;
}

// no usas el param "condition", no deberia estar 
const fetchInformation = (arrayRout, condition) =>{ 
    const html = arrayRout.reduce((acc, element)=>{
        fetch(element)
        .then(res => res.json())
        .then((cardData)=>{
            acc = acc + `${createInfoExtra("characters", cardData)}`; //no me funciono lo de crear mayor informacion y nose si ir por aca es el mejor camino,
            //osea ACC se me va a ir reseteando no??. Esta es la parte de mostrar los caracteres 
        })
        return acc;
    }, ``)
    return html;
}
    // No lo vimos en clase, pero cuando tenemos muchos fetch a la vez como en este caso usamos una manera
    // mas compleja de promesas: Promise.all. Te animo a leer sobre el tema, es un poco mas avanzado de lo que veremos. 
    // Te muestro como quedaria tu codigo funcionando:
// const fetchInformation = (arrayRout, condition) => { 
//     // Hacemos un array de fetch con cada una de las rutas. 
//     const promisesArray = arrayRout.map(route => {
//         return fetch(route).then(res => res.json())
//     })
//     // Ejecutamos el metodo Promise.all que ejecuta cada uno de los fetch del array
//     Promise.all(promisesArray)
//         .then((allValues) => {
//            console.log(allValues)
//            const html = allValues.reduce((acc, curr) => {
//                return acc + `${createInfoExtra("characters", curr)}`
//            }, "")
//         //    Hacemos el HTML aca dentro de la promesa, no podemos acceder a los valores afuera
//         //    (tendrias que borrar el html de showMoreInformation)
//            const showCharacters = document.querySelector(".characters");
//            showCharacters.innerHTML = html
//         })
// }

const createInfoExtra = (condition, element) =>{// esta es la card que deberia crearse para mostrar la section de characters
    var html = ``;
    if(condition === "characters"){
        html = `
            <div class="characterCard">
                <h3>${element.name}</h3>
                <p>${element.name} is a ${element.gender} with ${element. hair_color} hair and ${element.eye_color} eyes.</p>
            </div>`;
    }
    if(condition === "species"){
        html = ``;
    }
    return html;
}

const createRatingWithStars = (rating) =>{// it translate the ranking y number of stars
    // no uses var, usa let 
    var html = ``;
    if(rating > 0 && rating < 50){
        html = `<i class="fas fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>`
    }
    if(rating > 50 && rating < 70){
        html = `<i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>`
    }
    if(rating > 70 && rating < 80){
        html = `<i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>`
    }
    if(rating > 80 && rating < 90){
        html = `<i class="fas fa-star" aria-hidden="true" ></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="far fa-star" aria-hidden="true"></i>`
    }
    if(rating > 90 && rating < 101){
        html = `<i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>
        <i class="fas fa-star" aria-hidden="true"></i>`
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
                    <button aria-label="close window">
                        <i class="fas fa-times" id="close-modal-button" aria-hidden="true"></i>
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
            <button id="show-characters-button"><span>Characters</span><i class="fas fa-chevron-down" aria-hidden="true"></i></button>
            <section class="characters"></section>
            <hr>
            <button id="show-species-button" ><span>Species</span><i class="fas fa-chevron-down" aria-hidden="true"></i></button>
            <section class="species"></section>
        </section>
    </div>`
    infoMovieSelected.innerHTML = cardHTML;
}

const pageNumbering = (data) =>{
    // no uses var, usa let  
    var html = ``;
    // let i en el for, nunca i a secas 
    for(i=0; i <= (Math.ceil(data.length/4)); i++){
        html = html + `
        <option value="${i * 4}">${i}</option>
        `
    }
    pageSelect.innerHTML = html;
}

const changePageWithSelect = (data) =>{
    const pageValue = (pageSelect.value);
    const page = showMoreInformation(pageValue, data); 
    return page;
}

const prevSubstraction = (iValue, data) =>{
    const lastPage = (data.length +1) - iValue;
    if (iValue > 4){
        if(lastPage < 4){
            iValue = iValue - (4 + lastPage);
            const pageValue = showMoreInformation(iValue, data);
            return pageValue;  
        } else {
            iValue = iValue - 8;
            const pageValue = showMoreInformation(iValue, data);
            return pageValue;    
        }
            
    }
    return 4;
}

const nextPageOperation = (iValue, data) =>{
    if (iValue < data.length){
        const pageValue = showMoreInformation(iValue, data);
        return pageValue;  
    }
    return data.length - 1;
}

const searchByParameter = (param) =>{ //puedo buscar por parametro pero se me complica a la hora de utilizar una sola palabra que me busque opciones
    //nose si es porque la api no lo puede hacer o bueno solo busca por id  
    // Noté lo mismo, creo que es un problema de la APi
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
    pageNumbering(data);
    pageSelect.onblur = () =>{
        filmNumber = changePageWithSelect(data);
    }
    searchButton.onclick = () =>{
         searchByParameter(queryInput.value);
         queryInput.value = "search by film´s name";
    }
    firstPage.onclick = () =>{
        filmNumber = showMoreInformation(0, data);
    }
    prevPageButton.onclick = () =>{
        filmNumber = prevSubstraction(filmNumber, data);
        Math.ceil(filmNumber/4);
    }
    nextPageButton.onclick = () =>{
        filmNumber = nextPageOperation(filmNumber, data);
    } 
    lastPage.onclick = () =>{
        filmNumber = nextPageOperation((data.length - 1), data);
    }    
})