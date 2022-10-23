class SearchForm {

    constructor(element) {
        this.params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
     
        this.timeout = 250;
        this.callback = null;

        let h3 = document.createElement('h3');
        h3.innerHTML = "Search Nasdaq Stock"

        let divinput = document.createElement("div")
        divinput.classList.add("input-group")
        divinput.classList.add("mb-3")

        let input = document.createElement("input")
        input.setAttribute("id", "form_input")
        input.setAttribute("placeholder", "Company")
        input.setAttribute("type", "text")
        input.classList.add("form-control")
        input.classList.add("mr-sm-2")
        input.value = this.params.query


        let button = document.createElement("button")
        button.setAttribute("id", "form_button")
        button.setAttribute("type", "button")
        button.classList.add("btn")
        button.classList.add("btn-outline-secondary")
        button.classList.add("my-2")
        button.classList.add("my-sm-0")
        button.innerHTML = "Search"

        divinput.append(input)
        divinput.append(button)

        element.classList.add("text-center")
        element.append(h3)
        element.append(divinput)


        input.addEventListener("keyup", function(){
            history.pushState({},`Searching ${input.value}`, `index.html?query=${input.value}`)
        })

        button.addEventListener("clic", function(){
            search()
        })

        let form_input = document.getElementById("form_input")
        form_input.addEventListener("keyup",this.debounce(function(){
            this.search()
        }.bind(this), this.timeout ) )
    }


    search() {
        (async () => {
            if(form_input.value == ''){
                console.log("Búsqueda vacía")
                return ;
            }

            let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query='
            let url2 = url + form_input.value + '&exchange=NASDAQ&limit=10' 
        
            let spinner = `<div class='text-center'><div class="spinner-border mr-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div></div>`
        
            let result = document.getElementById('loading');
            result.innerHTML = spinner
        
            let response = await fetch(url2);
            let data_companies1 = await response.json();

            this.callback(data_companies1)
        }).bind(this)();      
    }

    onSearch(fn){
        this.callback = fn;
        this.search()
    }
    
    debounce(func, wait, immediate) {
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
}