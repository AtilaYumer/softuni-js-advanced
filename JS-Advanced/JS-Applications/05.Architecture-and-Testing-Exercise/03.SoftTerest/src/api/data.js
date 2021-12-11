import createApi from "./api.js";

const api = createApi();

export async function register(email, password) {
    const response = await api.post('/users/register', {email, password});
    sessionStorage.setItem('userToken', response.accessToken);
    sessionStorage.setItem('userToken', response._id);
}

export async function logout() {
    await api.get('/users/logout');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
}

export async function login(email, password) {
    const response = await api.post('/users/login', {email, password});
    sessionStorage.setItem('userToken', response.accessToken);
    sessionStorage.setItem('userId', response._id);
}

export async function getRecentIdeas() {
    return await api.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
}

export async function getIdeaById(ideaId) {
    return await api.get(`/data/ideas/${ideaId}`);
}

export async function createIdea(title, description, img) {
    return await api.post('/data/ideas', {
        title, description, img
    });
}

export async function deleteIdeaById(ideaId) {
    return await api.delete(`/data/ideas/${ideaId}`);
}