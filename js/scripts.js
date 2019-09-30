
//---------------------------
//  GLOBAL VARIABLES
//---------------------------

const body = document.getElementById('body');
const gallery = document.getElementById('gallery');
let userData;
//---------------------------
//  FETCH FUNCTIONS
//---------------------------

fetch('https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture')
    .then( data => data.json())
    .then( data => generateUser(data))
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

        gallery.innerHTML += userCard;
    }
    return userData;
}

// Generates the Modal and displays it in the body after the gallery
function generateModal(index){
    const user = userData[index]

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
                <p class="modal-text">${user.location.street}. ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">${user.birthday}</p>
            </div>
        </div>`

        $('.gallery').after('<div class="modal-container"></div>')
        $('.modal-container').append(userModal);        

        $('.modal-container').hide();

        $('button#modal-close-btn').click(function(){
            $('.modal-container').hide();
        })
}