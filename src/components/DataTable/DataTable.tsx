
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridColumnHeaderParams, GridToolbarFilterButton, GridToolbar, GridCellParams, gridClasses } from '@mui/x-data-grid';
import { useGetData, useGetData2, useGetData3 } from '../../custom-hooks';
import { serverCalls, serverCalls2, serverCalls3 } from '../../api';
import HelpIcon from '@mui/icons-material/Help';
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip
} from '@mui/material';
import { useDispatch, useStore } from 'react-redux';
import { choosePlayerName,
    choosePosition,
    chooseTeam,
    chooseTotalStandard,
    chooseTotalPPR,
    chooseTotalHPPR,
    chooseSznPassY,
    chooseSznRushY,
    chooseSznRcvY,
    chooseSznPassTd,
    chooseSznRushTd,
    chooseSznRcvTd,
    chooseStarting } from '../../redux/slices/rootSlice';
import { PlayerForm } from '../PlayerForm';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { PlayerState } from '../../redux/slices/rootSlice';
import { getAuth } from 'firebase/auth'; // ** new ** add this for authentication functionality
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { theme } from  "../../Theme/theme";
import '../../styles.css'
import { alpha, styled } from '@mui/material/styles'
import obj from '../../assets/images/obj.jpg'


const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${obj});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    margin: '0px',
    padding: '0px',
    right: '1vh',
    left: '0vh',
    top: '2vh',

})

const Root = styled("div")({
    padding: 0,
    margin: 0,
    backgroundColor: 'white'
})


interface gridData{
    data:{
        id?:string;
    }
}

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme: any }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: '#f5f5f5',
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                )
        },
    },
        '&.Mui-selected': {
        backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY +
                theme.palette.action.selectedOpacity +
                theme.palette.action.hoverOpacity,
            ),
            '@media (hover: none)': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            },
        },
        },
    },
    }));


const columns: GridColDef[] = [
    {
        headerName: 'Starting',
        field: 'starting',
        type: 'string',
        width: 95,
        editable: true,
        headerClassName: 'super-app-theme--header',
        align: 'center',
        renderCell: (params: GridCellParams<any>) => {
            if (params.row.starting === 'Yes'){
                return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#00cc00', height: '100%', width:'100%'}}><ThumbUpIcon/></Box>
            } else {
                return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ed6c02', height: '100%', width:'100%'}}><ThumbDownIcon/></Box>
            }
        }
    },
    {
        headerName: 'Player Name',
        field: 'player_name',
        type: 'string',
        width: 240,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<any>)=> {
            return <Box sx={{fontWeight: 'bold', fontStyle: 'italic'}}>{params.value}</Box>
        }
    },
    {
        headerName: 'Position',
        field: 'position',
        type: 'string',
        width: 90,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        headerName: 'Team',
        field: 'team',
        type: 'string',
        width: 70,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Standard Points',
        field: 'total_standard',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_standard > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_standard < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_standard > 190.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_standard < 126.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_standard > 160.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else if (params.row.position === 'WR' && params.row.total_standard < 119.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_standard > 86.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_standard < 55.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'PPR Points',
        field: 'total_ppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_ppr > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '150%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_ppr < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_ppr > 240.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_ppr < 135.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_ppr > 245.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_ppr < 160.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_ppr > 140.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_ppr < 90.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'HPPR Points',
        field: 'total_hppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_hppr > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '150%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_hppr < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_hppr > 216.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_hppr < 126.00){
                    return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_hppr > 205.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_hppr < 133.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_hppr > 112.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else if (params.row.position === 'TE' && params.row.total_hppr < 74.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'Passing Yards',
        field: 'szn_pass_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Rushing Yards',
        field: 'szn_rush_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Receiving Yards',
        field: 'szn_rcv_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Passing TDs',
        field: 'szn_pass_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Rushing TDs',
        field: 'szn_rush_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Receiving TDs',
        field: 'szn_rcv_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    }
]

const columnsB: GridColDef[] = [
    {
        headerName: 'Player Name',
        field: 'player_name',
        type: 'string',
        width: 240,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<any>)=> {
            return <Box sx={{fontWeight: 'bold', fontStyle: 'italic'}}>{params.value}</Box>
        }
    },
    {
        headerName: 'Position',
        field: 'position',
        type: 'string',
        width: 95,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
    },
    {
        headerName: 'Team',
        field: 'team',
        type: 'string',
        width: 70,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Standard Points',
        field: 'total_standard',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_standard > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_standard < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_standard > 190.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_standard < 126.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_standard > 160.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else if (params.row.position === 'WR' && params.row.total_standard < 119.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_standard > 86.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_standard < 55.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'PPR Points',
        field: 'total_ppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_ppr > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '150%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_ppr < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_ppr > 240.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_ppr < 135.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_ppr > 245.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_ppr < 160.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_ppr > 140.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_ppr < 90.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'HPPR Points',
        field: 'total_hppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center',
        renderCell: (params: GridCellParams<number>) => {
            if (params.row.position === 'QB' && params.row.total_hppr > 270.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '150%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'QB' && params.row.total_hppr < 202.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_hppr > 216.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'RB' && params.row.total_hppr < 126.00){
                    return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_hppr > 205.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'WR' && params.row.total_hppr < 133.00){
                return <Tooltip title="Below position average" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip>
            }else if (params.row.position === 'TE' && params.row.total_hppr > 112.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#0abe39', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else if (params.row.position === 'TE' && params.row.total_hppr < 74.00){
                return <Tooltip title="Top 10 in position" arrow><Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color: '#ee712b', height: '100%', width: '100%', fontWeight: 'bold'}}>{Number(params.value).toFixed(2)}</Box></Tooltip> 
            }else {
                return <Box>{Number(params.value).toFixed(2)}</Box>
            }
        }
    },
    {
        headerName: 'Passing Yards',
        field: 'szn_pass_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Rushing Yards',
        field: 'szn_rush_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Receiving Yards',
        field: 'szn_rcv_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Passing TDs',
        field: 'szn_pass_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Rushing TDs',
        field: 'szn_rush_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    },
    {
        headerName: 'Receiving TDs',
        field: 'szn_rcv_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'center'
    }
]



export const DataTable = () => {
    let { playerData, getData } = useGetData()
    let [open, setOpen] = useState(false)
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    // let deleteData = () => {
    //     // serverCalls.delete(`${gridData[0]}`)
    //     // getData()
    //     gridData.forEach( (id: any) => {
    //         serverCalls.delete(`${id}`);
    //         getData();
    //         setData([]);
    //     });
    //     // setData([]);
    //     // getData();
    //     window.location.reload();
    // }

    let deleteData = async () => {
        try {
            for (const id of gridData) {
                await serverCalls.delete(`${id}`);
            }
            const remainingData = await serverCalls.get(); // get the remaining data after deleting
            setData(remainingData); // update the state with the remaining data
            window.location.reload();
            } catch (error) {
                console.log(error);
        }
    };

    const handleUpdate = async () => {
        try {
            for (const id of gridData) {
                const data = await serverCalls.update(`${id}`, { starting: 'Yes' });
                console.log(data);
            }
            const updatedData = await serverCalls.get(); // get the updated data after updating
            setData(updatedData); // update the state with the updated data
            handleClose();
            window.location.reload();
            } catch (error) {
            console.log(error);
            }
        };
    
    const handleUpdate2 = async () => {
        try {
            for (const id of gridData) {
                const data = await serverCalls.update(`${id}`, { starting: 'No' });
                console.log(data);
            }
            const updatedData = await serverCalls.get(); // get the updated data after updating
            setData(updatedData); // update the state with the updated data
            handleClose();
            window.location.reload();
            } catch (error) {
            console.log(error);
            }
        };

    console.log(gridData)

	if (localStorage.getItem('myAuth') == 'true'){
        return ( //conditionally render datatable
            <div>
                <Box sx={{
                    textAlign: 'center',
                    fontSize: '30pt',
                    fontWeight: 'bold',
                    fontFamily: 'Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif;',
                    marginTop: '0.5vh',
                    marginBottom: '0.5vh',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}>Fantasy Depth Chart</Box>
                <Box sx={{display: 'flex'}}>
                <br></br>
                <Box sx={{
                        height: 600,
                        width: '90%',
                        display: 'flex',
                        alignItems: 'center',
                        '& .super-app-theme--header': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'space-between',
                            fontSize: '12pt',
                            textAlign:'center',
                            fontFamily:'Rockwell,Courier Bold,Courier,Georgia,Times,Times New Roman,serif',
                            width: 'fit-content',
                            textDecoration: 'underline',
                            textDecorationStyle: 'dotted',
                            
                        }
                }}
                >
                <StripedDataGrid 
                    sx = {{
                        borderRadius: 2,
                        border: 2,
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'starting', sort: 'desc'}]
                        }
                    }}
                    rows={playerData}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
                    {...playerData}
                    getRowClassName={(params:any) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                /></Box>
                <Box sx={{display: 'flex', flexFlow: 'column', gap: '30px', paddingTop: '20vh', paddingLeft: '5vh'}}>
                <Button sx = {{fontFamily: 'Bangers', fontSize: '20pt', height: '5vh', width: '10vh', backgroundColor:"#00cc00",
                            '&:hover': {
                                backgroundColor: '#009900',
                            },
                            }} variant="contained" onClick={handleUpdate}>START</Button>
                <Button sx = {{fontFamily: 'Bangers', fontSize: '20pt', height: '5vh', width: '10vh', backgroundColor: '#ed6c02',
                            '&:hover':{
                                backgroundColor:'#ba5502'
                            }    
                            }} variant="contained" color="warning" onClick={handleUpdate2}>SIT</Button>
                <Button sx = {{fontFamily: 'Bangers', fontSize: '20pt', height: '5vh', width: '10vh', backgroundColor: '#d32f2f',
                            '&:hover':{
                                backgroundColor:'#962020'
                            }
                            }} variant="contained" onClick={deleteData}>DELETE</Button>
                <Tooltip title={<div>Start: select players and click this to make them starters<br/>Sit: select players and click this to put them on the bench<br/>Delete: select players and click this to remove players from your fantasy team<br/>See top right and check the playerbase!</div>} arrow><HelpIcon sx={{position: 'absolute', left: '93%', top: '60%', fontSize: '25pt'}}/></Tooltip>
                </Box>
                </Box>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Player</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Player ID: {gridData[0]}</DialogContentText>
                        <PlayerForm id={`${gridData[0]}`} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else { 
        return(
        <Root>
        <Main>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '70vh', fontSize: '30pt'}}>
            <h3 style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}><a href="./signin" id='a2'>Please Sign In to Manage Your Fantasy Team!</a></h3>
        </div>
        </Main>
        </Root>
    )};

}

export const DataTable2 = () => {
    let { playerData, getData } = useGetData2()
    console.log(playerData)
    let [error, setError] = useState(false);
    let [rowData, setRowData] = useState<any>([]);
    let [pageSize, setPageSize] = useState<number>(50);
    const navigate = useNavigate();

    //

    let handleClose = () => {
        setError(false)
    }

    const dispatch = useDispatch();
    const store = useStore();

    
    const handleAddPlayer = async () => {
        if (rowData.length > 0) {
            rowData.forEach(async (fPlayer: any) => {
                dispatch(chooseStarting(fPlayer.starting));  
                dispatch(choosePlayerName(fPlayer.player_name));
                dispatch(choosePosition(fPlayer.position));
                dispatch(chooseTeam(fPlayer.team));
                dispatch(chooseTotalStandard(fPlayer.total_standard));
                dispatch(chooseTotalPPR(fPlayer.total_ppr));
                dispatch(chooseTotalHPPR(fPlayer.total_hppr));
                dispatch(chooseSznPassY(fPlayer.szn_pass_y));
                dispatch(chooseSznRushY(fPlayer.szn_rush_y));
                dispatch(chooseSznRcvY(fPlayer.szn_rcv_y));
                dispatch(chooseSznPassTd(fPlayer.szn_pass_td));
                dispatch(chooseSznRushTd(fPlayer.szn_rush_td));
                dispatch(chooseSznRcvTd(fPlayer.szn_rcv_td));           
                await serverCalls.create(store.getState());
            })
            await navigate('/dashboard');
        } else {
            setError(true)
        }
    }


    if (localStorage.getItem('myAuth') == 'true') {
        return (
            <div>
                <Box sx={{
                    textAlign: 'center',
                    fontSize: '30pt',
                    fontWeight: 'bold',
                    fontFamily: 'Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif;',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'

                }}>Fantasy Football Playerbase</Box>
                    <Box sx={{
                            height: 780,
                            width: '95%',
                            display: 'flex',
                            alignItems: 'center',
                            '& .super-app-theme--header': {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'space-around',
                                fontSize: '12pt',
                                textAlign:'center',
                                width: 'fit-content',
                                fontFamily:'Rockwell,Courier Bold,Courier,Georgia,Times,Times New Roman,serif',
                                textDecoration: 'underline',
                                textDecorationStyle: 'dotted',
                            }
                    }}
                    >
                    <StripedDataGrid
                        sx = {{
                            marginLeft: '11.4vh',
                            paddingLeft: '0vh',
                            borderRadius: 2,
                            border: 2,
                        }}
                        rows={playerData}
                        getRowId={(row) => row.player_name}
                        getRowHeight={() => 'auto'}
                        columns={columnsB} 
                        pageSize={15}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[20]}
                        components={{ Toolbar: GridToolbarFilterButton }}
                        // components={{ 
                        //     Toolbar: (props) => (
                        //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        //         <GridToolbarFilterButton {...props} />
                        //         </Box>
                        //     ) }}
                        checkboxSelection 
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = playerData.filter((row: any) =>
                                selectedIDs.has(row.player_name)
                            );
                            setRowData(selectedRows)
                        }}
                        {...playerData}
                        getRowClassName={(params:any) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }  />
                    </Box>
                <div style={{display:'flex', justifyContent: 'center', marginTop: '1vh'}}>
                    <Button sx = {{fontFamily: 'Bangers', fontSize: '20pt'}} variant="contained" color="success" onClick={handleAddPlayer}>Add Players!</Button>
                </div>
            </div>
        )
    } else {
        return(
            <Root>
            <Main>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '70vh', fontSize: '30pt', color: 'yellow'}}>
                <h3 style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}><a href="./signin" id='a2'>Please Sign In to View Playerbase!</a></h3>
            </div>
            </Main>
            </Root>
        )
    };
}