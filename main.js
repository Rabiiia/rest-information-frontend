import "./node_modules/bootstrap/dist/css/bootstrap.min.css"
import * as bootstrap from 'bootstrap';

window.bootstrap = bootstrap;

import "./style.css";
import "./personFacade";
import personFacade from "./personFacade";

document.getElementById("all-content").style.display = "block";

/*
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


/* JS For Exercise-2 below */

/* JS For Exercise-3 below */

personFacade.getAllPersons(); // loads all users right away

document.getElementById("fetchPersonsBtn").onclick = personFacade.getAllPersons;
//document.getElementById("getUserBtn").onclick = userFacade.getUser;
console.log("createbutton?")
document.getElementById("createNewPersonBtn").onclick = personFacade.createNewPersonInBackend;


//console.log(person.id, "main.js")
//document.getElementById(`update-button-${person.id}`).onclick = personFacade.updatePerson(person);
//document.getElementById(`update-button-${person.id}`).addEventListener("click", () => {
 //             personFacade.updatePerson(person)});



//document.getElementById("updatePersonInBackend(${person.id}").onclick = personFacade.updatePersonInBackend(personId);

//document.getElementById("deleteUserBtn").onclick = userFacade.deleteUser;

/*
 If you do not understand the code below, don´t worry, it is not necessary for completing the exercises
*/



function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("person").style = "display:none";
  document.getElementById("ex2_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("person");
      break;
    case "ex2":
      hideAllShowOne("ex2_html");
      break;
    case "ex3":
      hideAllShowOne("ex3_html");
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
