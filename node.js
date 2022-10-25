// NODE SCRIPT
import * as fs from 'fs';
import { JSDOM } from "jsdom";

const html_text = fs.readFileSync('index.html', {encoding:"utf8"});
let dom = new JSDOM(html_text);
let document = dom.window.document;

const length = fs.readdirSync('./Images').length;
for (let i = 0; i < length; i++) {
    let img = document.createElement('img');
    img.style.display = "none";
    img.setAttribute('src', 'Images/'+i+'.jpg');
    document.body.appendChild(img);
}

// MAIN SCRIPT
let currentImage = Array.from(document.body.children)[0];
currentImage.style.display = "block";

document.getElementById("change-button").addEventListener("click", event => {
    currentImage.style.display = "none";
    if (currentImage.nextElementSibling) {
        currentImage.nextElementSibling.style.display = "block";
    } else {
        Array.from(document.body.children[0]).style.display = "block";
    }
});

fs.writeFileSync("index.html", dom.serialize())