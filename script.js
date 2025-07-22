// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary elements from the DOM
    const searchWidget = document.getElementById('search-widget');
    const searchInput = document.getElementById('search-input');
    const initialSuggestions = document.getElementById('initial-suggestions');
    const searchResults = document.getElementById('search-results');

    // Define the dynamic search suggestions with corresponding Font Awesome icons
    const dynamicSuggestions = [
        { text: "Where do we go on holidays?", icon: "fa-solid fa-plane-departure" },
        { text: "Maui Hotel Or Maui Condo", icon: "fa-solid fa-hotel" },
        { text: "Wine Tours La Dolce Vita", icon: "fa-solid fa-wine-glass" },
        { text: "El Salvador", icon: "fa-solid fa-map-pin" },
        { text: "Enhance Wellness By Doing Something", icon: "fa-solid fa-spa" }
    ];

    // --- Core Functions ---

    /**
     * Resets the UI to its initial state, showing the static suggestions.
     */
    const showInitialState = () => {
        initialSuggestions.style.display = 'flex';
        searchResults.style.display = 'none';
        searchResults.innerHTML = ''; // Clear previous results
        searchWidget.classList.remove('expanded');
    };

    /**
     * Shows the dynamic search results based on the predefined list.
     */
    const showResults = () => {
        initialSuggestions.style.display = 'none';
        searchResults.style.display = 'block';
        searchResults.innerHTML = ''; // Clear previous results before adding new ones
        searchWidget.classList.add('expanded');

        // Create and append each result item to the results container
        dynamicSuggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.classList.add('result-item');
            item.innerHTML = `<i class="${suggestion.icon}"></i><span>${suggestion.text}</span>`;
            
            // Add a click listener to each result item
            item.addEventListener('click', () => {
                searchInput.value = suggestion.text; // Populate input with the suggestion text
                showInitialState(); // Reset UI to initial state
            });

            searchResults.appendChild(item);
        });
    };

    // --- Event Listeners ---

    // Listen for any input in the search field
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim().length > 0) {
            // If user is typing, show the dynamic results
            showResults();
        } else {
            // If the input is empty, revert to the initial state
            showInitialState();
        }
    });

    // Bonus: Also handle clicks on the initial suggestion buttons
    initialSuggestions.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            // Extract text, removing the emoji
            const buttonText = button.textContent.trim().replace(/^[^\w\s]+/, '').trim();
            searchInput.value = buttonText;
            searchInput.focus();
            // Trigger the input event manually to show dynamic results
            searchInput.dispatchEvent(new Event('input'));
        });
    });

    // Initialize the view
    showInitialState();
});