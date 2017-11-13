// Declarar un array que representtará los asientos de nuestro avión con false indicando que estos están vacíos.
// asiento vacio = false      asiento ocupado = true

var airlineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];

// Contador que nos ayudará a rastrear el número de asientos ocupados.

var busySeats = 0; //Comienza con un valor de 0 porque todos los asientos están libres desde el principio.

var paintSeats = function (array) { //función que va a pintar asientos cuando el navegador lo lea.
    var containerSeats = document.getElementById('seats');

    for (var i = 0; i < array.length; i++) {
        var seat = document.createElement('div'); // c/u de los divs va a ser un asiento en html.
        seat.className = "seats";

        // del 1er elemento al 4to, en el array va a ser 1ra clase, que sería del índice 0 al 3. Color morado.
        if (i < 4) {
            seat.style.background = 'purple';
        } else {
            seat.style.background = 'yellow';
        }
        containerSeats.appendChild(seat); //adding child to the container that would be every seat.
    }
};

// It's created the function for the button, to reserve seats.
var reserve = function() {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', chooseZone); //to choose economic or first-class zone.
};

var chooseZone = function () {
    var choice = prompt('¿En qué zona prefieres reservar? \n 1. Primera Clase. \n 2. Económica. \n \n Por favor, ingresa el número de tu preferencia.');
    if (choice == 1) {
        checkFirstClassZone();
    } else if (choice == 2) {
        checkEconomicZone();
    } else {
        alert('Por favor, ingresa un número válido.');
    }
};

var checkFirstClassZone = function() {
    var zone = 'Primera Clase';
    //recorre del elemento 0 al 3 y verifica cuáles están disponibles.
    for (var index = 0; index < 4; index++) {
        if (airlineSeats[index] == false) {
            airlineSeats[index] = true;
            reservedSeat(index);
            paintTicket(index, zone);
            busySeats++;
            //al reservar un asiento no se necesita seguir recorriendo nuestro arreglo.
            //rompemos el for con break.
            break;
            //si no hay en 1ra clase, se le da la posibilidad de escoger en clase económica.
        } else if (index == 3 && airlineSeats[index] == true) {
            reasignEconomicZone(zone);
        }
    }
};

var checkEconomicZone = function() {
        var zone = 'Economica';

        for (var index = 4; index < 10; index++) {
            if (airlineSeats[index] == false) { //means free seat.
                airlineSeats[index] = true; //means reserve seat.
                reservedSeat(index);
                paintTicket(index, zone);
                busySeats++;
                break;
                //if there's not in economic class, user can choose in 1st class.
            } else if (index == 9 && airlineSeats[index] == true) {
                reasignFirstClassZone(zone);
            }
          }  
        };

        //To know what seat has been reserverd.
        var reservedSeat = function (indexToPaint) {
            var seat = document.getElementsByClassName('seats');
            seat[indexToPaint].textContent = 'Ocupado';
        };

        var reasignEconomicZone = function (zone) {
            if (busySeats == 10) {
                noSeats();
                nextFlight();
            } else {
                var reasign = confirm(
                    'Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en zona Económica? '
                );
                if (reasign == true) { // Means that the user accepted the deal.
                    checkEconomicZone(); // calling the function.
                } else { //user didn't accept.
                    nextFlight();
                }
            }
        };

        var reasignFirstClassZone = function (zone) {
            if (busySeats == 10) {
                noSeats();
                nextFlight();
            } else {
                var reasign = confirm(
                    'Ya no quedan asientos disponibles en ' + zone + ' :( \n ¿Quieres reservar en zona de Primera Clase? '
                );
                if (reasign == true) { // Means that the user accepted the deal.
                    checkFirstClassZone(); // calling the function.
                } else { //user didn't accept. 
                    nextFlight();
                }
            }
        };

        var paintTickect = function(index, zone) {
            var containerTickets = document.getElementById('tickets');
            var ticket = document.createElement('div');
            ticket.className = 'seats';
            var title = document.createElement('p');
            var reservedSeating = document.createElement('p');
            var zoneClass = document.createElement('p');
            title.textContent = 'PASE DE ABORDAR';
            reservedSeating.textContent = 'Nro. de Asiento: ' + (index + 1);
            zoneClass.textContent = zone;
            ticket.appendChild(title);
            ticket.appendChild(reservedSeating);
            ticket.appendChild(zoneClass);
            containerTickets.appendChild(ticket);
        };

        var nextFlight = function() {
            alert('Nuestro Próximo vuelo sale en 3 horas.')
        };

        var noSeats = function() {
            alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avión.')
        };

        paintSeats(airlineSeats); //Calling function//
        reserve(); //Calling function//