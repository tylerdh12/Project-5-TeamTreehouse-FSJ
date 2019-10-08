
//---------------------------
//  GLOBAL VARIABLES
//---------------------------

const body = document.getElementById('body');
const gallery = document.getElementById('gallery');
const card = document.getElementsByClassName('card');
let userData;

/**
 * FETCH
 */

fetch('https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture')
    .then( data => data.json())
    .then( data => generateUser(data))
    .then(generateLink)
    .catch( error => console.log('There was an Error fetching the Data: ', error))

//---------------------------
//  DATA PROCESS FUNCTIONS
//---------------------------

// Generates the Users data into HTML elements then displays them on the page
function generateUser(data) {
    userData = data.results;
        // assigning data from JSON file
        for (let i = 0; i < userData.length; i++ ){
            const user = userData[i]

        const userCard = `
        <div class="card" id="card-${i}">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>` 

        gallery.innerHTML += userCard;
    }
    return userData;
}

/**
 * 
 * MODAL GENERATOR
 * 
 * @desc Generates and Displays Modal Container
 * @param {index} index of User
 *  
 */

function generateModal(index){

    const user = userData[index]

    // Generates the HTML for the Modal Container using Template Literal
    const userModal =`
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}. ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">${user.dob.date}</p>
            </div>
        </div>
        
        <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
        `
        
        // Appends content to the gallery container
        $('.gallery').after('<div class="modal-container"></div>')
        $('.modal-container').html(userModal);        

        // Hides the Modal Container
        $('.modal-container').hide();

        // Close Modal Button 
        $('button#modal-close-btn').click(function(){
            $('.modal-container').hide();
        })
}

function generateLink(){
    for (let index = 0; index < card.length; index++) {
        card[index].addEventListener('click', function(){
            generateModal(index);
            $('.modal-container').show();
        })
    }
    
}

/**
 * SEARCH FUNCTIONS
 */
 
(function searchInput(){

    const search = `
    <form>
        <label>
            Search: 
        </label>
        <input type="text" id="search-input"></input>
    </form>
    `

    $('.search-container')
        .append(search);
        
})();

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', inputSearch, false);

function inputSearch(){
    for(let i = 0; i < card.length; i++)
    if(card[i].innerText
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())){
        card[i].style.display = "flex";

    } else {
        card[i].style.display = "none";
    }
}