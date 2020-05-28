import React, { FC, useEffect, useState } from 'react';
import { Country, Team } from '../../Models';
import { TeamService} from '../../Services';
import TextField from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from  './TeamSelectField.module.scss';

interface TeamSelectFieldProps {
    onSelect: (team: Team | null) => void;
    country?: Country;
}

export const TeamSelectField: FC<TeamSelectFieldProps> = ({ onSelect, country }: TeamSelectFieldProps) =>
{
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (country) {
            setInputValue('');
            const countryName = country.country; // Because object country has field country :)

            onSelect(null);
            setLoading(true);

            TeamService
                .Search(countryName)
                .then(result => {
                    setTeams(result.filter(t => t.country === countryName))
                })
                .finally(() => setLoading(false));
        }
    }, [country, onSelect]);

    return (
        <Autocomplete
            id="team-select"
            className={styles.select}
            options={teams}
            classes={{
                option: styles.option
            }}
            loading={loading}
            autoHighlight
            inputValue={inputValue}
            onChange={(event, value) => {
                setInputValue(value ? value.name : '')
                onSelect(value)
            }}
            getOptionLabel={(option: Team) => option.name}
            renderOption={(option: Team) => (
                <>
                    <img src={option.logo} alt="team logo" />
                    <span>{option.name}</span>
                </>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a team"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                { loading && <CircularProgress color="inherit" size={20} /> }
                                { params.InputProps.endAdornment }
                            </>
                        )
                    }}
                />
            )}
        />
    );
};
