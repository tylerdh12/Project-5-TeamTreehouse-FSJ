
//---------------------------
//  GLOBAL VARIABLES
//---------------------------

const body = $('body');
const gallery = document.getElementById('gallery');

//---------------------------
//  FETCH FUNCTIONS
//---------------------------

function fetchData(url){
    return fetch(url)
        .then( data => {
            return data.json()
        })
        .catch( error => console.log('There was an Error fetching the Data: ', error))
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then( data => generateUser(data))

//---------------------------
//  DATA PROCESS FUNCTIONS
//---------------------------

function generateUser(data) {
    console.log(data)
        // assigning data from JSON file
        for (let i = 0; i < data.results.length; i++ ){
        const res = data.results[i]
        const image = res.picture.medium
        const nameFirst = res.name.first
        const nameLast = res.name.last
        const email = res.email
        const street = res.location.street
        const city = res.location.city
        const state = res.location.state
        const postcode = res.location.postcode
        const fullAddress = `${street}. ${city}, ${state} ${postcode}`
        const phone = res.phone
        const birthday = res.dob

        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${image}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${nameFirst} ${nameLast}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
        `
        gallery.innerHTML += html;
    }
}


function generateModal(data) {
    const res = data.results[0]
    const street = res.location.street
    const city = res.location.city
    const state = res.location.state
    const postcode = res.location.postcode
    const fullAddress = `${street}. ${city}, ${state} ${postcode}`
    const phone = res.phone
    const birthday = res.dob

    console.log(phone)
    console.log(fullAddress)

   

    gallery.innerHTML = modal;
}















// This is the form input mockup for user search
    // <form action="#" method="get">
    // <input type="search" id="search-input" class="search-input" placeholder="Search...">
    // <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    // </form> 


// This is the model mockup
    // <div class="modal-container">
    //     <div class="modal">
    //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //         <div class="modal-info-container">
    //             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
    //             <h3 id="name" class="modal-name cap">name</h3>
    //             <p class="modal-text">email</p>
    //             <p class="modal-text cap">city</p>
    //             <hr>
    //             <p class="modal-text">(555) 555-5555</p>
    //             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    //             <p class="modal-text">Birthday: 10/21/2015</p>
    //         </div>
    //     </div>

    //     // IMPORTANT: Below is only for exceeds tasks 
    //     <div class="modal-btn-container">
    //         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    //         <button type="button" id="modal-next" class="modal-next btn">Next</button>
    //     </div>
    // </div>