



    var inputForm = document.getElementById("inputForm")  ; 
    var mainElem = document.getElementById("mainBox") ; 
    var tempElemF = document.getElementById("tempBoxF") ; 
    var tempElemC = document.getElementById("tempBoxC") ; 
    var weatherMainElem = document.getElementById ("weatherMainBox")  ; 
    var pressureElem = document.getElementById("pressureBox") ; 
    var humidityElem = document.getElementById("humidityBox") ; 
    var cityElem = inputForm.elements["city"] ;
    var countryElem = inputForm.elements["country"] ;
    var sunriseElem = document.getElementById("sunriseBox") ; 
    var sunsetElem = document.getElementById("sunsetBox") ; 
    var windSpeedElem = document.getElementById("windSpeedBox") ; 
    var windDirElem = document.getElementById("windDirBox")  ; 
    var cityCountryElem = document.getElementById("cityCountryBox")  ; 
    var coordElem = document.getElementById("coordBox") ; 

    
    initForm() ; 

    function initForm() {

        //initilize form here 
        console.log("initiazing form") ; 
        // cityElem.textContent = "Santa Fe" ; 
        // countryElem.textContent = "US" ; 


    }

function getData() {
   // alert("Get data function") ; 

    var request = new XMLHttpRequest() ;



    console.log(cityElem.value + ", " + countryElem.value) ; 

    if(checkCity() && checkCountry()) {


        var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityElem.value + ","  + countryElem.value + "&APPID=018bc84d97b02e53fc6b1645f7dd7538"
        
        request.open('GET', apiURL, true)  ; 
        request.send() ; 
        
        request.onload = function() {
            if( request.status == 200) {
                //convert results to JS Object. 
                var results = JSON.parse(this.response) ;
    
                if(results.cod == 200) {
                    weatherMainElem.textContent = results.weather[0].description ; 
                    tempElemF.textContent = (((parseInt(results.main.temp) - 273) * 1.8 ) + 32).toFixed(1)  ; 
                    tempElemC.textContent = (parseInt(results.main.temp) - 273).toFixed(1)   ; 
                    pressureElem.textContent = results.main.pressure ; 
                    humidityElem.textContent = results.main.humidity ; 
                    sunriseElem.textContent = results.sys.sunrise ; 
                    sunsetElem.textContent = results.sys.sunset ; 
                    windSpeedElem.textContent = results.wind.speed ; 
                    windDirElem.textContent =  results.wind.deg ; 
                    cityCountryElem.textContent = results.name + ", " + results.sys.country ; 
                    coordElem.textContent = results.coord.lon + " / " + results.coord.lat ; 

                }
                else {
                    //error message here.
                    alert("Could not find city/country pair") ;  
                }

            }
            else {
                //Need to handle this city not found error. 
                alert("Could not find city/country pair") ; 
            }
        }
        cityElem.value = "" ; 
        countryElem.value = "" ; 
        cityElem.focus(); 
    }


    return false ; 


}

function checkCity() {
    if(cityElem.value) {
        return true ; 
    }
    alert ("Enter valid city name") ; 
    cityElem.value = "" ; 
    cityElem.focus() ; 
    return false ; 

}

function checkCountry () {
    if(countryElem.value) {
        if(countryElem.value.length == 2) {
            return true  ;
        }
    }
    alert("Enter 2 character country code") ; 
    countryElem.value = "" ; 
    countryElem.focus() ; 
    return false ; 


}
