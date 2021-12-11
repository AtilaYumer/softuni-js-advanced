export default function createApi() {

    const HOST = 'http://127.0.0.1:3030'

    async function request(url, options) {
        try {
            const response = await fetch(HOST + url, options);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            if (response.status === 200) {
                return await response.json();
            } else {
                return response;
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    function getOptions(headers) {
        const token = sessionStorage.getItem('userToken');

        const options = {headers: headers || {}};

        if (token) {
            Object.assign(options.headers, {'X-Authorization': token});
        }
        return options;
    }

    return {
        async get(url) {
            return await request(url, getOptions());
        },

        async post(url, body) {
            const options = getOptions({'Content-Type': 'application/json'});
            options.method = 'post';
            options.body = JSON.stringify(body)

            return request(url, options);
        },

        async put(url, payload) {
            const options = getOptions({'Content-Type': 'application/json'});
            options.method = 'put';
            options.body = payload

            return request(url, options);
        },

        async delete(url) {
            const options = getOptions();
            options.method = 'delete';

            return request(url, options);
        }
    }
}