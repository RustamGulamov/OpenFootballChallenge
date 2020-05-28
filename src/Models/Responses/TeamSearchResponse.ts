import { Team } from '../Team';
import { ListResponseBase } from './ListResponseBase';

export interface TeamSearchResponse extends ListResponseBase {
    teams: Team[];
}
