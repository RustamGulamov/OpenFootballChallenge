import { HttpClientApi } from './HttpClientApi';
import { Country, GetCountriesResponseModel, HttpResponse } from '../Models';

export class CountryService {
    private static readonly client = new HttpClientApi();

    public static async GetAll(): Promise<Country[]> {
        const url = 'countries';

        const result = await this.client.get<HttpResponse<GetCountriesResponseModel>>(url);
        return result.api.countries;
    }
}
