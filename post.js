document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    confirmPost(); // Call confirmPost after preventing the default action
});

function addIngredient() {
    // Create a container for each ingredient
    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add('ingredient-container');

    const ingredientInput = document.createElement('input');
    ingredientInput.type = 'text';
    ingredientInput.placeholder = 'Ingredient (e.g., Chocolate)';
    ingredientInput.style.width = '60%'; // Adjust ingredient input width as needed
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.placeholder = 'Quantity (e.g., 50g)';
    quantityInput.style.width = '40%'; // Set quantity input width smaller than ingredient
    
    // Optional: Add classes for consistent styling (if defined in CSS)
    ingredientInput.classList.add('ingredient-input');
    quantityInput.classList.add('quantity-input');

    // Create the remove button (trash icon)
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    
    const trashIcon = document.createElement('img');
    trashIcon.src = 'trash.png'; // Path to your trash icon image
    trashIcon.alt = 'Remove';
    trashIcon.style.width = '16px'; // Adjust the size
    trashIcon.style.height = 'auto';

    // Optional: Set the icon color by applying a filter (e.g., grayscale or black color)
    trashIcon.style.filter = 'none'; // Ensures no filter is applied to alter the color

    removeButton.appendChild(trashIcon);

    removeButton.onclick = () => {
        if (confirm('Are you sure you want to remove this Ingredient?')) {
            ingredientContainer.remove();
        }
    };

    // Optionally adjust button appearance to ensure it looks neutral (not red/green)
    removeButton.style.backgroundColor = 'transparent';
    removeButton.style.border = 'none';
    
    // Ensure the remove button is aligned to the right
    removeButton.style.marginLeft = 'auto';

    // Append the inputs and button to the ingredient container
    ingredientContainer.appendChild(ingredientInput);
    ingredientContainer.appendChild(quantityInput);
    ingredientContainer.appendChild(removeButton);

    // Append the ingredient container to the ingredients list
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.appendChild(ingredientContainer);
    updateAddButtonPosition();
}

// Function to create and manage the "Add Ingredient" button
function updateAddButtonPosition() {
    let addButton = document.getElementById('addIngredientButton');
    
    if (!addButton) {
        // Create the "Add Ingredient" button if it doesn't exist
        addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'addIngredientButton';

        const addIcon = document.createElement('img');
        addIcon.src = 'add.png'; // Path to your add icon image
        addIcon.alt = 'Add';
        addIcon.style.width = '16px';
        addIcon.style.height = 'auto';
        addIcon.style.marginRight = '5px'; // Space between icon and text

        addButton.style.display = 'flex';
        addButton.style.alignItems = 'center';
        addButton.style.gap = '5px'; // Space between image and text
        addButton.style.border = 'none';
        addButton.style.background = 'transparent';
        addButton.style.cursor = 'pointer';
        
        addButton.appendChild(addIcon);
        addButton.appendChild(document.createTextNode('Add Ingredient'));

        addButton.onclick = addIngredient;
    }
    
    // Append or move the button just below the last ingredient container
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.appendChild(addButton);
}

// Initial call to display the "Add Ingredient" button
//updateAddButtonPosition();


function addInstruction() {
    
    const instructionsList = document.getElementById('instructionsList');

    // Create a div to hold the instruction textarea and remove button
    const instructionDiv = document.createElement('div');
    instructionDiv.className = 'instruction-item';

    // Instruction textarea
    const instructionInput = document.createElement('textarea');
    instructionInput.placeholder = 'Step-by-step instructions (e.g., Break the chocolate into small pieces)';

    // Create the remove button (trash icon)
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    
    const trashIcon = document.createElement('img');
    trashIcon.src = 'trash.png'; // Path to your trash icon image
    trashIcon.alt = 'Remove';
    trashIcon.style.width = '16px'; // Adjust the size
    trashIcon.style.height = 'auto';
    
    // Optional: Set the icon color by applying a filter (e.g., grayscale or black color)
    trashIcon.style.filter = 'none'; // Ensures no filter is applied to alter the color

    removeButton.appendChild(trashIcon);

    removeButton.onclick = () => {
        if (confirm('Are you sure you want to remove this Instruction?')) {
            instructionDiv.remove();
        }
    };

    // Optionally adjust button appearance to ensure it looks neutral (not red/green)
    removeButton.style.backgroundColor = 'transparent';
    removeButton.style.border = 'none';
    
    // Append textarea and remove button to the instruction div
    instructionDiv.appendChild(instructionInput);
    instructionDiv.appendChild(removeButton);

    // Add the instruction div to the instructions list
    instructionsList.appendChild(instructionDiv);
    updateAddButtonPosition_instr();
}

// Function to create and manage the "Add Ingredient" button
function updateAddButtonPosition_instr() {
    let addButton = document.getElementById('addInstructionButton');
    
    if (!addButton) {
        // Create the "Add Ingredient" button if it doesn't exist
        addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'addInstructionButton';

        const addIcon = document.createElement('img');
        addIcon.src = 'add.png'; // Path to your add icon image
        addIcon.alt = 'Add';
        addIcon.style.width = '16px';
        addIcon.style.height = 'auto';
        addIcon.style.marginRight = '5px'; // Space between icon and text

        addButton.style.display = 'flex';
        addButton.style.alignItems = 'center';
        addButton.style.gap = '5px'; // Space between image and text
        addButton.style.border = 'none';
        addButton.style.background = 'transparent';
        addButton.style.cursor = 'pointer';
        
        addButton.appendChild(addIcon);
        addButton.appendChild(document.createTextNode('Add Instruction'));

        addButton.onclick = addInstruction;
    }
    
    // Append or move the button just below the last ingredient container
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.appendChild(addButton);
}

let photoDataURL = ""; // Variable to store the image data

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoDataURL = e.target.result; // Save Data URL
            document.getElementById('previewPhoto').src = photoDataURL; // Set preview image
        };
        reader.readAsDataURL(file); // Read file as Data URL
    }
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
        <img src="${photoDataURL}" alt="Recipe Photo" width="200" id="previewPhoto"/>
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
        photo: photoDataURL
    };
    recipes.push(recipeData);
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function confirmPost() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Collect ingredients
    const ingredients = Array.from(document.querySelectorAll('#ingredientsList .ingredient-container')).map(div => {
        const name = div.querySelector('input').value;
        const quantity = div.querySelectorAll('input')[1].value;
        return `${name} - ${quantity}`;
    });

    // Collect instructions
    const instructions = Array.from(document.querySelectorAll('#instructionsList .instruction-container')).map(div => {
        const instructionText = div.querySelector('textarea').value;
        return instructionText;
    });

    const tags = document.getElementById('tags').value.split(","); // Split tags if entered as a comma-separated list

    // Get the photo input value (use photo path for preview)
    const photo = document.getElementById('photo').value;

    // Call saveRecipe to save data to localStorage
    saveRecipe(title, description, ingredients, instructions, tags, photo);

    // Alert and refresh the page
    alert('Recipe published successfully!');
    window.location.href = 'my-recipes.html';
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