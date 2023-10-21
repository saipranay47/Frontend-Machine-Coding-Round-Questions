const searchBar = document.getElementById("search-bar");
const suggestionsContainer = document.getElementById("suggestions-container");

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Boston",
  "Seattle",
  "Miami",
  "Denver",
  "Austin",
  "Philadelphia",
];

searchBar.addEventListener("input", function () {
  const inputValue = searchBar.value.toLowerCase();
  suggestionsContainer.innerHTML = "";

  if (inputValue.length === 0) {
    suggestionsContainer.style.display = "none";
    return;
  }

  const matchingCities = cities.filter((city) =>
    city.toLowerCase().includes(inputValue)
  );

  matchingCities.sort((a, b) => {
    const aIndex = a.toLowerCase().indexOf(inputValue);
    const bIndex = b.toLowerCase().indexOf(inputValue);
    if (aIndex < bIndex) {
      return -1;
    }
    if (aIndex > bIndex) {
      return 1;
    }
    return 0;
  });

  matchingCities.forEach((city) => {
    const suggestion = document.createElement("div");
    suggestion.textContent = city;
    suggestion.addEventListener("click", function () {
      searchBar.value = city;
      suggestionsContainer.style.display = "none";
    });
    suggestionsContainer.appendChild(suggestion);
  });

  suggestionsContainer.style.display = "block";
});

document.addEventListener("click", function (event) {
  if (!suggestionsContainer.contains(event.target)) {
    suggestionsContainer.style.display = "none";
  }
});
