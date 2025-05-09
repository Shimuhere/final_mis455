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