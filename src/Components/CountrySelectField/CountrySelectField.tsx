import React, {FC, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Country } from '../../Models';
import styles from  './CountrySelectField.module.scss';
import { CountryService } from "../../Services";
import { CircularProgress } from '@material-ui/core';

interface CountrySelectFieldProps {
    onSelect: (country: Country) => void
}

export const CountrySelectField: FC<CountrySelectFieldProps> = ({ onSelect }: CountrySelectFieldProps) =>
{
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect ( () => {
        setLoading(true);
        CountryService.GetAll()
            .then(setCountries)
            .finally(() => setLoading(false));
    }, []);

    return (
        <Autocomplete
            id="country-select"
            className={styles.select}
            options={countries}
            classes={{
                option: styles.option
            }}
            loading={loading}
            autoHighlight
            disableClearable={true}
            onChange={(event, value) => onSelect(value)}
            getOptionLabel={(option: Country) => option.country}
            renderOption={(option: Country) => (
                <>
                    <img src={option.flag} alt="country logo" />
                    <span>{option.country}</span>
                </>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
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
