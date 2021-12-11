import createApi from "./api.js";

const api = createApi();
export const login = api.login.bind(api);
export const logout = api.logout.bind(api);
export const register = api.register.bind(api);

const endpoints = {
    ALBUMS: 'data/albums',
    ALBUM_BY_ID: 'data/albums/'
}

export async function getAlbums(isSearch = false, query) {
    let url = endpoints.ALBUMS;
    if (isSearch) {
        url += encodeURI(`?where=name LIKE "${query}"`);
    } else {
        url += encodeURI('?sortBy=_createdOn desc&distinct=name');
    }
    return await api.get(url);
}

export async function createAlbum(data) {
    return await api.post(endpoints.ALBUMS, data);
}

export async function getAlbumById(id) {
    return await api.get(endpoints.ALBUM_BY_ID + id);
}

export async function editAlbumById(id, data) {
    return await api.put(endpoints.ALBUM_BY_ID + id, data);
}

export async function deleteAlbumById(id) {
    return await api.delete(endpoints.ALBUM_BY_ID + id);
}