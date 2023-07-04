let url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=american"

// document.addEventListener("DOMContentLoaded", () => {
//     getRecipe();
//     recipeDetails();
// })

// const recipeItem = document.querySelector("recipe-item")
// const favoriteRecipes = document.getElementById('favorite-recipes')
// const savedRecipes = document.getElementById('saved-recipes');

// getRecipes();
// allRecipes()

// async function fetchRecipes(){ 
//     try{
//         const response = await fetch(url);
//         const data = await response.json;
        
//         return data;
//     }catch (error){
//             console.log('Error fetching recipes:', error);
//             return [];
//         }
//     }

//     function renderRecipeList(recipes){
//         const recipesList = document.getElementById('recipes');

//         recipesList.innerHTML = '';
//         recipes.forEach((recipe)=>{
//             const listItem = document.createElement('li');
//             listItem.textContent = recipe.name;

//             const saveIcon = document.createElement('i');
//             saveIcon.className = 'save-icon fas fa-bookmark';

//             listItem.appendChild(saveIcon);
//             recipesList.appendChild(listItem)
//         })
//     }