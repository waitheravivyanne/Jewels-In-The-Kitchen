const url = `https://www.themealdb.com/api/json/v1/1/categories.php`


function fetchRecipes() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipes')
            recipeList.innerHTML = '';

            data.meals.forEach((meal) => {
                const recipe = meal.strIngredient;
                const recipeImage = meal.strMealThumb;
                const listItem = document.createElement('li');
                listItem.classList.add('recipe', 'item');
                listItem.textContent = recipe;

              

                
                listItem.addEventListener('click', function() {
                    displayRecipeDetails(meal);
                });
                recipeList.appendChild(listItem);
            })
        })
        .catch((error) => {
            console.log('Error fetching recipes', error);
        })
}
function fetchFeaturedRecipe() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const featuredRecipe = document.getElementById('featured-recipe');
            featuredRecipe.querySelector('h4').textContent = data.meals[0].strIngredient;
            featuredRecipe.querySelector('p').textContent = data.meals[0].strDescription;
            featuredRecipe.querySelector('img').setAttribute('src', data.meals[0].strImage);
            featuredRecipe.querySelector('img').setAttribute('alt', 'Recipe Image');
            
            
            const saveIcon = document.createElement('i');
            saveIcon.classList.add('far', 'fa-save', 'icon');
            saveIcon.addEventListener('click', function () {
              saveRecipe(data.meals[0]);
            });
            featuredRecipe.appendChild(saveIcon);
      
            const likeIcon = document.createElement('i');
            likeIcon.classList.add('far', 'fa-heart', 'icon');
            likeIcon.addEventListener('click', function () {
              likeRecipe(data.meals[0]);
            });
            featuredRecipe.appendChild(likeIcon);
          })

    
        .catch(error => {
            console.log('Error fetching featured recipe:', error);
        });
}
function displayRecipeDetails(recipe) {
    const featuredRecipe = document.getElementById('featured-recipe');
    featuredRecipe.querySelector('h4').textContent = recipe.strIngredient;
    featuredRecipe.querySelector('p').textContent = recipe.strDescription;
    featuredRecipe.querySelector('img').setAttribute('src', recipe.strImage);
    featuredRecipe.querySelector('img').setAttribute('alt', 'Recipe Image');
}

function saveRecipe(recipe) {
    // Perform save recipe functionality
    console.log('Recipe saved:', recipe);
  }
  
  function likeRecipe(recipe) {
    // Perform like recipe functionality
    console.log('Recipe liked:', recipe);
  }
document.addEventListener('DOMContentLoaded', function () {
    fetchRecipes();
    fetchFeaturedRecipe();
});
document.getElementById('saved-recipes').addEventListener('click', function(event) {
    
    const clickedElement = event.target;
    if (clickedElement.classList.contains('recipe')) {
        const savedRecipesList = document.getElementById('saved-recipes');
        savedRecipesList.appendChild(clickedElement);
    }
});

document.getElementById('favorite-recipes').addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('recipe')) {
        const favoriteRecipesList = document.getElementById('favorite-recipes');
        favoriteRecipesList.appendChild(clickedElement);
    }
});

// document.getElementById('recipes').addEventListener('click', function(event) {
//     const selectedOption = event.target.value;
//     console.log(selectedOption);
// });

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    console.log('Search input:', searchInput);
})
 


fetchRecipes();

fetchFeaturedRecipe();