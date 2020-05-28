import React, { FC } from 'react';
import { League } from '../../Models';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import './LeaguesTable.scss';

interface LeaguesTableProps {
    leagues: League[]
}
const imgSize = 30;

export const LeaguesTable: FC<LeaguesTableProps> = ({ leagues }: LeaguesTableProps) =>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Season</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    leagues
                        .sort((first, second) => second.season - first.season)
                        .map((league) => (
                            <TableRow key={league.league_id}>
                                <TableCell component="th" scope="row">
                                    <img
                                        src={league.logo}
                                        alt="team logo"
                                        width={imgSize}
                                        height={imgSize}
                                    />
                                </TableCell>
                                <TableCell>{league.name}</TableCell>
                                <TableCell>{league.type}</TableCell>
                                <TableCell>{league.country}</TableCell>
                                <TableCell>{league.season}</TableCell>
                            </TableRow>
                        ))}
            </TableBody>
        </Table>
    </TableContainer>;

