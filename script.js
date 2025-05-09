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
    