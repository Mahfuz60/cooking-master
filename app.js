const button = document.getElementById('searchButton');
const mealPlace = document.getElementById('meal');
const resultPlace= document.getElementById('showResult');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('inputForSearch').value;
    loadData(userInput);
});

function loadData(userInput) {

    let url = "";
    if (userInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
        mealPlace.innerHTML = null;
        resultPlace.innerHTML = null;

    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
        mealPlace.innerHTML = null;
        resultPlace.innerHTML = null;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
    //.catch(error => console.log(error))
}



const displayData = data => {

    data.meals.forEach(meal => {

        const mealDiv = document.createElement('div');

        const mealIntro = `
        <div  class="col">
            <div class="card h-100">
                <img  class="card-img-top" src="${meal.strMealThumb}"/>
                <div class="card-body">
                    <h5 class="card-title mx-auto">${meal.strMeal}</h5>
                    
                </div>
            </div>
        </div> `;
        mealDiv.innerHTML = mealIntro;
        mealPlace.appendChild(mealDiv);

    });
}

const displayMealDetails = (string) => {

    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log('JUST STRING NAME : ', string);

            resultPlace.style.display = "block"
            const div = document.createElement('div');

            let meal;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                meal = data.meals[i];

                if (string === meal.strMeal) {
                    mealInfo = `
                    <img src="${meal.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${meal.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                    
                        <li>${meal.strIngredient1}</li>
                        <li>${meal.strIngredient2}</li>
                        <li>${meal.strIngredient3}</li>
                        <li>${meal.strIngredient4}</li>
                        <li>${meal.strIngredient5}</li>
                        <li>${meal.strIngredient6}</li>
                        <li>${meal.strIngredient7}</li>
                        <li>${meal.strIngredient8}</li>
                        <li>${meal.strIngredient9}</li>
                        <li>${meal.strIngredient10}</li>
                    </ul>
                    </div> `;
                }
            }

            mealDiv.innerHTML = mealInfo;
            resultPlace.appendChild(mealDiv);
        });
    
    resultPlace.innerHTML = null;
}