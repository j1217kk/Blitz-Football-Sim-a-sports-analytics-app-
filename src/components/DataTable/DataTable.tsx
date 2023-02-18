
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridColumnHeaderParams } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import { PlayerForm } from '../../components/PlayerForm';
import { getAuth } from 'firebase/auth'; // ** new ** add this for authentication functionality



interface gridData{
    data:{
        id?:string;
    }
}

const columns: GridColDef[] = [
    {
        field: 'first_name',
        type: 'string',
        width: 120,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'First Name'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'last_name',
        type: 'string',
        width: 120,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Last Name'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'age',
        type: 'number',
        width: 40,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Age'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'number',
        type: 'number',
        width: 90,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Jersey #'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'position',
        type: 'string',
        width: 120,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Position'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'height',
        type: 'string',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Height'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'weight',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Weight (lbs)'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'accel',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Acceleration'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'agility',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Agility'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'speed',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Speed'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'strength',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Strength'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'catching',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Catching'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'throwing',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Throwing'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'tackling',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Tackling'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'pass_rush',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Pass Rush'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'man_coverage',
        type: 'number',
        width: 140,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Man Coverage'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'zone_coverage',
        type: 'number',
        width: 140,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Zone Coverage'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'blocking',
        type: 'number',
        width: 110,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Blocking'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'kick_power',
        type: 'number',
        width: 130,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Kick Power'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'kick_acc',
        type: 'number',
        width: 130,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Kick Accuracy'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'durability',
        type: 'number',
        width: 130,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Durability'}
            </strong>
            </h3>
        ),
    },
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

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData)

	if (localStorage.getItem('myAuth') == 'true'){
        return ( //conditionally render datatable
            <div style={{ height: 600, width: '100%' }}>
                <h2>Players on your Roster</h2>
                <DataGrid
                    rows={playerData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
                    {...playerData}
                />
                <Button onClick={handleOpen}>Update</Button>
                <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
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
        <div>
            <h3>Please Sign In to View Your Roster</h3>
        </div>
    )};

}