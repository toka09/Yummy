let rowData = document.getElementById("rowData");
let searchSection = document.getElementById("searchSection");
let submitBtn;
// For Initializing
$(document).ready(() => {
    searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    });
});
// Open Navbar
function openNavbar() {
    $(".horizontal-nav").animate(
    {
        left: 0,
    },
    500
    );
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
    $(".links li")
        .eq(i)
        .animate(
        {
            top: 0,
        },
        (i + 5) * 100
        );
    }
}
// Close Navbar
function closeNavbar() {
    let width = $(".horizontal-nav .link-nav").outerWidth();
    $(".horizontal-nav").animate(
    {
        left: -width,
    },
    500
    );
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate(
    {
        top: 300,
    },
    500
    );
}
closeNavbar();
$(".horizontal-nav i.open-close-icon").click(() => {
    if ($(".horizontal-nav").css("left") == "0px") {
    closeNavbar();
    } else {
    openNavbar();
    }
});
// Display Meals For Landing Section
function displayMeals(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
    }
    rowData.innerHTML = box;
}
// For Search Section
// 1. Displaying Search Form 
function displaySearchForm() {
    searchSection.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
    rowData.innerHTML = "";
}
// 2. Search By Name
async function searchByName(term) {
    closeNavbar();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}
// 3. Search By First Letter
async function searchByFirstLetter(term) {
    closeNavbar();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    term == "" ? (term = "a") : "";
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
}

// For Category Section
// 1. Get Category From API
async function getCategory() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchSection.innerHTML = "";
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    response = await response.json();
    displayCategories(response.categories);
    $(".inner-loading-screen").fadeOut(300);
}
// 2. Display all Categories
function displayCategories(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                    data[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                        data[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
    }
    rowData.innerHTML = box;
}
// For Area Section
// 1. Get Areas From API
async function getArea() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchSection.innerHTML = "";
    let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    respone = await respone.json();
    console.log(respone.meals);
    displayArea(respone.meals);
    $(".inner-loading-screen").fadeOut(300);
}
// 2. Display Areas
function displayArea(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `;
    }
    rowData.innerHTML = box;
}
// For Ingredients Section
// 1. Get Ingredients From API
async function getIngredient() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchSection.innerHTML = "";
    let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    respone = await respone.json();
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
// 2. Display Ingredients
function displayIngredients(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getIngredientMeals('${
                    data[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}</p>
                </div>
        </div>
        `;
    }
    rowData.innerHTML = box;
}

// For Meals Section
// Get Meals For Categories From API
async function getCategoryMeals(catId) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
// Get Meals For Areas From API
async function getAreaMeals(areaId) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
// Get Meals For Ingredients From API
async function getIngredientMeals(ingId) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingId}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
}
// Get Meals Details From API
async function getDetails(mealId) {
    closeNavbar();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchSection.innerHTML = "";
    let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    respone = await respone.json();
    displayDetails(respone.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
}
// Display Meals Details
function displayDetails(meal) {
    searchSection.innerHTML = "";
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
            meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }
    let box = `
        <div class="col-md-4">
        <i id="goBackButton" class="fa-solid open-close-icon fa-x fa-2x"></i>
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="">
                        <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`;
    rowData.innerHTML = box;
}
// Meals JS Ends
// For Contact Section
function displayContactForm() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameSignup" onkeyup="validate()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameRule" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed!!
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailSignup" onkeyup="validate()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailRule" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz* !!
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneSignup" onkeyup="validate()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneRule" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number!!
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageSignup" onkeyup="validate()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageRule" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age!!
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passSignup" onkeyup="validate()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passRule" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:* !!
                </div>
            </div>
            <div class="col-md-6">
                <input  id="rePassSignup" onkeyup="validate()" type="password" class="form-control " placeholder="Please Re-enter Your Password">
                <div id="rePassRule" class="alert alert-danger w-100 mt-2 d-none">
                    Passwords don't match!! 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
    submitBtn = document.getElementById("submitBtn");
    document.getElementById("nameSignup").addEventListener("focus", () => {
    nameSelected = true;
    });
    document.getElementById("emailSignup").addEventListener("focus", () => {
    emailSelected = true;
    });
    document.getElementById("phoneSignup").addEventListener("focus", () => {
    phoneSelected = true;
    });
    document.getElementById("ageSignup").addEventListener("focus", () => {
    ageSelected = true;
    });
    document.getElementById("passSignup").addEventListener("focus", () => {
    passSelected = true;
    });
    document.getElementById("rePassSignup").addEventListener("focus", () => {
    rePassSelected = true;
    });
}
// Initial Values Before Validating
let nameSelected = false;
let emailSelected = false;
let phoneSelected = false;
let ageSelected = false;
let passSelected = false;
let rePassSelected = false;
// Validate User's Data
function validate() {
    if (nameSelected) {
    if (nameValidation()) {
        document
        .getElementById("nameRule")
        .classList.replace("d-block", "d-none");
    } else {
        document
        .getElementById("nameRule")
        .classList.replace("d-none", "d-block");
    }
    }
    if (emailSelected) {
    if (emailValidation()) {
        document
        .getElementById("emailRule")
        .classList.replace("d-block", "d-none");
    } else {
        document
        .getElementById("emailRule")
        .classList.replace("d-none", "d-block");
    }
    }
    if (phoneSelected) {
    if (phoneValidation()) {
        document
        .getElementById("phoneRule")
        .classList.replace("d-block", "d-none");
    } else {
        document
        .getElementById("phoneRule")
        .classList.replace("d-none", "d-block");
    }
    }
    if (ageSelected) {
    if (ageValidation()) {
        document.getElementById("ageRule").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("ageRule").classList.replace("d-none", "d-block");
    }
    }
    if (passSelected) {
    if (passValidation()) {
        document
        .getElementById("passRule")
        .classList.replace("d-block", "d-none");
    } else {
        document
        .getElementById("passRule")
        .classList.replace("d-none", "d-block");
    }
    }
    if (rePassSelected) {
    if (rePassValidation()) {
        document
        .getElementById("rePassRule")
        .classList.replace("d-block", "d-none");
    } else {
        document
        .getElementById("rePassRule")
        .classList.replace("d-none", "d-block");
    }
    }
    if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passValidation() &&
    rePassValidation()
    ) {
    submitBtn.removeAttribute("disabled");
    } else {
    submitBtn.setAttribute("disabled", true);
    }
}
// Regex Rules
function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameSignup").value);
}
function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailSignup").value
    );
}
function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneSignup").value
    );
}
function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageSignup").value
    );
}
function passValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passSignup").value
    );
}
function rePassValidation() {
    return (
    document.getElementById("rePassSignup").value ==
    document.getElementById("passSignup").value
    );
}