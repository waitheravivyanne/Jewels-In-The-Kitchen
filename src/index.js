const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2a725c7489msh3cfc14ebe6b7c72p194141jsn33e879b77033',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

function fetchRecipes() {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const recipeList = document.getElementById('recipes');
      recipeList.innerHTML = '';

      data.results.forEach((recipe) => {
        const recipeName = recipe.name;
        const recipeImage = recipe.thumbnail_url;

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
      console.log('Error fetching recipes', error);
    });
}

function fetchFeaturedRecipe() {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const featuredRecipe = document.getElementById('featured-recipe');
      const recipe = data.results[0];
      
      featuredRecipe.querySelector('h4').textContent = recipe.name;
      featuredRecipe.querySelector('p').textContent = recipe.description;

      const image = document.createElement('img');
      image.setAttribute('src', recipe.thumbnail_url);
      image.setAttribute('alt', 'Recipe Image');
      featuredRecipe.querySelector('img').replaceWith(image);

      const saveIcon = document.createElement('i');
      saveIcon.classList.add('far', 'fa-save', 'icon');
      saveIcon.addEventListener('click', function() {
        saveRecipe(recipe);
      });
      featuredRecipe.appendChild(saveIcon);

      const favoriteIcon = document.createElement('i');
      favoriteIcon.classList.add('far', 'fa-heart', 'icon');
      favoriteIcon.addEventListener('click', function() {
        toggleFavorite(recipe);
      });
      featuredRecipe.appendChild(favoriteIcon);
    })
    .catch((error) => {
      console.log('Error fetching featured recipe:', error);
    });
}

function fetchFeaturedRecipe() {
  fetch(url, options) 
    .then((response) => response.json())
    .then((data) => {
      const featuredRecipe = document.getElementById('featured-recipe');
      featuredRecipe.querySelector('h4').textContent = data.results[0].name;
      featuredRecipe.querySelector('p').textContent = data.results[0].description;
      featuredRecipe.querySelector('img').setAttribute('src', data.results[0].image);
      featuredRecipe.querySelector('img').setAttribute('alt', 'Recipe Image');

      // Create clickable icons for saving and liking recipes
      const saveIcon = document.createElement('i');
      saveIcon.classList.add('far', 'fa-save', 'icon');
      saveIcon.addEventListener('click', function() {
        saveRecipe(data.results[0]);
      });
      featuredRecipe.appendChild(saveIcon);

      const favoriteIcon = document.createElement('i');
      favoriteIcon.classList.add('far', 'fa-heart', 'icon');
      favoriteIcon.addEventListener('click', function() {
        toggleFavorite(data.results[0]);
      });
      featuredRecipe.appendChild(favoriteIcon);
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
  featuredRecipe.querySelector('img').setAttribute('alt', 'Recipe Image');
}

function saveRecipe(recipe) {
  // Perform save recipe functionality
  console.log('Recipe saved:', recipe);
}

function toggleFavorite(recipe, favoriteIcon) {
  // Toggle the favorite state of the recipe
  console.log('Recipe toggled as favorite:', recipe);
  favoriteIcon.classList.toggle('fas');
}

document.addEventListener('DOMContentLoaded', function() {
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

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input').value;
  console.log('Search input:', searchInput);
});

fetchRecipes(); // Remove duplicate fetchRecipes() call
