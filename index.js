'use strict';

// put your own value below!
const apiKey = 'NqbsdG9Gfj24afPaG9oKep2IEDAv5v57NRQyLG7o';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<div class =result-container>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href=${responseJson.data[i].url}</a>Visit park website</p>
      </div>`
        )
    };
    $('.searchResults').removeClass('hidden');

};

function getNationalParks(query, maxResults = 10) {
    const params = {
        limit: maxResults,
        stateCode: query,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    });
}

$(watchForm);