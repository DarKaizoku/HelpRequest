const INPUT = document.getElementById('input');
const USERid = document.getElementById('userID');


fetch(`https://webhelprequest.deta.dev/users`) // test get simple !!
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let datA = data.data ;
        affichUser(datA);



    })
    .catch((error) => { console.log(error) })

let input = INPUT.value ;
    function addTicket(input, idUser) {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ subject: 'help', userId: 'username' })
        };
    
        fetch("url-ticket", options)
            .then(response => response.json())
            .then(ticket => console.log(ticket))
            .catch(err => console.error(err));
    };
    
/* {
    fetch(`https://webhelprequest.deta.dev/tickets`) // test get simple !!--ticket
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data.length);




        })
        .catch((error) => { console.log(error) })
};



 */


function affichUser(dataUser) {
        console.log(dataUser[1].username);
        let affichage = `<select class="form-select" id="floatingSelect" aria-label="Floating label select example">`;
            affichage +=     `<option selected>Selectionnez votre prénom :</option>`;
        for (let i = 0; i < dataUser.length; i++) {
            affichage += `<option value="" >${dataUser[i].username}</option>`;
            console.log(dataUser[i].username);
        };
        document.getElementById('select').innerHTML = affichage;

    /*     let affichage += select 
    affichage += option selected
    for (i){
        affichage += option nom
    }
    affichage += /select 
    odcument.queryselector nouveau div . innerrHTMl = affichage
    */
};