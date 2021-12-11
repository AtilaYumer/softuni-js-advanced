export default function createApi() {
    const endpoints = {
        USER_DETAILS: 'users/me',
        REGISTER: 'users/register',
        LOGIN: 'users/login',
        LOGOUT: 'users/logout'
    };

    return {
        async get(endpoint) {
            return request(host(endpoint), getOptions());
        },

        async post(endpoint, body) {
            const options = getOptions({'Content-Type': 'application/json'});
            options.method = 'POST';
            options.body = JSON.stringify(body);

            return request(host(endpoint), options);
        },

        async put(endpoint, body) {
            const options = getOptions({'Content-Type': 'application/json'});
            options.method = 'PUT';
            options.body = JSON.stringify(body);

            return request(host(endpoint), options);
        },

        async delete(endpoint) {
            const options = getOptions();
            options.method = 'DELETE';

            return request(host(endpoint), options);
        },

        async register(email, password) {
            const result = await this.post(endpoints.REGISTER, {
                email,
                password
            });

            sessionStorage.setItem('accessToken', result['accessToken']);
            sessionStorage.setItem('email', result.email);
            sessionStorage.setItem('userId', result._id);
            sessionStorage.setItem('gender', result.gender);
            sessionStorage.setItem('username', result.username);

            return result;
        },

        async login(email, password) {
            const result = await this.post(endpoints.LOGIN, {
                email,
                password
            });

            sessionStorage.setItem('accessToken', result['accessToken']);
            sessionStorage.setItem('email', result.email);
            sessionStorage.setItem('userId', result._id);
            sessionStorage.setItem('gender', result.gender);
            sessionStorage.setItem('username', result.username);

            return result;
        },

        async logout() {
            const result = await this.get(endpoints.LOGOUT);
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('gender');
            sessionStorage.removeItem('username');
            return result;
        },

        async getUserDetails() {
            return await this.get(endpoints.USER_DETAILS);
        }
    };

    function host(endpoint) {
        return `http://localhost:3030/${endpoint}`;
    }

    function getOptions(headers) {
        const token = sessionStorage.getItem('accessToken');

        const options = {headers: headers || {}};

        if (token !== null) {
            Object.assign(options.headers, {'X-Authorization': token});
        }

        return options;
    }

    async function request(endpoint, options) {
        let response;

        try {
            response = await fetch(endpoint, options);

            if (response.status === 200) {
                return await response.json();
            } else if (response.status === 204) {
                return response;
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (err) {
            if (err instanceof SyntaxError) {
                return response;
            } else if (err.message === 'Invalid access token') {
                console.log('Invalid session, resetting storage');
                sessionStorage.clear();
                window.location.pathname = '/';
            } else {
                throw err;
            }
        }
    }
};