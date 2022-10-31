class SearchResult {

    constructor(element) {
        let resultset = document.createElement("div")
        resultset.setAttribute("id","resultset")
        element.append(resultset)
        
    }

    renderResults(data_companies1){
        this.params = new URLSearchParams(window.location.search)


        let loading = document.getElementById('loading');
        loading.innerHTML = ""

        let symbols_array = [];
        let htmldata = data_companies1.map((el)=>{

            symbols_array.push(el.symbol)
            let str = `<li class="list-group-item">
                    <img id="${el.symbol}_img" style='max-height:30px;' src=''>
                    <a href="company.html?symbol=${el.symbol}">${el.name}</a>
                    <span style='font-size:12px; color:gray;'>(${el.symbol})</span>
                    <div id="${el.symbol}_percent" style='display:inline-block;'></div>
                </li>`;
            str = str.replace(this.params.get('query'), `<span style='background:red;'>${this.params.query}</span>` )
            return str;
        }).join('');

        let listahtml = `<ul class="list-group">${htmldata}</ul>`
        resultset.innerHTML = listahtml;

        
        (async () => {
            

            let slicedArray1 = symbols_array.slice(0, 3)
            let promise1 = this.getPromiseCompanyInfo(slicedArray1.join(","))

            let slicedArray2 = symbols_array.slice(3, 6)
            let promise2 = this.getPromiseCompanyInfo(slicedArray2.join(","))

            let slicedArray3 = symbols_array.slice(6, 9)
            let promise3 = this.getPromiseCompanyInfo(slicedArray3.join(","))

            let slicedArray4 = symbols_array.slice(9, 10)
            let promise4 = this.getPromiseCompanyInfo(slicedArray4.join(","))


            Promise.all([promise1, promise2, promise3, promise4]).then((promises_data) => {        
                console.log(promises_data)
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