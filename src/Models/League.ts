export interface League {
    league_id: number;
    name: string;
    type: string;
    country: string,
    country_code?: string,
    season: number,
    season_start: Date,
    season_end: Date,
    logo: string,
}
