import { GET_LIST, GET_ONE, DELETE } from 'admin-on-rest';
import axios from 'axios';

export const apiClient = (apiUrl, httpClient = axios) => {
	const convertRESTRequestsToHTTP = (type, resource, params) => {
		const options = {
			baseURL: apiUrl
		};
		switch (type) {
			case GET_LIST:
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				options.method = 'get';
				options.url = `/${resource}`;
				options.params = {
					...params.filter,
					...params.sort,
					...params.pagination
				};
				break;
			case GET_ONE:
				options.method = 'get';
				options.url = `/${resource}/${params.id}`;
				break;
			case DELETE:
				options.method = 'delete';
				options.url = `/${resource}/${params.id}`;
				break;
			default:
				throw new Error(`Unsupported api client action ${type}`);
		}
		return { options };
	}

	const convertHTTPResponseToREST = (response, type, resource, params) => {
		const { header, data } = response;
		switch (type) {
			case GET_LIST:
				console.log(data);
				return data;
			case DELETE:
				return data;
			default:
				return data;
		}
	}

	return (type, resource, params) => {
		const { options } = convertRESTRequestsToHTTP(type, resource, params);
		return httpClient(options)
			.then(response => convertHTTPResponseToREST(response, type, resource, params));
	}
}
