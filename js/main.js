"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Karlsson
 */


const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");
const errorMessage = document.querySelector("#error");
const message = document.querySelector("#message");

// Hämta data från API
async function getRecipe(searchInput) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchInput}`);
        if (!response.ok) {
            throw new Error("Det blev något fel, försök igen");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }

}

// Visa recept på sidan

async function showRecipe(event) {
    event.preventDefault();

    // Validering av sökfältet
    errorMessage.textContent = "";
    const text = searchInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Ange ett recept";
        return;
    }
    // Rensa tidigare felmeddelande och recept
    message.textContent = "";
    recipeSection.innerHTML = "";

    const data = await getRecipe(text);

    // Validering vid API-anrop
    if (!data) {
        message.textContent = "Det gick inte att hämta receptet. Försök igen";
        return;
    }

    if (data.recipes.length === 0) {
        recipeSection.innerHTML = "";
        message.textContent = "Inget recept kunde hittas, försök igen";
        return;
    }

    // Skriv ut receptet
    recipeSection.innerHTML = "";
    const recipe = data.recipes[0];
    recipeSection.innerHTML += `
        <h3> Recipe: ${recipe.name} </h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p> Servings: ${recipe.servings} </p>
            <p> Prep time: ${recipe.prepTimeMinutes} minutes</p>
            <p> Cooking time: ${recipe.cookTimeMinutes} minutes </p>
            <p> Difficulty: ${recipe.difficulty} </p>
        
        <h4>Ingredients</h4>
        <ul> 
        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
        <h4>Instructions</h4>
        <ol>
        ${recipe.instructions.map(instructions => `<li>${instructions}</li>`).join("")}
        </ol>
        `;
}

//Eventlyssnare

searchForm.addEventListener("submit", showRecipe);