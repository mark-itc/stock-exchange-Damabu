const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const timeout = 250;
let searchInput = document.getElementById('search');
let btn = document.getElementById('button')
let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query='
let exchange = 'NASDAQ'
let limit = 10

searchInput.value = params.query;
showData();


btn.onclick = () => {
    showData()
}


async function showData (){
    
    if(searchInput.value == ''){
        return ;
    }

    let url2 = url + searchInput.value + '&exchange=' + exchange + '&limit='  + limit 

    let spinner = `<div class='text-center'><div class="spinner-grow text-secondary mr-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div></div>`

    let result = document.getElementById('results');
    result.innerHTML = spinner

    let response = await fetch(url2);
    let data = await response.json();

    console.log(data)

    let htmldata = data.map((el)=>{
        return `<li class="list-group-item"><a href="company.html?symbol=${el.symbol}">${el.name} (${el.symbol})</a></li>`;
    }).join('');

    let listahtml = `<ul class="list-group">${htmldata}</ul>`
    result.innerHTML = listahtml
}



searchInput.addEventListener('keyup', debounce(function(){
    showData()
}, timeout));

searchInput.addEventListener('keyup', function(){
    updateUrl();
} );


function updateUrl(){
    let searchvalue = searchInput.value;
    history.pushState({},`Searching ${searchvalue}`, `index.html?query=${searchvalue}`)
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};