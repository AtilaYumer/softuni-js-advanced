import createApi from "./api.js";

const api = createApi();

export async function getRecipes() {
    return await api.get('http://localhost:3030/data/recipes?select=' + encodeURIComponent('_id,name,img'));
}

export async function createRecipe(body) {
    return api.post('http://localhost:3030/data/recipes', body);
}

export async function getRecipeById(id) {
    return await api.get('http://localhost:3030/data/recipes/' + id);
}

export async function deleteRecipeById(id) {
    return await api.delete('http://localhost:3030/data/recipes/' + id);
}

export async function updateRecipeById(id, body) {
    return await api.put('http://localhost:3030/data/recipes/' + id, body);
}

export async function login(email, password) {
    const data = await api.post('http://localhost:3030/users/login', {
        email,
        password
    });
    sessionStorage.setItem('authToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
}

export async function register(email, password) {
    const data = await api.post('http://localhost:3030/users/register', {
        email,
        password
    });
    sessionStorage.setItem('authToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
}

export async function logout() {
    await api.get('http://localhost:3030/users/logout');
    sessionStorage.removeItem('authToken');
}