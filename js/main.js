"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Moa Karlsson
 */

const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const recipeSection = document.querySelector("#recipe");


//Eventlyssnare

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipeSearched = searchInput.value;

    getRecipeInfo(recipeSearched);
})
