"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Karlsson
 */

const form = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");


// Hämta data från API
async function getRecipe(searchInput) {
    try {
        const response = await fetch(`'https://dummyjson.com/recipes'${searchInput}`)
        if (!response.ok) {
            throw new Error("Fel")
        }
        const data = await response.json()
        return data;
    } catch (error) {

    }

}
getRecipe();


//Eventlyssnare

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipeSearched = searchInput.value;

    getRecipeInfo(recipeSearched);
})
