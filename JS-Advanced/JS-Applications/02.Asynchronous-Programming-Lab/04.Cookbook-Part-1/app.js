window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    main.textContent = '';

    let recipes = await getRecipes();
    let previews = recipes.map(createRecipePreview);

    previews.forEach(preview => main.appendChild(preview));
});

async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const recipes = await response.json();
    return Object.values(recipes);
}

function createRecipePreview(recipe) {
    const article = createElement('article', {className: 'preview', onclick: toggleArticle},
        createElement('div', {className: 'title'}, createElement('h2', {}, recipe.name)),
        createElement('div', {className: 'small'}, createElement('img', {src: recipe.img, alt: recipe.name})));

    return article;

    async function toggleArticle() {
        let response = await fetch(` http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`);
        const data = await response.json();
        article.replaceWith(createDetailedRecipe(data))
    }
}

function createIngredientsList(ingredients) {
    const ingredientElements = [];
    for (const ingredient of ingredients) {
        ingredientElements.push(createElement('li', {}, ingredient));
    }
    return ingredientElements;
}

function createPreparationList(steps) {
    let stepsList = [];
    for (const step of steps) {
        stepsList.push(createElement('p', {}, step));
    }
    return stepsList;
}

function createDetailedRecipe(recipe) {
    return createElement('article', createElement('h2', {}, recipe.name),
        createElement('div', {className: 'band'},
            createElement('div', {className: 'thumb'},
                createElement('img', {src: recipe.img, alt: recipe.name})),
            createElement('div', {className: 'ingredients'}, createElement('h3', {}, 'Ingredients:'),
                createElement('ul', {}, ...createIngredientsList(recipe.ingredients)))),
        createElement('div', {className: 'description'},
            createElement('h3', {}, 'Preparation:'), ...createPreparationList(recipe.steps)));
}

function createElement(type, attributes, ...content) {
    let element = document.createElement(type);
    for (const [attribute, value] of Object.entries(attributes)) {
        if (attribute.startsWith('on')) {
            element.addEventListener(attribute.substring(2), value);
        } else {
            element[attribute] = value;
        }
    }
    content.forEach(c => {
        if (typeof (c) === 'string' || typeof (c) === 'number') {
            element.textContent = c;
        } else {
            element.appendChild(c);
        }
    });
    return element;
}