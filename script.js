// Event listener for the Enter key in the search input
// Triggers the search function when Enter is pressed
const inputField = document.getElementById('countryInput');
if (inputField) {
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchCountry();
        }
    });
}
// Main search function
// Validates input and redirects to results page with search term
function searchCountry() {
    const input = document.getElementById('countryInput');
    if (!input) return;

    const name = input.value.trim();
    if (name.length === 0) {
        alert('Please enter a country name');
        return;
    }

    localStorage.setItem('countrySearch', name);
    window.location.href = 'result.html';
}
// Results display function
// Fetches and displays country data from the API
function displayResults() {
    const resultBox = document.getElementById('result');
    if (!resultBox) return;

    // Get search term from localStorage
    let searched = localStorage.getItem('countrySearch');
    if (!searched || searched.trim() === "") {
        window.location.href = 'index.html';
        return;
    }
    // Fetch country data from API and handle the response
    fetch(`https://restcountries.com/v3.1/name/${searched}`)
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
            // Handle 404 or invalid response
            if (status === 404 || !Array.isArray(body)) {
                resultBox.innerHTML = '<p class="error">Country not found. Try again.</p>';
                return;
            }
            // Prepare result container for new content
            resultBox.innerHTML = '';
            resultBox.style.opacity = 0;
            resultBox.style.transition = 'opacity 0.5s ease';

            // Process each country in the response
            for (let i = 0; i < body.length; i++) {
                const item = body[i];

                // Format currency information
                const curr = item.currencies
                    ? Object.values(item.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
                    : 'Not available';
                    // Format language information
                const lang = item.languages
                ? Object.values(item.languages).join(', ')
                : 'Not available';

            // Get flag URL and format population
            const flag = item.flags && item.flags.svg ? item.flags.svg : '';
            const pop = item.population ? item.population.toLocaleString() : 'Not available';
            // Create HTML for country card
            const html = `
            <div class="country-card">
                <img src="${flag}" alt="${item.name.common} flag" class="country-flag">
                <div class="country-info">
                    <h2>${item.name.official}</h2>
                    <p><strong>Common Name:</strong> ${item.name.common}</p>
                    <p><strong>Capital:</strong> ${item.capital ? item.capital[0] : 'N/A'}</p>
                    <p><strong>Currency:</strong> ${curr}</p>
                    <p><strong>Languages:</strong> ${lang}</p>
                    <p><strong>Population:</strong> ${pop}</p>
                    <p><strong>Region:</strong> ${item.region || 'Not available'}</p>
                    <p><strong>Area:</strong> ${item.area ? item.area.toLocaleString() + ' km²' : 'Not available'}</p>
                    <p><strong>Timezones:</strong> ${item.timezones ? item.timezones.join(', ') : 'Not available'}</p>
                </div>
            </div>
        `;


