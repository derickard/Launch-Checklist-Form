// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function isValidInput(input, typeInput) {
   if(typeInput === "number") {
      return isNaN(Number(input));
   } else if (typeInput === "string") {
      return (input.match(/[^a-zA-Z]/g));
   }
   return;
}

function shuttleNotReady() {
   document.getElementById("faultyItems").style.visibility = "visible";
   document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch"
   document.getElementById("launchStatus").style.color= "red";
   return;
}

function shuttleReady() {
   document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch"
   document.getElementById("launchStatus").style.color= "green";
   return;
}

function init() {
   let form = document.querySelector("form");
   let missionTarget = document.getElementById("missionTarget");
   let planetID = 0;
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         planetID = Math.floor(Math.random()*json.length);
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[planetID].name}</li>
            <li>Diameter: ${json[planetID].diameter}</li>
            <li>Star: ${json[planetID].star}</li>
            <li>Distance from Earth: ${json[planetID].distance}</li>
            <li>Number of Moons: ${json[planetID].moons}</li>
         </ol>
         <img src="${json[planetID].image}">
         `;
      });
   });

   form.addEventListener("submit", function (event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let inputs = [pilotName.value,copilotName.value,fuelLevel.value,cargoMass.value];

      // Validate Input
      if (inputs.includes("")) {
         alert("All fields required.");
         event.preventDefault();
      } else if (isValidInput(pilotName.value,"string") || isValidInput(copilotName.value, "string")) {
         alert("Pilot and Co-pilot names must be entered as letters only.");
         event.preventDefault();
      } else if (isValidInput(fuelLevel.value, "number") || isValidInput(cargoMass.value, "number")) {
         alert("Fuel level and mass must be entered as numbers.")
         event.preventDefault();
      } 

      // Update Shuttle Requirements
      // Pilot and Co-Pilot Status
      document.getElementById("pilotStatus").innerHTML=`Pilot ${pilotName.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML=`Co-pilot ${copilotName.value} is ready for launch`;
      // Fuel Level
      if (Number(fuelLevel.value) < 10000) {
         document.getElementById("fuelStatus").innerHTML = "Fuel too low for launch";
         shuttleNotReady();
         event.preventDefault();
      } else {
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
      }
      // Cargo Mass
      if (Number(cargoMass.value) > 10000) {
         document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
         shuttleNotReady();
      } else {
         document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
      }

      if ((Number(fuelLevel.value) > 10000) && (Number(cargoMass.value) < 10000)) {
         shuttleReady();
      }
      event.preventDefault();
   });



}

window.onload = init;