import { GET_LIST, GET_ONE } from 'admin-on-rest';
import axios from 'axios';

export const apiClient = (apiUrl, httpClient = axios) => {
	const convertRESTRequestsToHTTP = (type, resource, params) => {
		const options = {};
		switch (type) {
			case GET_LIST:
				const { page, perPage } = params.pagination;
				const { field, order } = params.sort;
				options.method = 'get';
				options.baseURL = apiUrl;
				options.url = `/${resource}`;
				options.params = {
					...params.filter,
					_sort: field,
					_order: order,
					_start: (page - 1) * perPage,
					_end: (page * perPage) - 1,
				};
				break;
			case GET_ONE:
				options.method = 'get';
				options.baseURL = apiUrl;
				options.url = `/${resource}/${params.id}`
				break;
			default:
				throw new Error(`Unsupported fetch action ${type}`);
		}
		return { options };
	}

	const convertHTTPResponseToREST = (response, type, resource, params) => {
		const { header, data } = response;
		switch (type) {
			case GET_LIST:
				const res = { data: data.data, total: data.total };
				console.log(res);
				return res;
			default:
				return { data: data }
		}
	}

	return (type, resource, params) => {
		const { options } = convertRESTRequestsToHTTP(type, resource, params);
		return httpClient(options)
			.then(response => convertHTTPResponseToREST(response, type, resource, params));
	}
}
