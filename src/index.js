const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://yummly2.p.rapidapi.com/feeds/auto-complete',
  params: {q: 'chicken soup'},
  headers: {
    'X-RapidAPI-Key': 'e504e03979msh60219c5ed647d2fp1ba80djsn858fe40fc19f',
    'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
document.addEventListener('DOMContentLoaded', function () {
    fetchRecipes();
    fetchFeaturedRecipe();
});
document.getElementById('saved-recipes').addEventListener('click', function(event){
    const clickedElement = event.target;
    if(clickedElement.classList.contains('recipe')){
        const savedRecipesList = document.getElementById('saved-recipes');
        savedRecipesList.appendChild(clickedElement);
    }
});

document.getElementById('favorite-recipes').addEventListener('click',function (event){
    const clickedElement = event.target;
    if(clickedElement.classList.contains('recipe')){
        const savedRecipesList = document.getElementById('saved-recipes');
        savedRecipesList.appendChild(clickedElement);
    }
});

document.getElementById('recipes').addEventListener('change',function(event){
    const selectedOption = event.target.value;
    console.log('selectedOption');
});

document.getElementById('search-form').addEventListener('submit', function (event){
    event.preventDefault();
    const searchInput = document.getEventListener('search-input').value;
    console.log('Search input:', searchInput);
})
function fetchRecipes() {
    fetch('url')
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipes')

            recipeList.innerHTML = '';
            data.forEach(recipe => {
                const listItem = document.createElement('li');
                listItem.classList.add('recipe', 'item');
                listItem.textContent = recipe.title;
                recipeList.appendChild(listItem);
            })
        })
        .catch(error => {
            console.log('Error fetching recipes', error);
        })
}
function fetchFeaturedRecipe() {
    fetch('url/featured-recipe')
        .then(response => response.json())
        .then(data => {
            const featuredRecipe = document.getElementById('featured-recipe');
            featuredRecipe.querySelector('h4').textContent = data.title;
            featuredRecipe.querySelector('p').textContent = data.description;
            featuredRecipe.querySelector('img').setAttribute('src', data.image);
            featuredRecipe.querySelector('img').setAttribute('alt', 'Recipe Image');
        })
        .catch(error => {
            console.log('Error fetching featured recipe:', error);
        });
}


fetchRecipes();

fetchFeaturedRecipe();