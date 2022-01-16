const moviePaging = document.getElementById("movie-paging");

const createCardsInHTML = (iValue, data) =>{
    var i = iValue;
    const cardsHTML = data.reduce((acc, element) =>{
        if (i < i+4 && i >= iValue){
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
    createCardsInHTML(0, data); 
    
})