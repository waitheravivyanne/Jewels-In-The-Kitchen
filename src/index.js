const url = 'db.json';

function fetchRecipes() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const recipeList = document.getElementById('recipes');
      recipeList.innerHTML = '';

      data.recipes.forEach((recipe) => {
        const recipeName = recipe.name;
        const recipeImage = recipe.image;

        const listItem = document.createElement('li');
        listItem.classList.add('recipe', 'item');
        listItem.textContent = recipeName;

        const image = document.createElement('img');
        image.setAttribute('src', recipeImage);
        image.setAttribute('alt', 'Recipe Image');
        listItem.appendChild(image);

        listItem.addEventListener('click', function() {
          displayRecipeDetails(recipe);
        });

        recipeList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.log('Error fetching recipes:', error);
    });
}

function fetchFeaturedRecipe() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const featuredRecipe = document.getElementById('featured-recipe');
      const recipe = data.recipes[0];

      featuredRecipe.querySelector('h4').textContent = recipe.name;
      featuredRecipe.querySelector('p').textContent = recipe.description;
      featuredRecipe.querySelector('img').setAttribute('src', recipe.image);

      const ingredientsList = featuredRecipe.querySelector('.ingredients');
      ingredientsList.innerHTML = '';

      recipe.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
      });

      const directionsList = featuredRecipe.querySelector('.directions');
      directionsList.innerHTML = '';

      recipe.instructions.forEach((step) => {
        const directionItem = document.createElement('li');
        directionItem.textContent = step;
        directionsList.appendChild(directionItem);
      });
    })
    .catch((error) => {
      console.log('Error fetching featured recipe:', error);
    });
}

function displayRecipeDetails(recipe) {
  const featuredRecipe = document.getElementById('featured-recipe');
  featuredRecipe.querySelector('h4').textContent = recipe.name;
  featuredRecipe.querySelector('p').textContent = recipe.description;
  featuredRecipe.querySelector('img').setAttribute('src', recipe.image);

  const ingredientsList = featuredRecipe.querySelector('.ingredients');
  ingredientsList.innerHTML = '';

  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  });

  const directionsList = featuredRecipe.querySelector('.directions');
  directionsList.innerHTML = '';

  recipe.instructions.forEach((step) => {
    const directionItem = document.createElement('li');
    directionItem.textContent = step;
    directionsList.appendChild(directionItem);
  });
}

function saveRecipe(recipe) {
  console.log('Recipe saved:', recipe);
}

function toggleFavourite(recipe, favouriteIcon) {
  favouriteIcon.classList.toggle('fas');
}

document.addEventListener('DOMContentLoaded', function() {
  fetchRecipes();
  fetchFeaturedRecipe();
});

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const recipeList = document.getElementById('recipes');
  const recipes = recipeList.getElementsByClassName('recipe');

  Array.from(recipes).forEach((recipe) => {
    const recipeName = recipe.textContent.toLowerCase();
    if (recipeName.includes(searchInput)) {
      recipe.style.display = 'block';
    } else {
      recipe.style.display = 'none';
    }
  });
});
