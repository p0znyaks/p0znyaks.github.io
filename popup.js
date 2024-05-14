const reservedSeats = new Map();

function reserveSeat(elem) {
    const seatNumber = elem.innerHTML;
    const row = elem.parentElement.firstElementChild.innerText;
    let seats = reservedSeats.get(row) || [];
    if (elem.style.backgroundColor === 'crimson') {
        elem.style.backgroundColor = 'silver';
        seats[seatNumber - 1] = 0;
    } else {
        elem.style.backgroundColor = 'crimson';
        seats[seatNumber - 1] = 1;
    }
    reservedSeats.set(row, seats);
    console.log(reservedSeats);
}

// function buyTickets() {
//     if (!validateForm()) {
//         document.getElementById('error').style.display = 'inline';
//         return;
//     }
//     localStorage.setItem(buyerPhone, reservedSeats.toString());
//     reservedSeats.map(() => 0);
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         const value = JSON.parse(localStorage.getItem(key));
//         const hasAnyBookedSeat = reservedSeats.some(elem => {
//             return value.some(e => {
//                 return elem === e;
//             })
//         })
//         if (hasAnyBookedSeat === true) {
//             alert("ОШИБКА!!!!")
//         }
//     }
// }

function buyTickets() {
    if (!validateForm()) {
        document.getElementById('error').style.display = 'inline';
        return;
    }
    const buyerPhone = document.getElementById('buyerPhone').value; // убедитесь, что это поле существует в вашем HTML
    localStorage.setItem(buyerPhone, JSON.stringify(Array.from(reservedSeats.entries())));  // Преобразование Map в массив и сохранение как строка JSON

    reservedSeats.clear(); // Очистка карты после сохранения
    console.log('Tickets purchased: ', localStorage.getItem(buyerPhone)); // Опционально: логирование для проверки
}

function displayReservedSeats(phoneNumber) {
    if (!phoneNumber) {
        console.error('No phone number provided');
        return;
    }
    const reservedSeatsData = JSON.parse(localStorage.getItem(phoneNumber));
    if (!reservedSeatsData) {
        console.log('No reservations found for this number');
        return;
    }

    console.log(`Reserved seats for ${phoneNumber}:`);
    reservedSeatsData.forEach(([row, seats]) => {
        const reservedNumbers = seats.map((seat, index) => seat === 1 ? index + 1 : null).filter(n => n);
        console.log(`Row ${row}: Seats ${reservedNumbers.join(', ')}`);
    });
    displayReservedSeats('1234567890'); // Замените значение на реальный номер телефона пользователя
}


function openForm(event) {
    event.stopPropagation();
    const form = document.getElementById('form');
    form.style.display = 'block';
}

function closeForm(event) {
    const form = document.getElementById('form');
    if (form.style.display === 'block' && !isFormElement(event.target)) {
        form.style.display = 'none';
    }
}

function isFormElement(obj) {
    if (obj.id === 'form') {
        return true;
    }
    while (obj.id !== 'form' && obj.parentElement != null) {
        obj = obj.parentElement;
        if (obj.id === 'form') {
            return true;
        }
    }
    return false;
}

function validateForm() {
    const phoneInput = document.getElementById('phoneInput');
    const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (!phonePattern.test(phoneInput.value)) {
        document.getElementById('error').textContent = 'Пожалуйста, введите корректный номер телефона в формате +375XXXXXXXXX';
        return false;
    }

    return true;
}