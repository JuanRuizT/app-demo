import axios from 'axios';

export const backentApi = axios.create({
	baseURL: 'https://c80xzmth6i.execute-api.us-east-2.amazonaws.com/dev'
});
