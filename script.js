//const user = document.getElementById('zone-test');



    fetch(`https://webhelprequest.deta.dev/users`) // test get simple !!
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data.length);
            let nbEleve = data.data.length;
            let listE = [];
            console.log(data.data[1].username);
            let affichage = '<option>'
            for (let i = 0; i<nbEleve; i++) {
                listE.push(data.data[i].username)
            affichage += `${data.data[2].username}`
            }
        })
        .catch((error) => { console.log(error) })


/* {
    fetch(`https://webhelprequest.deta.dev/tickets`) // test get simple !!--ticket
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data.length);




        })
        .catch((error) => { console.log(error) })
};

function addTicket(sujet, idUser) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ subject: 'help', userId: 'username' })
    };

    fetch("url-ticket", options)
        .then(response => response.json())
        .then(ticket => console.log(ticket))
        .catch(err => console.error(err));
}; */
/* function AffName(nom){
    const user = document.getElementById('select');
    user.innerHTML = `<option value="">${nom}</option>`;
} */