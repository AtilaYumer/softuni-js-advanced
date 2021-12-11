export function getUserInfo() {
    return {
        accessToken: sessionStorage.getItem('accessToken'),
        userId: sessionStorage.getItem('userId'),
        username: sessionStorage.getItem('username')
    }
}   