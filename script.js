const INPUT = document.getElementById('input');
const USERid = document.getElementById('select');
const HELP = document.getElementById('help');
const NEXT = document.getElementById('next');

let input = INPUT.value;
let idUser = USERid.value;
let idTicket =0;



fetch(`https://webhelprequest.deta.dev/users`) // test get simple !!
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let datA = data.data;
        affichUser(datA);

    })
    .catch((error) => { console.log(error) });

    
function affichUser(dataUser) {
    console.log(dataUser[1].username);
    let affichage = `<select class="form-select" id="floatingSelect" aria-label="Floating label select example">`;
    affichage += `<option selected>Selectionnez votre prénom :</option>`;
    for (let i = 0; i < dataUser.length; i++) {
        affichage += `<option id="userID" value="" >${dataUser[i].username}</option>`;
        console.log(dataUser[i].username);
    };
    document.getElementById('select').innerHTML = affichage;
};


function addTicket(input, idUser) {

    idTicket++;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ subject: `${input}`, userId: `${idUser}` })
    };

    fetch("url-ticket", options)
        .then(response => response.json())
        .then(ticket => console.log(ticket))
        .catch(err => console.error(err));

        addRowTab(cptTicket,idUser,input)
};

function addRowTab (idTicket,idUser,input){

                let affichage = `<tr class="" >
                    <td scope="row">${idTicket}</td>
                    <td>${idUser}</td>
                    <td>${input}</td>
                    <td>"fct°supprimer ticket/row"</td>`;

};




/* NEXT.addEventListener('click', )

function suivant(){

} */