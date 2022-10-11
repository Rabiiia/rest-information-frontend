

const personUrl = "https://acmverden.dk/tomcat/information/api/person/"
const hobbyUrl = "https://acmverden.dk/tomcat/information/api/hobby/"

const personsTableBody = document.getElementById("allPersonRows");
let hobbies;
let filteredHobbies;
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

const renderHobbies = (hobbies, personId) => {

    const names = hobbies.map (hobby => `${hobby.name}<br>`)
    const  categories = hobbies.map (hobby => `${hobby.category}<br>`)
    const  types = hobbies.map (hobby => `${hobby.type}<br>`)
    const  wikiLinks = hobbies.map (hobby => `${hobby.wikiLink}<br>`)

    return `
    <td id="name-${personId}">${names}</td>` +
    `<td id="category-${personId}">${categories}</td>` +
   ` <td id="type-${personId}">${types}</td> ` +
    `<td id="wikiLink-${personId}"> ${wikiLinks}</td>` 
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

    fetch(personUrl)
        .then(res => res.json())
        .then(persons => {
            console.log("here i fetch all persons and secondly my innerHTML appendChild() knows who the father is. so it map persons(data)")
            //allPersonRow.innerHTML = persons.map((person) => renderPerson(person)).join("\n")
            console.log(persons)
            personsTableBody.innerHTML="";
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
    console.log(person)
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
            
            
             <td id="street-${person.id}">
    
                ${(person.address.street)}
            </td>
            
             <td id="zipcode-${person.id}">
                ${(person.address.zipcode)}
            </td>

             
                ${(renderHobbies(person.hobbies,person.id))}
            

            <td>
            
                <button class="btn btn-primary" id="update-button-${person.id}">update</button>            
            </td>  

             <td>
                <button class="btn btn-outline-danger" id="deleteAddressInBackend-${person.id}">❌</type=button>            
            </td>        
            
        `;

        //  <p >${(renderHobbies(person.hobbies))}</p>  der stod json.hobbies før og det forstod den ikke

        
     document.getElementById(`update-button-${person.id}`)
        .addEventListener("click", () => {
              updatePerson(person)});

        document.getElementById(`deleteAddressInBackend-${person.id}`).onclick = () => deleteAddressInBackend(person.id);


}


function updatePerson(person) {
    const tableRowToUpdate = document.getElementById(person.id);
    person.hobbies.forEach (hobby => {
        delete hobby.id
        delete hobby.category
        delete hobby.type
        delete hobby.wikiLink
     })
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
            ${insertAllInputWhileEditing(person.phones, "update-person", person.id, "phone", "description")}  
        </td> 

        <td> 
       ${insertAllInputWhileEditing(person.phones, "update-person",person.id, "phone", "number")}  
       </td> 
       

       
        <td>
            <input id="update-person-street-${person.id}" value="${(person.address.street)}">
       </td>

       <td>
            <input id="update-person-zipcode-${person.id}" value="${(person.address.zipcode)}">
       </td>
        
       <td> 
       ${insertAllInputWhileEditing(person.hobbies, "update-person", person.id, "hobby", "name")}  
       </td>
     

       <td>
            
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
            console.log(property)
          //property name og entity navn
          //entity er vores phone object og property 0 er både vores phone og description
        
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

        phones: insertAllInputInBackend(person.phones, "update-person",person.id, "phone"),
        
        address: {
            street: document.getElementById(`update-person-street-${person.id}`).value,
            zipcode: document.getElementById(`update-person-zipcode-${person.id}`).value,
        },


                
        hobbies: insertAllInputInBackend(person.hobbies, "update-person", person.id, "hobby")
        
    }
  

    
    fetch(personUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(personToUpdate)
    }).then(response => response.json())
        .then(response => {
        console.log(response)
        if (response.code === 200) {
            makePersonTableRowAfterFetchingDataIsSucceeded(tableRowToUpdate, personToUpdate);
            person.hobbies.forEach(hobby => {
                fetch(hobbyUrl + hobby.name)
                .then(res => res.json())
                .then(hobby => {
                    personToUpdate.hobbies.push(hobby) 
                    console.log(tableRowToUpdate)
                    document.getElementById(`name-${person.id}`).innerHTML = hobby.name
    
                    document.getElementById(`category-${person.id}`).innerHTML = hobby.category
                    document.getElementById(`type-${person.id}`).innerHTML = hobby.type
                    document.getElementById(`wikiLink-${person.id}`).innerHTML = hobby.wikiLink
                })
            })
        }
             
        })
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

function createNewPersonInBackend() {
    const newPerson = {
     firstName: document.getElementById("firstName").value,
     lastName: document.getElementById("lastName").value,
     email: document.getElementById("email").value,
     
     address: {
        street: document.getElementById("street").value,
        zipcode: document.getElementById("zipcode").value,
     },

    phones:[
        {    
            number: document.getElementById("number").value,    
            description: document.getElementById("description").value,
        },
        {    
            number: document.getElementById("number2").value,    
            description: document.getElementById("description2").value,
        },
        {    
            number: document.getElementById("number3").value,    
            description: document.getElementById("description3").value,
        }
    ] ,
    hobbies: [
        {
            name: document.getElementById("status-dropdown-name").value,
        }
    ]
     
    }
    //console.log(JSON.stringify(newPerson))


    fetch(personUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify(newPerson)

    }).then(response=> response.json())
        .catch(error => console.log("Network related error:", error))
}

// function createHobby(hobby) {
//     const hobbyElement = document.createElement("div");
//     championElement.innerHTML = `
//         <p>hobby name: ${(hobby.name)}</p> 
//         <p>${(hobby.category)}</p>
//         <p>${(hobby.type)}</p>
//         <p>${(hobby.wikiLink)}</p>
           
  
//     `;
//     personsTableBody.appendChild(hobbyElement);
// }

// function searchHobby() {
//     const selectedStatus = document.getElementById("status-dropdown-name").value;
//     personsTableBody.innerHTML = "";

//     if (selectedStatus === "All") {
//         filteredHobbies = hobbies;
//         hobbies.map(createHobby);
//     } else {
//         filteredHobbies = hobbies.filter(hobby => hobby.name === selectedStatus);
//         filteredHobbies.map(createHobby);
//     }
// }

//document.getElementById("search").addEventListener("click", searchHobby);

/* ---------------------------------------------- CREATE SLUT ----------------------------------------------- */

/* ---------------------------------------------- DELETE START ----------------------------------------------- */

function deleteAddressInBackend(personId) {
    

    //id: document.getElementById("delete-button-").value;

    fetch(personUrl + personId + "/address", {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(`street-${personId}`).innerHTML ="",
            document.getElementById(`zipcode-${personId}`).innerHTML=""
        } else {
            console.log(response.status);
        }
    });
}


const personFacade = {
    getAllPersons,
    createNewPersonInBackend,
    deleteAddressInBackend
}

export default personFacade
