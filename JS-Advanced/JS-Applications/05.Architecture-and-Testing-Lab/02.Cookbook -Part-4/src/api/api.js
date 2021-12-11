export default function createApi() {

    return {
        async get(endpoint) {
            return await this.request(endpoint, this.getOptions());
        },

        async post(endpoint, body) {
            const options = this.getOptions({'Content-Type': 'application/json'});
            options.method = 'post';
            options.body = JSON.stringify(body)

            return await this.request(endpoint, options);
        },

        async put(endpoint, body) {
            const options = this.getOptions({'Content-Type': 'application/json'});
            options.method = 'put';
            options.body = JSON.stringify(body)

            return await this.request(endpoint, options);
        },

        async delete(endpoint) {
            const options = this.getOptions();
            options.method = 'delete';

            return this.request(endpoint, options);
        },

        getOptions(headers) {
            const token = sessionStorage.getItem('authToken');

            const options = {headers: headers || {}};
            if (token) {
                Object.assign(options.headers, {'X-Authorization': token})
            }
            return options;
        },

        async request(endpoint, options) {
            const response = await fetch(endpoint, options);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        }
    }
}