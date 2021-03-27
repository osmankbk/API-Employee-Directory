//Store employees value from API
let employees = [];
//Store fetch url
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob & noinfo &nat=US';
//store main container
const gridContainer = document.querySelector('.grid-container');
//store modal container
const overlay = document.querySelector('.overlay');
//Store modal
const modal = document.querySelector('.modal');
//store modal content
const modalContent = document.querySelector('.modal-text');
//store close button
 const modalCloseButton = document.querySelector('.modal-close');
//Hide overlay div on load
 overlay.style.display = 'none';


//Fetch data from API
// const fetchEmployeesInfo = async (url) => {
//     try{
//         const request = await fetch(url);
//         const response = await request.json();
//         return Promise.all(response.results);
//     }
//     catch(err) {
//         console.log(err);
//         gridContainer.innerHTML = `Getting employees info didn't go too well, error occured: ${err}`;
//     }
// } 

const fetchEmployeesInfo = (url) => {
    fetch(url)
    .then(res => res.json())
    .then( res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));
}

//Search for employees
const searchEmployeesButton = (data) => {
    const searchButton = document.querySelector('.search-button');
    const search = document.querySelector('.search');
    searchButton.addEventListener('click', (e) => {
        const inputText = search.value;
        data.forEach(cards => {
            cards.style.display = 'none';
            cards.textContent.includes(inputText.toLowerCase()) ? cards.style.display = 'flex' : cards.style.display = 'none';
        });
    });
}

//Filter employee on input
const searchEmployeesInput = (data) => {
 //Store search input
const search = document.querySelector('.search');
const body = document.querySelector('body');
    body.addEventListener('keyup', (e) => {
        const userInput = search.value;
        data.forEach(cards => {
            cards.style.display = 'none';
            cards.textContent.includes(userInput.toLowerCase()) ? cards.style.display = 'flex' : cards.style.display = 'none';
        });
    });
}

//Displays all employees.
const displayEmployees = (employeeData) => {
        employees = employeeData
        employees.forEach((employee, index) => {
        let { name, email, location, picture } = employee;

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.innerHTML = `
                <div class="avatar-container">
                    <img class="avatar" src=${picture.large} alt="member-${index}">
                </div>
                <div class="modal-text">
                    <h2 class"name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${location.city}</p>
                </div>`;
        gridContainer.appendChild(card);   
    });
    const allCards = document.querySelectorAll('.card');
    searchEmployeesButton(allCards);
    searchEmployeesInput(allCards);
}

//Navigate next employee in modal view
const nextModalView = (currentModal) => {
//Store next button
const nextButton = document.querySelector('.next');
    nextButton.addEventListener('click', () => {
        if(currentModal <= 10) {
            overlay.style.display = 'none';
            currentModal++;
            displayModal(currentModal);
        } 
    });
}

//Navigate previous employee in modal view
const previoustModalView = (currentModal) => {
    //Store next button
    const prevButton = document.querySelector('.previous');
        prevButton.addEventListener('click', () => {
            if(currentModal >= 1) {
                overlay.style.display = 'none';
                currentModal--;
                displayModal(currentModal);
            } 
        });
    }

//Call function after displayEmployees has be initialized.
fetchEmployeesInfo(urlAPI);

//Function for display modal view.
const displayModal = (index) => {
    let { name, dob, phone, email, location , picture } = employees[index];
    let date = new Date(dob.date);
        const modalHtml = `
                <img class="modal-avatar" src="${picture.large}" alt="member-${index}">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p id="address">${location.city}</p>
                <hr class="line"/>
                <p id="phone">(302)${phone}</p>
                <p>${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                `;
    modalContent.innerHTML = modalHtml;
    overlay.style.display = 'block';
    console.log(index);
    nextModalView(index);
    previoustModalView(index);
}

// nextButton.addEventListener('click', (e) => {
//     console.log(index);
// });

//Click event that displays the modal when anywhere other than grid container is clicked.
gridContainer.addEventListener('click', (e) => {
    const target = e.target;
    if(target !== gridContainer) {
        const card = target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index); 
    }
});

//Closes the modal view
modalCloseButton.addEventListener('click', () => {
  overlay.style.display = 'none';
})

