// Ensure that the content is loaded after the DOM is fully ready
document.addEventListener("DOMContentLoaded", function () {
    const recipeList = document.getElementById('recipe-list');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Display list of recipes with photos and titles
    recipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            ${recipe.photo ? `<img src="${recipe.photo}" alt="${recipe.title}" class="recipe-thumbnail" style="max-width: 200px; height: auto;">` : ''}
            <h3 class="recipe-title" onclick="viewRecipeDetails(${index})">${recipe.title}</h3>
        `;
        recipeList.appendChild(recipeItem);
    });
});

// Function to display recipe details when clicked
function viewRecipeDetails(recipeIndex) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[recipeIndex];

    if (recipe) {
        document.getElementById('my-recipes-container').style.display = 'none';
        const detailContainer = document.getElementById('recipe-detail-container');
        detailContainer.style.display = 'block';

        document.getElementById('recipe-title').innerText = recipe.title;
        document.getElementById('recipe-description').innerText = recipe.description;
        document.getElementById('recipe-ingredients').innerText = recipe.ingredients.join(", ");
        document.getElementById('recipe-instructions').innerText = recipe.instructions.join("\n");

        // Display recipe photo if available
        const recipePhoto = document.getElementById('recipe-photo');
        if (recipe.photo) {
            recipePhoto.src = recipe.photo;
            recipePhoto.style.display = 'block';
        } else {
            recipePhoto.style.display = 'none';
        }

        // Set up delete button
        const deleteButton = document.getElementById('delete-recipe');
        deleteButton.onclick = function () {
            deleteRecipe(recipeIndex);
        };

        // Set up modify button
        const modifyButton = document.getElementById('modify-recipe');
        modifyButton.onclick = function () {
            modifyRecipe(recipeIndex);
        };
    }
}

// Function to delete a recipe
function deleteRecipe(recipeIndex) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(recipeIndex, 1); // Remove the recipe from the array
    localStorage.setItem('recipes', JSON.stringify(recipes)); // Update localStorage
    alert("Recipe deleted successfully!");
    window.location.reload(); // Refresh the page to update the list
}

// Function to modify a recipe
function modifyRecipe(recipeIndex) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[recipeIndex];

    if (recipe) {
        // Create a form to modify the recipe
        const formHTML = `
            <h3>Modify Recipe</h3>
            <label for="title">Title:</label>
            <input type="text" id="edit-title" value="${recipe.title}"><br>
            
            <label for="description">Description:</label>
            <textarea id="edit-description">${recipe.description}</textarea><br>

            <label for="ingredients">Ingredients:</label>
            <textarea id="edit-ingredients">${recipe.ingredients.join(", ")}</textarea><br>

            <label for="instructions">Instructions:</label>
            <textarea id="edit-instructions">${recipe.instructions.join("\n")}</textarea><br>

            <label for="photo">Photo URL:</label>
            <input type="text" id="edit-photo" value="${recipe.photo || ''}"><br>

            <button onclick="saveModifiedRecipe(${recipeIndex})">Save</button>
            <button onclick="goBackToList()">Cancel</button>
        `;
        
        const detailContainer = document.getElementById('recipe-detail-container');
        detailContainer.innerHTML = formHTML;
    }
}

// Function to save the modified recipe
function saveModifiedRecipe(recipeIndex) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Get modified values from the form
    const modifiedRecipe = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        ingredients: document.getElementById('edit-ingredients').value.split(",").map(item => item.trim()),
        instructions: document.getElementById('edit-instructions').value.split("\n").map(item => item.trim()),
        photo: document.getElementById('edit-photo').value
    };

    // Update the recipe
    recipes[recipeIndex] = modifiedRecipe;
    localStorage.setItem('recipes', JSON.stringify(recipes)); // Update localStorage
    alert("Recipe updated successfully!");
    window.location.reload(); // Refresh the page to update the list
}

// Function to go back to recipe list
function goBackToList() {
    document.getElementById('my-recipes-container').style.display = 'block';
    document.getElementById('recipe-detail-container').style.display = 'none';
}
