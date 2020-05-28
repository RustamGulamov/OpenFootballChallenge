import { HttpClientApi } from './HttpClientApi';
import { GetLeaguesResponseModel, HttpResponse, League } from '../Models';

export class LeagueService {
    private static readonly client = new HttpClientApi();

    public static async GetByTeam(teamId: number): Promise<League[]> {
        const url = `leagues/team/${teamId}`;

        const result =
            await this.client.get<HttpResponse<GetLeaguesResponseModel>>(url);
        return result.api.leagues;
    }
}
