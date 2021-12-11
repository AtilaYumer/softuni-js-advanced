import { showHome } from "./home.js";

export async function logout() {
    try {
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3030/users/logout', {
            headers: { 'X-Authorization': token }
        });
        if (response.ok) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('userId');
            showHome();
        }
    } catch (e) {
        alert(e.message);
    }
}