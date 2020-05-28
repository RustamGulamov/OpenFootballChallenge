import React, { FC, useEffect, useState } from 'react';
import './App.scss';
import { Country, League, Team } from './Models';
import { LeagueService } from './Services';
import { LeaguesTable } from './Components/LeaguesTable';
import { CountrySelectField } from './Components/CountrySelectField';
import { TeamSelectField } from './Components/TeamSelectField';
import './App.scss';
import { CircularProgress } from "@material-ui/core";

export const App: FC = () => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [country, setCountry] = useState<Country | undefined>(undefined);
    const [team, setTeam] = useState<Team | null>(null);
    const [visibleSpinner, setVisibleSpinner] = useState<boolean>(false);

    useEffect(() => {
        setLeagues([]);
    }, [country])

    useEffect(() => {
        if (team) {
            setVisibleSpinner(true);

            LeagueService
                .GetByTeam(team.team_id)
                .then(setLeagues)
                .finally(() => {
                    setVisibleSpinner(false);
                })
        }
    }, [team])

    return (
        <div className="App">
            <div className="select-blocks">
                <CountrySelectField onSelect={setCountry} />
                <TeamSelectField onSelect={setTeam} country={country} />
            </div>
            {
                country && team &&
                    <>
                        <b className="title-block">
                            All leagues in which the { team.name } ({ country.country }) has played at least one match.
                        </b>
                        {
                            visibleSpinner
                                ? <CircularProgress />
                                : <LeaguesTable leagues={leagues} />
                        }
                    </>
            }
        </div>
    );
    };
