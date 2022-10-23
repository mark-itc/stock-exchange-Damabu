const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const timeout = 250;
const apikey = "57bf4f754e37c17f9bccc2dfe0fe18ee"
let searchInput = document.getElementById('search');
let btn = document.getElementById('button')
let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query='
let url_company_profile = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
let exchange = 'NASDAQ'
let limit = 10

searchInput.value = params.query;
showData();


btn.onclick = () => {
    showData()
}


async function showData (){

    if(searchInput.value == ''){
        console.log("Búsqueda vacía")
        return ;
    }
    let url2 = url + searchInput.value + '&exchange=' + exchange + '&limit='  + limit 

    let spinner = `<div class='text-center'><div class="spinner-grow text-secondary mr-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div></div>`

    let result = document.getElementById('results');
    result.innerHTML = spinner

    let response = await fetch(url2);
    let data_companies1 = await response.json();

    var symbols_array = [];
    var htmldata = data_companies1.map((el)=>{

        symbols_array.push(el.symbol)

        return `<li class="list-group-item">
                <img id="${el.symbol}_img" style='max-height:30px;' src=''>
                <a href="company.html?symbol=${el.symbol}">${el.name}</a>
                <span style='font-size:12px; color:gray;'>(${el.symbol})</span>
                <div id="${el.symbol}_percent" style='display:inline-block;'></div>
            </li>`;
    }).join('');


    var slicedArray1 = symbols_array.slice(0, 3)
    let promise1 = getPromiseCompanyInfo(slicedArray1.join(","))

    var slicedArray2 = symbols_array.slice(3, 6)
    let promise2 = getPromiseCompanyInfo(slicedArray2.join(","))

    var slicedArray3 = symbols_array.slice(6, 9)
    let promise3 = getPromiseCompanyInfo(slicedArray3.join(","))

    var slicedArray4 = symbols_array.slice(9, 10)
    let promise4 = getPromiseCompanyInfo(slicedArray4.join(","))


    let listahtml = `<ul class="list-group">${htmldata}</ul>`
    result.innerHTML = listahtml

    Promise.all([promise1, promise2, promise3, promise4]).then((promises_data) => {        
        
        promises_data.forEach((data) => {
            if(typeof data.companyProfiles != "undefined"){
                data.companyProfiles.forEach((dataprofile) => {
                    showCompanyInfo(dataprofile)
                });
            }else{
                showCompanyInfo(data)
            }
        })
          
        
    });

}

async function getPromiseCompanyInfo(symbols){
     
    let url = url_company_profile + symbols;
    let response = await fetch(url);
    let promise = await response.json();

    return promise;

}

function showCompanyInfo(data){

    let img = document.getElementById(data.symbol + "_img");
    img.src = data.profile.image;

    let percent = document.getElementById(data.symbol + "_percent");

    if(data.profile.changesPercentage >= 0){
        percent.innerHTML = `<span style='color:green;'>+${data.profile.changesPercentage}%</span>`
    }else{
        percent.innerHTML = `<span style='color:red;'>${data.profile.changesPercentage}%</span>`
    }
            
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


async function generateMarqueeString(){

    let endpoint = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=${apikey}`
    let response = await fetch(endpoint);
    let data = await response.json();

    let marqueecontent = data.map((val) => {
        return `<span style='color:gray'>${val.symbol}</span> $${val.price}  `
    }).join("")

    let marquee1 = document.getElementById("marqueecontent")
    marquee1.innerHTML = marqueecontent

}


generateMarqueeString();