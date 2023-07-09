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

        const image = document.createElement('img');
        image.setAttribute('src', recipeImage);
        image.setAttribute('alt', 'Recipe Image');
        listItem.appendChild(image);

        const recipeDetails = document.createElement('div');
        recipeDetails.classList.add('recipe-details');

        const recipeTitle = document.createElement('h4');
        recipeTitle.textContent = recipeName;
        recipeDetails.appendChild(recipeTitle);

        const directionsList = document.createElement('ol');
        directionsList.classList.add('directions');
        recipe.instructions.forEach((step) => {
          const directionItem = document.createElement('li');
          directionItem.textContent = step;
          directionsList.appendChild(directionItem);
        });
        recipeDetails.appendChild(directionsList);

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('ingredients');
        recipe.ingredients.forEach((ingredient) => {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = ingredient;
          ingredientsList.appendChild(ingredientItem);
        });
        recipeDetails.appendChild(ingredientsList);

        listItem.appendChild(recipeDetails);

        listItem.addEventListener('click', function () {
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
      data.recipes.shift();

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
  // Show the recipe details in a modal or any other UI element
  console.log('Recipe:', recipe);
  // For example, you can use a modal to display the recipe details
  const modal = document.getElementById('recipe-modal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalIngredients = modal.querySelector('.modal-ingredients');
  const modalDirections = modal.querySelector('.modal-directions');

  modalTitle.textContent = recipe.name;
  modalIngredients.innerHTML = '';
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    modalIngredients.appendChild(ingredientItem);
  });

  modalDirections.innerHTML = '';
  recipe.instructions.forEach((step) => {
    const directionItem = document.createElement('li');
    directionItem.textContent = step;
    modalDirections.appendChild(directionItem);
  });

  // Show the modal
  modal.style.display = 'block';
}

function removeDisplayedRecipe() {
  const recipeList = document.getElementById('recipes');
  recipeList.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function () {
  removeDisplayedRecipe();
  fetchRecipes();
  fetchFeaturedRecipe();
});

document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const recipeList = document.getElementById('recipes');
  const recipes = recipeList.getElementsByClassName('recipe');

  let foundRecipe = false;

  Array.from(recipes).forEach((recipe) => {
    const recipeName = recipe.querySelector('h4').textContent.toLowerCase();
    if (recipeName.includes(searchInput)) {
      recipe.style.display = 'block';
      foundRecipe = true;
    } else {
      recipe.style.display = 'none';
    }
  });

  if (!foundRecipe) {
    alert('Recipe not found');
  }
});
