//import {clear, simpleSort, searchSort} from "/js/jsmodule.js";
//global to save on calls
let courseArray;

//inital call to api and conversion to a map for use in all subfunctions
async function getData() {  
    try {
        let rawData = await fetch("https://webbutveckling.miun.se/files/ramschema_ht23.json");
        if(!rawData.ok) {
            console.log("problem with fetch content")
        }
        let data = await rawData.json();
        courseArray = data.map(function(data) {
            return [data.code, data.coursename, data.progression];
        });
        start(courseArray);
    }
    catch(error) {
        console.log("it broke")
    }
}

//applies elements to list
function start(courseArray) {
    clear();
    let listGet = document.getElementById("content");
    for (let index = 0; index < courseArray.length; index++) {
        let tempTableRowElement = document.createElement("tr");
        for (let i = 0; i < 3; i++) {
            let tempElement = document.createElement("td");
            tempElement.innerHTML = courseArray[index][i];
            tempTableRowElement.append(tempElement);
        }
        listGet.append(tempTableRowElement)
    }
}

function clear() {
    let table = document.getElementById("content");
    let tableContent = table.getElementsByTagName("tr");
    let tableLenght = tableContent.length;
    for (let index = 1; index < tableLenght; index++) {
        tableContent[1].remove();
    }
}

//simple name sort, checks value from onclick on categories
window.simpleSort = function simpleSort(val) {
    let simpleSort = courseArray;
    switch (val) {
        case 0:
            simpleSort.sort((a, b) => String(a[0]).localeCompare(b[0]));
            break;
        case 1:
            simpleSort.sort((a, b) => String(a[1]).localeCompare(b[1]));
            break;
        case 2:
            simpleSort.sort((a, b) => String(a[2]).localeCompare(b[2])); 
            break;
    }
    clear();
    start(simpleSort);
}

//search based of content, checks if any of the three fields contains the substring and includes those, quite proud of this one. Might be expensive tho, no clue.
window.searchSort = function searchSort(search) {
    let searchSort = courseArray;
    searchSort = searchSort.filter((a) => a[0].toLowerCase().includes(search.toLowerCase()) || a[1].toLowerCase().includes(search.toLowerCase()) || a[2].toLowerCase().includes(search.toLowerCase()));
    start(searchSort);
}

//revving up the script
getData();