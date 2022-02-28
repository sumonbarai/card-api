// button click
const searchBtn = document.getElementById("search-btn");
const showCard = document.getElementById("show-card");
searchBtn.addEventListener("click", ()=>{
    const searchInput = document.getElementById("search-input");
    const errorMessage = document.getElementById("error-message");
    const searchInputNumber = parseInt(searchInput.value);
    if(isNaN(searchInputNumber)) {
        errorMessage.innerText = "please give me a right number";
        errorStyle(errorMessage,searchInput,showCard);
        return;
    }else if(searchInputNumber < 0){
        errorMessage.innerText = "Do not use negative number";
        errorStyle(errorMessage,searchInput,showCard);
    }else if(searchInputNumber > 52){
        errorMessage.innerText = "card item don't ove 52 items";
        errorStyle(errorMessage,searchInput,showCard);
    }else{
        showCard.innerHTML="";
        searchInput.value =null;
        errorMessage.innerText=null;
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${searchInputNumber}`)
        .then(res=>res.json())
        .then(data=>displayCards(data.cards))
    } 
}); 
// css style 
const errorStyle =(errorMessage,searchInput,showCard)=>{
    errorMessage.style.color= "red";
    errorMessage.style.textAlign= "center";
    errorMessage.style.fontSize= "20px";
    searchInput.value =null;
    showCard.innerHTML="";
}
// display cards items
const displayCards=cardItems=>{
    cardItems.forEach(content => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML=`
            <div class="card">
                <img src="${content.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${content.suit}</h5>
                    <p class="card-text">${content.value}</p>
                    <button onclick="details('${content.code}')" type="button" class="btn btn-success">see details</button>
                </div>
            </div>
        `;
        showCard.appendChild(div);
    });
}
// see details more
const details = (code)=>{
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res=>res.json())
        .then(data=>{
            const allCards = data.cards;
            const singleCard = allCards.find(function(val){
                return val.code == code;
            })
            const div = document.createElement("div");
            showCard.innerHTML="";
            div.classList.add("col");
            showCard.classList.remove("row-cols-md-3");
            showCard.classList.add("row-cols-md-2");
            div.innerHTML=`
                <div class="card">
                    <img src="${singleCard.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${singleCard.suit}</h5>
                        <p class="card-text">${singleCard.value}</p>
                        <p class="card-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo maiores necessitatibus obcaecati quam dolor eum libero, modi beatae ducimus eos nihil facere provident, illo iste fugit. Iste voluptatibus minima animi?
                        </p>
                    </div>
                </div>
            `;
            showCard.appendChild(div);
        });

}