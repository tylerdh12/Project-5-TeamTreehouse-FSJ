/**
 * 
 * @author          Tyler Harper
 * @name            TeamTreehouse Unit Project 5 - API Request  
 * @description     TreeHouse Unit Project that uses a public API to generate users to display a working Employee Directory with Search funcionality.
 * @date            September 11th 2019
 * 
 */

//----------------------------------------------------------------------------------------
//  GLOBAL VARIABLES
//----------------------------------------------------------------------------------------

const body = document.getElementById('body');
const gallery = document.getElementById('gallery');
const card = document.getElementsByClassName('card');
let userData;

//----------------------------------------------------------------------------------------
//  FETCH DATA
//----------------------------------------------------------------------------------------
/**
 * @description Fetches user data from the Random Users API. Parses data into JSON Format and then runs the program white checking for errors
 */

fetch('https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture')
    .then( data => data.json())
    .then( data => generateUser(data))
    .then(generateLink)
    .catch( error => console.log('There was an Error fetching the Data: ', error))

//----------------------------------------------------------------------------------------
//  DATA PROCESS FUNCTIONS
//----------------------------------------------------------------------------------------

/**
 * 
 * USER CARD GENERATOR
 * 
 * @description Generates User Cards and adds them to Gallery Container
 * @param {data} JSON formated data 
 * @returns JSON userData variable
 * 
 */

// Generates the Users data into HTML elements then displays them on the page
function generateUser(data) {
    userData = data.results;
    const users = userData;
        // assigning data from JSON file
        users.forEach(user => {

            // HTML Generated for Card Container
            const userCard = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>` 
        
        // Add each User Card to the Gallery Container 
        gallery.innerHTML += userCard;

    });

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
$('.gallery').after('<div class="modal-container"></div>');
 // Hides the Modal Container
 $('.modal-container').hide();


function generateModal(index){

    const user = userData[index];
    const birthdayDay = user.dob.date.slice(8, 10);
    const birthdayMonth = user.dob.date.slice(5, 7);
    const birthdayYear = user.dob.date.slice(0, 4);
    const birthday = `${birthdayMonth} / ${birthdayDay} / ${birthdayYear}`;

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
                <p class="modal-text">${birthday}</p>
            </div>
        
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
        `
        
        // Appends content to the gallery container
        $('.modal-container').html(userModal);        

        // Close Modal Button 
        $('button#modal-close-btn').click(function(){
            $('.modal-container').hide();
        })

        // Generates Modal for Next User
        $('button#modal-next').click(function(){
            generateModal(index + 1);
            $('.modal-container').show()
        })

        // Generates Modal for Previous User
        $('button#modal-prev').click(function(){
            generateModal(index - 1);
            $('.modal-container').show()
        })

        checkIndex(index);
}

// This Function checks the index of the modal and hides the correct pagination buttons to prevent errors
function checkIndex(index){
    if( index <= 0 ){
        $('button#modal-prev').hide();
    } else if ( index >= 11){
        $('button#modal-next').hide();
    }
};

 // Add Event Listener to each Card Element
function generateLink(){
    for (let index = 0; index < card.length; index++) {
        card[index].addEventListener('click', function(){
            generateModal(index);
            $('.modal-container').show();
        })
    }
    
}

//----------------------------------------------------------------------------------------
//  SEARCH FUNCTIONS
//----------------------------------------------------------------------------------------
 // Self Invoked Function to add search box to Search container
(function searchInput(){

    const search = `

    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`

    $('.search-container')
        .append(search);
        
})();

const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');

// Event listener for Search Input
searchInput.addEventListener('keyup', inputSearch, false);
searchSubmit.addEventListener('click', inputSearch, false);

// Search Function that checks each Card Emelent content for whats in the input and hides the element if nothing matches
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



/**---------------------------------------------------------------------------------------
    NOTES : 
    ---------------
    would like to have the pagination go thru the VISIBLE search results

------------------------------------------------------------------------------------------
    TO-DO :
    ---------------
- [ ] Update Readme.md

----------------------------------------------------------------------------------------*/
