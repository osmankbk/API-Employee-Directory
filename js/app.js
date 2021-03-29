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
//Functiion that makes the fetch request & parse the respnse, & pass it on to displayEmployees func.
const fetchEmployeesInfo = (url) => {
	fetch(url).then(res => res.json()).then(res => res.results).then(displayEmployees).catch(err => console.log(err));
}
//Search for employees function, shows only those that matchs the input value.
const searchEmployeesButton = (data) => {
	const searchButton = document.querySelector('.search-button');
	const search = document.querySelector('.search');
	searchButton.addEventListener('click', (e) => {
		const inputText = search.value;
		data.forEach(cards => {
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
		let {
			name,
			email,
			location,
			picture
		} = employee;
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
//Call function after displayEmployees has be initialized.
fetchEmployeesInfo(urlAPI);
//Navigate next employee in modal view
const nextModalView = () => {
	//Store next button
	const nextButton = document.querySelector('.next');
	nextButton.addEventListener('click', () => {
		let modalIndex = modal.getAttribute('modal-index');
		if (modalIndex <= 10) {
			modalIndex++;
			displayModal(modalIndex);
		}
	});
}
//Function to hide next button
const hideNextButton = (index) => {
	const buttonNext = document.querySelector('.next');
	if (index > 10) {
		buttonNext.style.display = 'none';
	} else {
		buttonNext.style.display = 'block';
	}
}
//Navigate previous employee in modal view
const previoustModalView = () => {
	//Store previous button
	const prevButton = document.querySelector('.previous');
	prevButton.addEventListener('click', () => {
		let modalIndex = modal.getAttribute('modal-index');
		if (modalIndex >= 1) {
			modalIndex--;
			displayModal(modalIndex);
		}
	});
}
//Function to hide next button
const hidePreviousButton = (index) => {
	const buttonPrev = document.querySelector('.previous');
	if (index < 1) {
		buttonPrev.style.display = 'none';
	} else {
		buttonPrev.style.display = 'block';
	}
}
//Function for display modal view.
const displayModal = (index) => {
	let {
		name,
		dob,
		phone,
		email,
		location,
		picture
	} = employees[index];
	let date = new Date(dob.date);
	modal.setAttribute('modal-index', index);
	const modalHtml = `
                <img class="modal-avatar" src="${picture.large}" alt="member-${index}">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p id="address">${location.city}</p>
                <hr class="line"/>
                <p id="phone">${phone}</p>
                <p>${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                `;
	modalContent.innerHTML = modalHtml;
	overlay.style.display = 'block';
	hideNextButton(index);
	hidePreviousButton(index);
}
//Call next & previous button functions.
nextModalView();
previoustModalView();
//Click event that displays the modal when anywhere other than grid container is clicked.
gridContainer.addEventListener('click', (e) => {
	const buttonNext = document.querySelector('.next');
	const target = e.target;
	if (target !== gridContainer) {
		const card = target.closest('.card');
		const index = card.getAttribute('data-index');
		displayModal(index);
	}
});
//Closes the modal view
modalCloseButton.addEventListener('click', () => {
	overlay.style.display = 'none';
});