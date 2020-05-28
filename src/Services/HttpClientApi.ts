import axios, { AxiosRequestConfig } from 'axios';

export class HttpClientApi {
    private readonly client = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: {
            "x-rapidapi-host": process.env.REACT_APP_HOST,
            "x-rapidapi-key": process.env.REACT_APP_API_KEY
        }
    });

    public async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.client.get<TResponse>(url, config);
        return response.data;
    }
}
