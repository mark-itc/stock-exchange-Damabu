class SearchResult {

    constructor(element) {
        let resultset = document.createElement("div")
        resultset.setAttribute("id","resultset")
        element.append(resultset)
        
    }

    renderResults(data_companies1){


        let loading = document.getElementById('loading');
        loading.innerHTML = ""

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

        let listahtml = `<ul class="list-group">${htmldata}</ul>`
        resultset.innerHTML = listahtml;

        
        (async () => {
            

            var slicedArray1 = symbols_array.slice(0, 3)
            let promise1 = this.getPromiseCompanyInfo(slicedArray1.join(","))

            var slicedArray2 = symbols_array.slice(3, 6)
            let promise2 = this.getPromiseCompanyInfo(slicedArray2.join(","))

            var slicedArray3 = symbols_array.slice(6, 9)
            let promise3 = this.getPromiseCompanyInfo(slicedArray3.join(","))

            var slicedArray4 = symbols_array.slice(9, 10)
            let promise4 = this.getPromiseCompanyInfo(slicedArray4.join(","))


            Promise.all([promise1, promise2, promise3, promise4]).then((promises_data) => {        
                
                promises_data.forEach((data) => {
                    if(typeof data.companyProfiles != "undefined"){
                        data.companyProfiles.forEach((dataprofile) => {
                            this.showCompanyInfo(dataprofile)
                        });
                    }else{
                        this.showCompanyInfo(data)
                    }
                })
                
                
            });
            
        }).bind(this)()
 
    }

    async getPromiseCompanyInfo(symbols){
     
        let url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" + symbols;
        let response = await fetch(url);
        let promise = await response.json();
    
        return promise;
    
    }
    
    showCompanyInfo(data){
        console.log(data)
        let img = document.getElementById(data.symbol + "_img");
        img.src = data.profile.image;
    
        let percent = document.getElementById(data.symbol + "_percent");
    
        if(data.profile.changesPercentage >= 0){
            percent.innerHTML = `<span style='color:green;'>+${data.profile.changesPercentage}%</span>`
        }else{
            percent.innerHTML = `<span style='color:red;'>${data.profile.changesPercentage}%</span>`
        }
                
    }
}