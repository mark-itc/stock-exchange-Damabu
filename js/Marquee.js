class Marquee {

    constructor(element) {
        
        this.apikey = "57bf4f754e37c17f9bccc2dfe0fe18ee"
        this.endpoint = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=${this.apikey}`

        element.classList.add("cssmarquee");

        var div = document.createElement('div');
        div.setAttribute("id", "marqueecontent");
        div.innerHTML = "Loading ... ";

        element.append(div)
 
    }

    async load (){
        let response = await fetch(this.endpoint);
        let data = await response.json();

        let marqueecontent = data.map((val) => {
            return `<span style='color:gray'>${val.symbol}</span> $${val.price}  `
        }).join("")
    
        let marquee1 = document.getElementById("marqueecontent")
        marquee1.innerHTML = marqueecontent            
    }

   
}