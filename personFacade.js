const url = "https://acmverden.dk/tomcat/information/api/person/"

const personsTableBody = document.getElementById("allPersonRows");
console.log("here line 4 in PersonFacade js")

const renderPhones = (phones) => {

    const descriptions = phones.map (phone => `${phone.description}<br>`)
    const numbers = phones.map (phone => `${phone.number}<br>`)
    return `<td>${descriptions}</td>` +
     `<td>${numbers}</td>`
}

const renderHobbies = (hobbies) => {

    const names = hobbies.map (hobby => `${hobby.name}<br>`)
    const  categories = hobbies.map (hobby => `${hobby.category}<br>`)
    const  types = hobbies.map (hobby => `${hobby.type}<br>`)
    const  wikiLinks = hobbies.map (hobby => `${hobby.wikiLink}<br>`)

    return `
    <td>${names}</td>` +
    `<td>${categories}</td>` +
   ` <td>${types}</td> ` +
    `<td> ${wikiLinks}</td>` 
}

// const renderPerson = (json) => {
//     if (json.address === undefined) {
//         json.address = {
//             street: "",
//             zipcode: ""
//         }
//     }

//     if (json.phones.length === 0) {
//         json.phones = [
//         {
//             description: "",
//             number: ""
//         }
//     ]
//     }

//     if (json.hobbies.length === 0) {
//         json.hobbies = [
//         {
//             name: "",
//             category: "",
//             type: "",
//             wikiLink: ""
//         }
//     ]
//     }
//     return `<tr>
//         <td>${json.id}</td>
//         <td>${json.firstName}</td>
//         <td>${json.lastName}</td>
//         <td>${json.email}</td>
//         ${(renderPhones(json.phones))}
        
//         <td>${json.address.street}</td>
//         <td>${json.address.zipcode}</td>

//        ${(renderHobbies(json.hobbies))}

       
       
        
//     </tr>`
    
// }

//<td> <input id="editPersonBtn" type="button" value="Edit"/></td>


function getAllPersons() {
    //let allPersonRow = document.getElementById("allPersonRows")

    fetch(url)
        .then(res => res.json())
        .then(persons => {
            console.log("here i fetch all persons and secondly my innerHTML appendChild() knows who the father is. so it map persons(data)")
            //allPersonRow.innerHTML = persons.map((person) => renderPerson(person)).join("\n")
            persons.map(createPersonsTableRow);
          
        })
}


function createPersonsTableRow(person) {
    console.log("here in createPersonsTableRow function -> tr in tbody.(tr id = 1) and it gets one person.(id). cause it stored ind personTableRow.id. so data is put in personTableRow(tr id = 1) and from there it is mapping to next personstableRowid.=2 with another person id")
    const personTableRow = document.createElement("tr");
    personTableRow.id = person.id;
    console.log(personTableRow);
    personsTableBody.appendChild(personTableRow);
    

    makePersonTableRow(personTableRow, person);
}

function makePersonTableRow(personTableRow, person) {
    console.log("Making my table og paremeterne personTableRow bruges til innerhtml med den tr id den har og person id til den tr id")
    personTableRow.innerHTML = `
            
            <td>
                ${person.id}    
            </td>

            <td>
                ${(person.firstName)}
            </td>

            <td>
                ${(person.lastName)}
            </td>

            <td>
                ${(person.email)}
            </td>

            
                ${(renderPhones(person.phones))}
            
            
             <td>
                ${(person.street)}
            </td>
            
             <td>
                ${(person.zipcode)}
            </td>

             
                ${(renderHobbies(person.hobbies))}
            

            <td>
                <button id="update-button-${person.id}">update button</button>            
            </td>  

             <td>
                <button onclick="deletePerson(${person.id})">❌</type=button>            
            </td>        
            
        `;

        //  <p >${(renderHobbies(person.hobbies))}</p>  der stod json.hobbies før og det forstod den ikke


    // document.getElementById(`update-button-${person.id}`)
    //     .addEventListener("click", () => {
    //         updatePerson(person)});


}




function updatePerson(person) {
    const tableRowToUpdate = document.getElementById(person.id);

    tableRowToUpdate.innerHTML = `
    <td>
            <input id="update-person-id-${person.id}" type=hidden value="${(person.id)}">
        </td>
        <td>
            <input id="update-person-firstName-${person.id}" value="${(person.firstName)}">
        </td>
        <td>
            <input id="update-person-lastName-${person.id}" value="${(person.lastName)}">
        </td>
       <td>
            <input id="update-person-mail-${person.id}" value="${(person.email)}">
       </td>
       <td>
            <input id="update-person-description-${person.id}"  value="${(person.description)}">
       </td>
        <td>
            <input id="update-person-number-${person.id}" value="${(person.number)}">
       </td>
        <td>
            <input id="update-person-name-${person.id}" value="${(person.name)}">
       </td>
        <td>
            <input id="update-person-category-${person.id}"  value="${(person.category)}">
       </td>
        <td>
            <input id="update-person-type-${person.id}"  value="${(person.type)}">
       </td>
        <td>
            <input id="update-person-wikiLink-${person.id}"  value="${(person.wikiLink)}">
       </td>
       <td>
           
            <button onclick="updatePersonInBackend(${person.id})">✅</button>
       </td>
     
    `;

}

function updatePersonInBackend(personId) {

    const tableRowToUpdate = document.getElementById(personId);

    const personToUpdate = {
        id: personId,
        firstName: document.getElementById(`update-person-firstName-${personId}`).value,
        lastName: document.getElementById(`update-person-lastName-${personId}`).value,
        email: document.getElementById(`update-person-email-${personId}`).value,
        description: document.getElementById(`update-person-description-${personId}`).value,
        number: document.getElementById(`update-person-number-${personId}`).value,
        name: document.getElementById(`update-person-name-${personId}`).value,
        category: document.getElementById(`update-person-category-${personId}`).value,
        type: document.getElementById(`update-person-type-${personId}`).value,
        wikiLink: document.getElementById(`update-person-wikiLink-${personId}`).value
    };

    fetch(url + personId, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(personToUpdate)
    }).then(response => {
        if (response.status === 200) {
            makePersonTableRow(tableRowToUpdate, personToUpdate);
        }
    });
}







const personFacade = {
    getAllPersons,
   // getUser,
    //updatePersonInBackend,
    //editUser,
    //deleteUser
}

export default personFacade