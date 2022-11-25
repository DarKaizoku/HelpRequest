const INPUT = document.getElementById('input');
const USERid = document.getElementById('select');
const HELP = document.getElementById('help');
const NEXT = document.getElementById('next');



let idTicket =0;
let idUser = "";


fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(ticket => previous(ticket))
        .catch(err => console.error(err));
        

function previous (data){
        const DATA = data.data;
        let nbTicket = DATA.length;
        for(let i =0; i<nbTicket;i++){
            addRowTab(DATA[i].key,DATA[i].users_id,DATA[i].subject)
        }



USERid.addEventListener('change', function (event){
    event.preventDefault();
    idUser = document.getElementById(`userID${this.value}`).textContent;
    return INPUT.value = "";
})

HELP.addEventListener('click', event =>{
    event.preventDefault();
    let input = INPUT.value;
    return addTicket(input,idUser);
})


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
        affichage += `<option id="userID${i}" value="${i}" >${dataUser[i].username}</option>`;
        console.log(dataUser[i].username);
    };
    document.getElementById('select').innerHTML = affichage;
};


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

        addRowTab(idTicket,idUser,input)
};

function addRowTab (idTicket,idUser,input){

                let affichage = document.getElementById('table');
                const newRow = document.createElement("tr");
                affichage.appendChild(newRow);
                addCase(idTicket);
                addCase(idUser);
                addCase(input);
                
                    /* affichage += `<tr class="" >
                    <td scope="row">${idTicket}</td> 
                    <td>${idUser}</td>
                    <td>${input}</td>
                    <td>"fct°supprimer ticket/row"</td>`; 

                document.getElementById('table').textContent = affichage;*/
                

};

function addCase(data) {
    let affichage = document.getElementById('table');
    const newRow = document.createElement("td");
    const content = document.createTextNode(data)
    newRow.appendChild(content);
    return affichage.appendChild(newRow);
}







            
}
/* NEXT.addEventListener('click', )

function suivant(){
localList = objet[key].sort
} */