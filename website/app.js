// Global Variables

const baseURL = 'api.openweathermap.org/data/2.5/weather?zip='; // zip search
const zip = 'G117BE' + ',uk';
const apiKey = '&appid=' + '555036a2bb84497ab0064c6bd52df011'; // TODO pull in from non-vc file

function performAction(){
    fetchWeatherData(baseURL, zip, apiKey)
}

// Fetch Weather Data from OpenWeatherApi
const fetchWeatherData = async (baseURL, zip, apiKey) => {
    const url = baseURL + zip + apiKey;
    try {
        const request = await fetch(url);
        const data = await request.json();
        // destructuring of result
        const {
            main: {temp},
        } = data;
        return temp
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
        }
}