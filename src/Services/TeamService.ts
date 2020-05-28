import { HttpClientApi } from './HttpClientApi';
import { HttpResponse, Team, TeamSearchResponse } from '../Models';

export class TeamService {
    private static readonly client = new HttpClientApi();

    public static async Search(country: string): Promise<Team[]> {
        const url = `teams/search/${country}`;

        const result =
            await this.client.get<HttpResponse<TeamSearchResponse>>(url);
        return result.api.teams;
    }
}
