//function "PATCH" voir insomnia desactiver les tickets

//ajouter boutton poubelle et case a cocher






const INPUT = document.getElementById('input');
const USERid = document.getElementById('select');
const HELP = document.getElementById('help');
const NEXT = document.getElementById('next');



let idTicket = 0;
let idUser = "";
/* let bin = `<button type="button" class="btn btn-danger mx-auto"><svg xmlns="http://www.w3.org/2000/svg" width="16"
height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
<path fill-rule="evenodd"
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg></button>` */

//requete API des tickets toujours en attente à l'ouverture de la session
fetch("https://webhelprequest.deta.dev/tickets")
    .then(response => response.json())
    .then(ticket => previous(ticket))
    .catch(err => console.error(err));


//remplissage du tableau à l'ouverture de la session
function previous(data) {
    const DATA = data.data;
    let nbTicket = DATA.length;
    for (let i = 0; i < nbTicket; i++) {
        addRowTab(DATA[i].key, DATA[i].users_id, DATA[i].subject)
    }
}

//mise en place de la selection du prénom
USERid.addEventListener('change', function (event) {
    event.preventDefault();
    idUser = document.getElementById(`userID${this.value}`).textContent;
    return INPUT.value = "";
})

//mise en place du bouton "demande d'aide"
HELP.addEventListener('click', event => {
    event.preventDefault();
    let input = INPUT.value;
    return addTicket(input, idUser);
})

//mise en place du bouton "Suivant" qui supprime le premier ticket de la liste/tableau qui sera considérer donc traiter !!
NEXT.addEventListener('click', event => {
    //event.preventDefault();

    let ligne = document.getElementById('table').firstChild;
    //console.log(document.getElementById('table').firstChild.firstChild.textContent)

    ligne.parentNode.removeChild(ligne);
    ticketOff(ligne.firstChild.textContent);
})

//requete API pour connaitre les prénoms des personnes qui peuvent utiliser les tickets !
fetch(`https://webhelprequest.deta.dev/users`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let datA = data.data;
        affichUser(datA);

    })
    .catch((error) => { console.log(error) });


//fonction qui affiche les prénoms
function affichUser(dataUser) {
    console.log(dataUser[1].username);
    let affichage = `<select class="form-select" id="floatingSelect" aria-label="Floating label select example">`;
    affichage += `<option selected>Selectionnez votre prénom :</option>`;
    for (let i = 0; i < dataUser.length; i++) {
        affichage += `<option id="userID${i}" value="${i}" >${dataUser[i].username}</option>`;
        console.log(dataUser[i].username);
    };
    document.getElementById('select').innerHTML = affichage;
};

//fonction qui permet d'ajouter un ticket à l'API et au tableau
function addTicket(input, idUser) {

    idTicket++;

    const options = {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/x-www-form-urlencoded' },
        "body": new URLSearchParams({ subject: `${input}`, userId: `${idUser}` })
    };

    fetch("https://webhelprequest.deta.dev/tickets", options)
        .then(response => response.json())
        .then(ticket => console.log(ticket))
        .catch(err => console.error(err));

    addRowTab(idTicket, idUser, input)
};

//fonction qui ajoute une ligne au tableau
function addRowTab(idTicket, idUser, input, bin) {

    let affichage = document.getElementById('table');
    const newRow = document.createElement("tr");
    newRow.appendChild(addCase(idTicket));
    newRow.appendChild(addCase(idUser));
    newRow.appendChild(addCase(input));
    /* newRow.appendChild(addCase(bin)); */
    affichage.appendChild(newRow);
}

//fonction qui crée une case pour les lignes du tableau
function addCase(data) {
    let affichage = document.getElementById('table');
    const newRow = document.createElement("td");
    const content = document.createTextNode(data)
    newRow.appendChild(content);
    return affichage.appendChild(newRow);
}
/* function addBin () {
    let affichage = document.getElementById('table');
    const newRowBin = document.createElement("td");
    const binContent = document.innerHTML('bin');
    newRowBin.appendChild(binContent);
    return affichage.appendChild(newRowBin);
} */


//fonction qui desactive les tickets en attente
function ticketOff(key) {
    fetch(`https://webhelprequest.deta.dev/tickets/${key}`, {
        "method": 'PATCH',
        "body": new URLSearchParams({})
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}