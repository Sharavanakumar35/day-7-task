let xhr = new XMLHttpRequest;

api_method = 'GET';
api_url = 'https://restcountries.com/v3.1/all';

xhr.open(api_method, api_url);

api_response = [];
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        // console.log('Success = ', xhr.response);
        if (xhr.response && xhr.response.length > 0) {
           api_response = JSON.parse(xhr.response);

           //    1. a Get all the countries from Asia continent /region using Filter function
            let countriesFromAsia = api_response.filter(ele => ele.continents.includes("Asia"));
            console.log('1. a) Get all the countries from Asia continent /region using Filter function \n', "\n Answer:  **Contains only country's name list**\n", countriesFromAsia.map(item => item.name.common));

            // 1. b Get all the countries with a population of less than 2 lakhs using Filter function
            let countries_with_less_than_2L_population = api_response.filter(ele => ele.population < 200000);
            console.log('1. b) Get all the countries with a population of less than 2 lakhs using Filter function \n', "\n Answer:  **Contains only country's name list**\n", countries_with_less_than_2L_population.map(item => item.name.common));

            // 1. c Print the following details name, capital, flag, using forEach function
            const name_capital_flag = api_response.map(country => ({
                'name': country.name.common, 
                'capital': country.capital, 
                'flag': country.flags.svg,
                }));
        
            const tBody = document.getElementById('countryTableBody');
    
            name_capital_flag.forEach(flag => {
                const tRow = document.createElement('tr');
        
                tRow.innerHTML = 
                `<td>${flag.name}</td>
                <td>${flag.capital}</td>
                <td><img src="${flag.flag}" height="50px" style="margin: 15px; width:auto"></td>`;
        
                tBody.appendChild(tRow);
            });

            // 1. d Print the total population of countries using reduce function

            countries_population_list = api_response.map(ele => ele.population);

            let total_population = countries_population_list.reduce((a, c) => a + c, 0);

            console.log('1. d) Print the total population of countries using reduce function \n', "\n Answer: \n", '\nTotal Population = ', total_population);

            // 1. e Print the country that uses US dollars as currency.
            countries_usd_list = api_response.filter(ele => {
                return ele.currencies && Object.keys(ele.currencies).includes('USD');
            });

            console.log('1. e) Print the country that uses US dollars as currency. \n', "\n Answer:  **Contains only country's name list**\n", countries_usd_list.map(i => i.name.common));



        }

    } else {
        console.log('Request Failed = ', xhr.status);
        console.log('Response = ', xhr.response);
    }
}

xhr.onerror = function() {
    console.error('Network error occured');
}

xhr.send();