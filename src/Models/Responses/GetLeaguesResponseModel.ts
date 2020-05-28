import { League } from '../League';
import { ListResponseBase } from "./ListResponseBase";

export interface GetLeaguesResponseModel extends ListResponseBase {
    leagues: League[]
}
