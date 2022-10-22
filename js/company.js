const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const endpoint = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
const endpoint2 = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/"

const spinner = `<div class="spinner-grow text-secondary mr-auto" role="status">
    <span class="visually-hidden">Loading...</span>
</div>`

let symbol = params.symbol;

async function showCompanyData (symbol){

    let name1 = document.getElementById("companyName")
    name1.innerHTML = spinner;

    let url = endpoint + symbol;

    let response = await fetch(url);
    let data = await response.json();

    console.log(data)

    let stock = document.getElementById("companyStock")
    let image = document.getElementById("companyImage")
    let name = document.getElementById("companyName")
    let description = document.getElementById("companyDescription")
    let website = document.getElementById("companyLink")

    

    image.src = data.profile.image
    if(data.profile.changesPercentage>0)
    {
        stock.innerHTML = `Stock Price: $ ${data.profile.price} <span style='color:green;'>(${data.profile.changesPercentage} %)</span>`;
    }else{
        stock.innerHTML = `Stock Price: $ ${data.profile.price} <span style='color:red;'>(${data.profile.changesPercentage} %)</span>`;
    }
    

    name.innerHTML = data.profile.companyName
    description.innerHTML = data.profile.description
    website.innerHTML = data.profile.website
    website.href = data.profile.website


}

async function showCompanyGraphic (symbol){

    let name1 = document.getElementById("companyName")
    name1.innerHTML = spinner;

    let url = endpoint2 + symbol + "?serietype=line";

    let response = await fetch(url);
    let data = await response.json();

    console.log(data)

    let labels2 = new Array();
    let data2 = new Array();

    data.historical.forEach(element => {
        labels2.push(element.date)
        data2.push(element.close)
    });
   
    const dataset = {
        labels: labels2,
        datasets: [{
            label: 'Historical',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data2,
        }]
    };

    const config = {
        type: 'line',
        data: dataset,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}


showCompanyData(symbol)
showCompanyGraphic(symbol)
