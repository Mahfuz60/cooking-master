//calling API
const inputMeal = document.getElementById("search-field");
const button = document.getElementById("search-btn");
const displayArea = document.getElementById("display");
const detailsArea = document.getElementById("details-area");
const mealUrl = "https://www.themealdb.com/api/json/v1/1/";

//take input
button.addEventListener("click", () => {
  searchFoodByName(inputMeal.value);
});
const searchFoodByName = (keyword) => {
  if (keyword != "") {
    showLoader(displayArea, true);
    let url = `${mealUrl}search.php?s=${keyword}`;
    fetch(encodeURI(url))
      .then((data) => data.json())
      .then((data) => {
        showLoader(displayArea, false);
        displayFood(data);
      });
  }
};
const displayFood = (data) => {
  if (data.meals == null) {
    showNotFoundMessage();
  } else {
    displayArea.innerHTML = createFoodCard(data);
  }
};
//if noting match through search
const showNotFoundMessage = () => {
  displayArea.innerHTML = `<h1>Sorry,Your Food is Not Available):</h1>`;
};
const createFoodCard = (data) => {
  let meals = data.meals;
  let elementString = "";
  meals.forEach((data) => {
    elementString += `<div class="food-item" onclick="showFoodDetails(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
  });
  return elementString;
};
const showFoodDetails = (id) => {
  let url = `${mealUrl}lookup.php?i=${id}`;
  fetch(encodeURI(url))
    .then((data) => data.json())
    .then((data) => {
      let item = data.meals[0];
      let ingredients = "";
      for (let i = 1; i <= 6; i++) {
        ingredients += `<li><i class="material-icons">check_box</i> ${
          item["strIngredient" + i]
        }</li>`;
      }
      detailsArea.innerHTML = `<section id="modal">
            <div class="modal-content">
                <div class="modal-body">
                  <div class="food-details">
                    <button id="modal-btn" onclick="hideFoodDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="details">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
    });
};
const hideFoodDetails = () => {
  detailsArea.innerHTML = "";
};
const showLoader = (parent, argument) => {
  argument ? (parent.innerHTML = `<div class="loader"></div>`) : "";
};
