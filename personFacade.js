

const url = "https://acmverden.dk/tomcat/information/api/person/"



const personsTableBody = document.getElementById("allPersonRows");
console.log("here line 4 in PersonFacade js")


const renderPhones = (phones) => {
    if (phones.length === 0) {
        phones.phones = [
                {
                    description: "",
                    number: ""
                }
            ]
            }
    const descriptions = phones.map (phone => `${phone.description}<br>`)
    const numbers = phones.map (phone => `${phone.number}<br>`)
    //console.log(descriptions);
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

// const renderAddress = (address) => {
//     if (address === undefined) {
//                 address = {
//                     street: "",
//                     zipcode: ""
//                 }
//             }

//     const street = address.map (address => `${address.street}<br>`)
//     const  zipcode = address.map (address => `${address.zipcode}<br>`)

//     return `
//     <td>${street}</td>` +
//     `<td>${zipcode}</td>` 
    
// }

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


// let editModalElement = document.getElementById("edit-modal")
// let editModal = new bootstrap.Modal(editModalElement)
// document.getElementById("editPersonBtn").addEventListener('click', e => editModal.toggle())

/* ---------------------------------------------- UPDATE START ----------------------------------------------- */
function getAllPersons() {
    //let allPersonRow = document.getElementById("allPersonRows")

    fetch(url)
        .then(res => res.json())
        .then(persons => {
            console.log("here i fetch all persons and secondly my innerHTML appendChild() knows who the father is. so it map persons(data)")
            //allPersonRow.innerHTML = persons.map((person) => renderPerson(person)).join("\n")
            console.log(persons)
            persons.map(createPersonsTableRow);
          
        })
}


function createPersonsTableRow(person) {
    console.log("here in createPersonsTableRow function -> tr in tbody.(tr id = 1) and it gets one person.(id). cause it stored ind personTableRow.id. so data is put in personTableRow(tr id = 1) and from there it is mapping to next personstableRowid.=2 with another person id")
    const personTableRow = document.createElement("tr");
    personTableRow.id = person.id;
    console.log(personTableRow);
    personsTableBody.appendChild(personTableRow);
    
    makePersonTableRowAfterFetchingDataIsSucceeded(personTableRow, person);
}

function makePersonTableRowAfterFetchingDataIsSucceeded(personTableRow, person) {
    console.log("Making my table og paremeterne personTableRow bruges til innerhtml med den tr id den har og person id til den tr id")
    if (person.address === undefined) {
                person.address = {
                    street: "",
                    zipcode: ""
                }
            }
            
    if (person.phones.length === 0) {
        person.phones = [
        {
            description: "",
            number: ""
        }
    ]
    }

    if (person.hobbies.length === 0) {
        person.hobbies = [
        {
            name: "",
            category: "",
            type: "",
            wikiLink: ""
        }
    ]
    }
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
    
                ${(person.address.street)}
            </td>
            
             <td>
                ${(person.address.zipcode)}
            </td>

             
                ${(renderHobbies(person.hobbies))}
            

            <td>
            
                <button class="btn btn-primary" id="update-button-${person.id}">update</button>            
            </td>  

             <td>
                <button class="btn btn-outline-danger" onclick="deletePerson(${person.id})">❌</type=button>            
            </td>        
            
        `;

        //  <p >${(renderHobbies(person.hobbies))}</p>  der stod json.hobbies før og det forstod den ikke

        
     document.getElementById(`update-button-${person.id}`)
        .addEventListener("click", () => {
              updatePerson(person)});


}


function updatePerson(person) {
    const tableRowToUpdate = document.getElementById(person.id);

    tableRowToUpdate.innerHTML =  `
    <td>      
            <input id="update-person-id-${person.id}" type=hidden value="${(person.id)}">
      
        
        <td>
            <input id="update-person-firstName-${person.id}" value="${(person.firstName)}">
        </td>

        <td>
            <input id="update-person-lastName-${person.id}" value="${(person.lastName)}">
        </td>
       <td>
            <input id="update-person-email-${person.id}" value="${(person.email)}">
       </td>
       
       <td> 
       ${insertAllInputWhileEditing(person.phones, "update-person",person.id, "phone", "description")}  
       </td> 
        

        
        <td> 
            ${insertAllInputWhileEditing(person.phones, "update-person", person.id, "phone", "number")}  
        </td> 
       

       
        <td>
            <input id="update-person-street-${person.id}" value="${(person.address.street)}">
       </td>

       <td>
            <input id="update-person-zipcode-${person.id}" value="${(person.address.zipcode)}">
       </td>
        
       <td> 
       
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby", "id", "hidden")}  
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby", "name")}  
       </td>
       <td> 
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby", "category")}  
       </td>
       <td> 
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby", "type")}  
       </td>
       <td> 
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby","wikiLink")}  

       </td>
            
            <button class="btn btn-success" id="updatePersonInBackend">Save</button>
       </td>
     
    `;

    document.getElementById("updatePersonInBackend").onclick = () => updatePersonInBackend(person);

}

//hobby havde en id men den skal vi hidden derfor type="text"
function insertAllInputWhileEditing (entities,action, personId, entityName, property, type="text") {
    //map bruger man til at lave nyt array
    return entities.map((entity, index) => `<input id="${action}-${personId}-${entityName}-${index}-${property}" type=${type} value=${entity[property]}> `).join("")
    
}

function insertAllInputInBackend (entities,action, personId, entityName) {
    return entities.map((entity, index) => { //laver anonym function

        //enkelte entity og looper igennem alle mine properties. forEach bruger man til at gøre noget igen og igen
        Object.entries(entity).forEach(property => { 
          //property name og entity navn
          //entity er vores phone object og property 0 er både vores phone og description
        
        //   console.log(document.getElementById(`${action}-${personId}-${entityName}-${index}-${property[0]}`))
        //   console.log(`${action}-${personId}-${entityName}-${index}-${property[0]}`)
          ////hobby havde en id men den skal vi hidden derfor type="text"
           entity[property[0]] = document.getElementById(`${action}-${personId}-${entityName}-${index}-${property[0]}`).value
            
        })
          return entity
    })
    
}

function updatePersonInBackend(person) {

    const tableRowToUpdate = document.getElementById(person.id);

    const personToUpdate = {
        
        id: person.id,
        firstName: document.getElementById(`update-person-firstName-${person.id}`).value,
        lastName: document.getElementById(`update-person-lastName-${person.id}`).value,
        email: document.getElementById(`update-person-email-${person.id}`).value,
        
        adddres: {
            street: document.getElementById(`update-person-street-${person.id}`).value,
            zipcode: document.getElementById(`update-person-zipcode-${person.id}`).value,
        },

        phones: insertAllInputInBackend(person.phones, "update-person",person.id, "phone"),
                
        hobbies: insertAllInputInBackend(person.hobbies, "update-person", person.id, "hobby")
        
    }
    console.log(personToUpdate)
    
    fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(personToUpdate)
    }).then(response => response.json)
       .then(response => {
        console.log(response.message)
        if (response.status === 200) {
            makePersonTableRowAfterFetchingDataIsSucceeded(tableRowToUpdate, personToUpdate);
        } 
    });
}



{/* <td> ` 
            console.log(person.phones)
            person.phones.forEach ( phone => {
            tableRowToUpdate.innerHTML +=` <input id="update-person-description-${person.id}"  value="${(phone.description)}"> `
            })
        

            tableRowToUpdate.innerHTML += `</td> 
        

        
        <td> `
              person.phones.forEach ( phone => {
                tableRowToUpdate.innerHTML += `<input id="update-person-number-${person.id}" value="${(phone.number)}"> `
              })

             tableRowToUpdate.innerHTML += `</td>  */}
/* ---------------------------------------------- UPDATE SLUT ----------------------------------------------- */

/* ---------------------------------------------- CREATE START ----------------------------------------------- */

function createNewPerson() {
    const newPerson = {
     firstName: document.getElementById("firstName").value,
     lastName: document.getElementById("lastName").value,
     email: document.getElementById("email").value,
     adddres: {
        street: document.getElementById(`update-person-street-${person.id}`).value,
        zipcode: document.getElementById(`update-person-zipcode-${person.id}`).value,
    },
    
     description: document.getElementById("description").value,
     number: document.getElementById("number").value,
     name: document.getElementById("select-name").value,
     category: document.getElementById("select-category").value
     //number: document.getElementById("number").value
     //number: document.getElementById("number").value
    }


    fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newPerson)

    }).then(response=> console.log("im here"))
        .catch(error => console.log("Network related error:", error))
}


const personFacade = {
    getAllPersons,
    updatePerson,
    makePersonTableRowAfterFetchingDataIsSucceeded,
    createPersonsTableRow,
    updatePersonInBackend,
    createNewPerson

    //editUser,
    //deleteUser
}

export default personFacade
