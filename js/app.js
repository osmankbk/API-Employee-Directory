//Store employees value from API
const employees = [];
//Store fetch url
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob & noinfo &nat=US';
//store main container
const gridContainer = document.querySelector('.grid-container');
//store modal container
const overlay = document.querySelector('.overlay');
//store modal content
const modalContent = document.querySelector('.modal-text');
//store close button
const modalCloseButton = document.querySelector('.modal-close');

//Fetch data from API
const fetchEmployeesInfo = async (url) => {
    try{
        const request = await fetch(url);
        const response = await request.json();
        return Promise.all(response.results);
    }
    catch(err) {
        console.log(err);
        gridContainer.innerHTML = `Getting employees info didn't go too well, error occured: ${err}`;
    }
} 

const displayEmployees = (employeeData) => {
    employeeData.forEach((employee, index) => {
        let { name, email, location, picture } = employee;
        const card = document.createElement('div');
        card.classList.add('card');
        gridContainer.appendChild(card);
        card.innerHTML = `
                <div class="avatar-container">
                    <img class="avatar" src=${picture.large} alt="member-${index}">
                </div>
                <div class="modal-text">
                    <h2 class"name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${location.city}</p>
                </div>`;
    });
//    return gridContainer.innerHTML = employeeHTML;
}
console.log(fetchEmployeesInfo(urlAPI));
fetchEmployeesInfo(urlAPI).then(displayEmployees);