import axios from 'axios';
import {
	GET_LIST,
	GET_ONE,
	GET_MANY,
	GET_MANY_REFERENCE,
	CREATE,
	UPDATE,
	DELETE,
} from 'admin-on-rest';

export const apiClient = (apiUrl, httpClient = axios) => {
	const convertRESTRequestToHTTP = (type, resource, params) => {
		console.log('Type: ', type, 'Resource: ', resource, 'Params: ', params);
		const options = {};
		switch (type) {
			case GET_LIST: {
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				const query = {
					sort: JSON.stringify([field, order]),
					range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
					filter: JSON.stringify(params.filter),
				};

				options.method = 'get';
				options.url = `${apiUrl}/${resource}?${queryParameters(query)}`;
				break;
			}
			case GET_ONE:
				options.method = 'get';
				options.url = `${apiUrl}/${resource}/${params.id}`;
				break;
			case GET_MANY: {
				const query = {
					filter: JSON.stringify({ id: params.ids }),
				};
				options.method = 'get';
				options.url = `${apiUrl}/${resource}?${queryParameters(query)}`;
				break;
			}
			case GET_MANY_REFERENCE: {
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				const query = {
					sort: JSON.stringify([field, order]),
					range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
					filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
				};
				options.method = 'get';
				options.url = `${apiUrl}/${resource}?${queryParameters(query)}`;
				break;
			}
			case UPDATE:
				options.method = 'PUT';
				options.url = `${apiUrl}/${resource}/${params.id}`;
				options.data = params.data;
				break;
			case CREATE:
				console.log(params);
				options.method = 'POST';
				options.url = `${apiUrl}/${resource}`;
				options.data = params.data;
				break;
			case DELETE:
				options.method = 'DELETE';
				options.url = `${apiUrl}/${resource}/${params.id}`;
				break;
			default:
				throw new Error(`Unsupported fetch action type ${type}`);
		}
		return { options };
	};

	const convertHTTPResponseToREST = (response, type, resource, params) => {
		const { headers, data } = response;
		switch (type) {
			case GET_LIST:
			case GET_MANY_REFERENCE:
				if (!Object.keys(headers).some(key => key === 'content-range')) {
					throw new Error('The Content-Range header is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?');
				}
				return {
					data: data,
					total: parseInt(headers['content-range'].split('/').pop(), 10),
				};
			case CREATE:
				return { data: { ...params.data, id: data.id } };
			default:
				return { data: data };
		}
	};

	/**
	 * @param {string} type Request type, e.g GET_LIST
	 * @param {string} resource Resource name, e.g. "posts"
	 * @param {Object} payload Request parameters. Depends on the request type
	 * @returns {Promise} the Promise for a REST response
	 */
	return (type, resource, params) => {
		const { options } = convertRESTRequestToHTTP(type, resource, params);
		return httpClient(options)
			.then(response => {
				const result = convertHTTPResponseToREST(response, type, resource, params);
				console.log(result);
				return result;
			});
	};
};

export const queryParameters = data => Object.keys(data)
	.map(key => [key, data[key]].map(encodeURIComponent).join('='))
	.join('&');
