import { ListResponseBase } from './ListResponseBase';
import { Country } from '../Country';

export interface GetCountriesResponseModel extends ListResponseBase{
    countries: Country[]
}
