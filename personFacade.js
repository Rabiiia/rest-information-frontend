
const url = "https://acmverden.dk/tomcat/information/api/person/"

const renderUserTr = (json) => {
    return (
        `<tr>` +
        `<td>${json.id}</td>` +
        `<td>${json.firstName}</td>` +
        `<td>${json.lastName}</td>` +
        `<td>${json.email}</td>` +
        `<td>${json.address}</td>` +
        `<td>${json.phones}</td>` +
        `<td>${json.hobbies}</td>` +
        `</tr>`
    )
}

const renderUserDiv = (json) => {
    return (
        `${json.id}<br>` +
        `${json.firstName}<br>` +
        `${json.lastName}<br>` +
        `${json.email}<br>` +
        `${json.address.street} ${json.address.zipcode}<br>` +
        `${json.phones[0].number}<br>` +
        `${json.hobbies}<br>` 
    )
}

function getAllPersons() {
    let allPersonRow = document.getElementById("allPersonRows")

    fetch(url)
        .then(res => res.json())
        .then(persons => {
            allPersonRow.innerHTML = persons.map((person) => renderUserTr(person)).join("\n")
        })
}



















const personFacade = {
    getAllPersons,
   // getUser,
    //addUser,
    //editUser,
    //deleteUser
}

export default personFacade