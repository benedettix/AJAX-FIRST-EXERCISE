let mainLinks = document.querySelectorAll('.main-link')
let h1 = document.querySelector('h1')
let displayTable = document.querySelector('.displayTable')
let tableHolder = document.querySelector('.table-holder')
let loader = document.querySelector('.loader-holder')


mainLinks.forEach(link => {
    link.addEventListener('click', getInformations);
})

function getInformations(e) {
    e.preventDefault();
    showLoader();
    let link = this.getAttribute('href');
    let xml = new XMLHttpRequest;

    xml.open('get', link);

    xml.onreadystatechange = () => {
        if(xml.readyState === 4 && xml.status === 200) {
            displayData(JSON.parse(xml.responseText), this.innerHTML);
        }
    }

    xml.send();
}

function displayData(data,heading) {
    hideLoader();
    h1.innerHTML = heading;
    let first = data[0];

    let text = '';

    text += `<table class="table">
    <thead>
    <tr>`
    for(let key in first) {
        text += `<th>${key}</th>`
    }
    text += `</tr></thead>`


    text += `<tbody>`
    data.forEach(info => {
        text += `<tr>`
        for(let key in info) {
            text += `<td>${info[key]}</td>`
        }
        text += `</tr>`
    })
    text += `</tbody></table>`
    tableHolder.innerHTML = text;
}

function showLoader() {
    loader.style.display = 'block';
    displayTable.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
    displayTable.style.display = 'block';
}