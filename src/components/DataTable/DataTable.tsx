
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridColumnHeaderParams, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useGetData, useGetData2, useGetData3 } from '../../custom-hooks';
import { serverCalls, serverCalls2, serverCalls3 } from '../../api';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useDispatch, useStore } from 'react-redux';
import { chooseStarting,
    choosePlayerName,
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
    chooseSznRcvTd } from '../../redux/slices/rootSlice';

import { PlayerForm } from '../PlayerForm';


import { PlayerState } from '../../redux/slices/rootSlice';
import { getAuth } from 'firebase/auth'; // ** new ** add this for authentication functionality



interface gridData{
    data:{
        id?:string;
    }
}

const columns: GridColDef[] = [
    {
        headerName: 'Starting',
        field: 'starting',
        type: 'boolean',
        width: 120,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Player Name',
        field: 'player_name',
        type: 'string',
        width: 240,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Position',
        field: 'position',
        type: 'string',
        width: 80,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Team',
        field: 'team',
        type: 'string',
        width: 70,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Standard Points',
        field: 'total_standard',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'PPR Points',
        field: 'total_ppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'HPPR Points',
        field: 'total_hppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Passing Yards',
        field: 'szn_pass_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Rushing Yards',
        field: 'szn_rush_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Receiving Yards',
        field: 'szn_rcv_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Passing TDs',
        field: 'szn_pass_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Rushing TDs',
        field: 'szn_rush_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Receiving TDs',
        field: 'szn_rcv_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    }
]

const columnsB: GridColDef[] = [
    {
        headerName: 'Player Name',
        field: 'player_name',
        type: 'string',
        width: 240,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Position',
        field: 'position',
        type: 'string',
        width: 80,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Team',
        field: 'team',
        type: 'string',
        width: 70,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Standard Points',
        field: 'total_standard',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'PPR Points',
        field: 'total_ppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'HPPR Points',
        field: 'total_hppr',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Passing Yards',
        field: 'szn_pass_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Rushing Yards',
        field: 'szn_rush_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Receiving Yards',
        field: 'szn_rcv_y',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Passing TDs',
        field: 'szn_pass_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Rushing TDs',
        field: 'szn_rush_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
    },
    {
        headerName: 'Receiving TDs',
        field: 'szn_rcv_td',
        type: 'number',
        width: 150,
        editable: true,
        headerClassName: 'column-headers',
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

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData)

	if (localStorage.getItem('myAuth') == 'true'){
        return ( //conditionally render datatable
            <div style={{ height: 600, width: '100%' }}>
                <h2 style={{ textAlign: 'center', fontSize: '30pt'}}>My Fantasy Roster</h2>
                <DataGrid style={{textAlign: 'center'}}
                    rows={playerData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
                    {...playerData}
                />
                <Button variant="contained" color="info" onClick={handleOpen}>Update</Button>
                <Button variant="contained" color="error" onClick={deleteData}>Delete</Button>
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

export const DataTable2 = () => {
    let { playerData, getData } = useGetData2()
    console.log(playerData)
    let [error, setError] = useState(false);
    let [rowData, setRowData] = useState<any>([]);
    let [pageSize, setPageSize] = useState<number>(50);

    //

    let handleClose = () => {
        setError(false)
    }

    const dispatch = useDispatch();
    const store = useStore();

    
    const addPlayer = async () => {
        if (rowData.length > 0) {
            rowData.forEach(async (fPlayer: any) => {
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
        } else {
            setError(true)
        }
    }

    if (localStorage.getItem('myAuth') == 'true') {
        return (
            <div style={{ height: 800, width: '100%' }}>
                    <h2>Fantasy Football Playerbase</h2>
                    <DataGrid 
                        rows={playerData} //need to create list out of players dictionary for easy population of rows
                        getRowId={(row) => row.player_name}
                        getRowHeight={() => 'auto'}
                        columns={columnsB} 
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[50, 100]}
                        components={{ Toolbar: GridToolbarFilterButton }}
                        checkboxSelection 
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = playerData.filter((row: any) =>
                                selectedIDs.has(row.player_name)
                            );
                            setRowData(selectedRows)
                        }}
                        {...playerData}  />
                    <Button variant="contained" color="success" onClick={addPlayer}>Add Player!</Button>
                    <Dialog open={error} onClose={handleClose} aria-labelledby="form-dialog-error">
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">Cancel</Button>
                        </DialogActions>
                        <DialogTitle id="form-dialog-error">Mark players to add</DialogTitle>
                    </Dialog>
            </div>
        )
    } else {
        return(
            <div>
                <h3>Please Sign In to Manage Your Fantasy Team!</h3>
            </div>
        )
    };
}