"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Karlsson
 */

const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");

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
    const data = await getRecipe(inputEl.value)

    if (!data) {
        recipeSection.innerHTML = `Kunde inte hämta receptet`
    }

    if (data.recipes.length === 0) {
        recipeSection.innerHTML = `Inget recept hittades, försök igen`
    }

    data.recipes.forEach(recipe => {
        recipeSection.innerHTML = += `
        <li>
        <h2> Receptets namn: ${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">`
    });
}

//Eventlyssnare

searchForm.addEventListener("submit", (showRecipe) => {
    const recipeSearched = searchInput.value;

    getRecipe(recipeSearched);
})
