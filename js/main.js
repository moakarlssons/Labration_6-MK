"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Karlsson
 */

const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");
const inputEl = document.querySelector("#search");

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

    }

}

getRecipe();

// Visa recept på sidan

async function showRecipe(event) {
    event.preventDefault();
    const data = await getRecipe(inputEl.value)

    if (!data) {
        result.innerHTML = `Kunde inte hämta receptet`
    }

    if (data.recipe.lenght === 0) {
        result.innerHTML = `Inget recept hittades, försök igen`
    }

    data.recipe.forEach(recipe => {
        result.innerHTML = `<li>
        <h1> Receptets namn: ${recipe.name}</h1>
        <img src="${recipe.image}">`
    })
}

//Eventlyssnare

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipeSearched = searchInput.value;

    getRecipe(recipeSearched);
})
