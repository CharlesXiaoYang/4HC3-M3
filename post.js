document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    confirmPost();
});

function addIngredient() {
    const ingredientsList = document.getElementById('ingredientsList');

    // Create a container for ingredient and quantity
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'ingredient-container';

    // Create ingredient input
    const ingredientInput = document.createElement('input');
    ingredientInput.type = 'text';
    ingredientInput.placeholder = 'Ingredient';
    ingredientInput.className = 'ingredient-input';

    // Create quantity input
    const quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.placeholder = 'Quantity';
    quantityInput.className = 'quantity-input';

    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove ingredient';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => {
        if (confirm('Are you sure you want to remove this item?')) {
            ingredientContainer.remove();
        }
    };
    // Append inputs and button to container
    ingredientContainer.appendChild(ingredientInput);
    ingredientContainer.appendChild(quantityInput);
    ingredientContainer.appendChild(removeButton);

    // Add container to the ingredients list
    ingredientsList.appendChild(ingredientContainer);
}

function addInstruction() {
    const instructionsList = document.getElementById('instructionsList');

    // Create a div to hold the instruction textarea and remove button
    const instructionDiv = document.createElement('div');
    instructionDiv.className = 'instruction-item';

    // Instruction textarea
    const instructionInput = document.createElement('textarea');
    instructionInput.placeholder = 'Step-by-step instruction';

    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove instruction';
    removeButton.className = 'remove-button';
    removeButton.onclick = () => {
        if (confirm('Are you sure you want to remove this instruction?')) {
            instructionDiv.remove();
        }
    };

    // Append textarea and button to the instruction div
    instructionDiv.appendChild(instructionInput);
    instructionDiv.appendChild(removeButton);

    // Add the instruction div to the instructions list
    instructionsList.appendChild(instructionDiv); // Corrected element
}

function previewRecipe() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Collect ingredients
    const ingredients = Array.from(document.querySelectorAll('#ingredientsList .ingredient-container')).map(div => {
        const name = div.querySelector('.ingredient-input').value;
        const quantity = div.querySelector('.quantity-input').value;
        return `${name} - ${quantity}`;
    });

    // Collect instructions
    const instructions = Array.from(document.querySelectorAll('#instructionsList .instruction-item textarea')).map(textarea => textarea.value);
    
    const tags = document.getElementById('tags').value;
    

    // Populate preview section
    const photo = document.getElementById('photo').value;
    const previewContent = `
        <h4>${title}</h4>
        <p>${description}</p>
        <h5>Ingredients:</h5>
        <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
        <h5>Instructions:</h5>
        <ol>${instructions.map(ins => `<li>${ins}</li>`).join('')}</ol>
        <p><strong>Tags:</strong> ${tags}</p>
        <h5>Photo:</h5>
        <img src="${photo}" alt="Recipe Photo" width="200"/>
    `;
    document.getElementById('previewContent').innerHTML = previewContent;
    document.getElementById('recipeForm').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
}

function editRecipe() {
    document.getElementById('recipeForm').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
}

function saveRecipe(title, description, ingredients, instructions, tags, photo) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeData = {
        id: Date.now(),
        title,
        description,
        ingredients,
        instructions,
        tags,
        photo
    };
    recipes.push(recipeData);
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function confirmPost() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Collect ingredients
    const ingredients = Array.from(document.querySelectorAll('#ingredientsList .ingredient-container')).map(div => {
        const name = div.querySelector('.ingredient-input').value;
        const quantity = div.querySelector('.quantity-input').value;
        return `${name} - ${quantity}`;
    });

    // Collect instructions
    const instructions = Array.from(document.querySelectorAll('#instructionsList .instruction-item textarea')).map(textarea => textarea.value);

    const tags = document.getElementById('tags').value.split(","); // Split tags if entered as a comma-separated list

    // Get the photo input value
    const photo = document.getElementById('photo').value;

    // Call saveRecipe to save data to localStorage
    saveRecipe(title, description, ingredients, instructions, tags, photo);

    alert('Recipe published successfully!');
    window.location.reload();
}

// Display posted recipes in sidebar
document.addEventListener('DOMContentLoaded', function() {
    const recipesIcon = document.createElement('a');
    recipesIcon.href = "#postedRecipes";
    document.querySelector('.sidebar').appendChild(recipesIcon);

    recipesIcon.addEventListener('click', function() {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        alert('You have ' + recipes.length + ' recipes posted!');
    });
});