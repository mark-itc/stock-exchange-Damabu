let searchInput = document.getElementById('search');
let btn = document.getElementById('button')
let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query='
let exchange = 'NASDAQ'
let limit = 10

btn.onclick = () => {
    let url2 = url + searchInput.value + '&exchange=' + exchange + '&limit='  + limit 

    let spinner = `<div class='text-center'><div class="spinner-border text-secondary mr-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div></div>`

    let result = document.getElementById('results');
    result.innerHTML = spinner

    showData(url2)
}

async function showData (url){

    let response = await fetch(url);
    let data = await response.json();

    console.log(data)

    let htmldata = data.map((el)=>{
        return `<li class="list-group-item"><a href="company.html?symbol=${el.symbol}">${el.name} (${el.symbol})</a></li>`;
    }).join('');

    let listahtml = `<ul class="list-group">${htmldata}</ul>`
    let result = document.getElementById('results');
    result.innerHTML = listahtml
}