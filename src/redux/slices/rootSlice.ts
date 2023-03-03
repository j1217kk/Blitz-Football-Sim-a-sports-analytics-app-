import { createSlice } from '@reduxjs/toolkit';

export interface PlayerState {
    player_name: string,
    position: string,
    team: string,
    total_standard: number,
    total_ppr: number,
    total_hppr: number,
    szn_pass_y: number,
    szn_rush_y: number,
    szn_rcv_y: number,
    szn_pass_td: number,
    szn_rush_td: number,
    szn_rcv_td: number,
    starting: string,
}

const initialState: PlayerState = {
    player_name: '',
    position: '',
    team: '',
    total_standard: 0,
    total_ppr: 0,
    total_hppr: 0,
    szn_pass_y: 0,
    szn_rush_y: 0,
    szn_rcv_y: 0,
    szn_pass_td: 0,
    szn_rush_td: 0,
    szn_rcv_td: 0,
    starting: 'No',
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        choosePlayerName: (state, action) => { state.player_name = action.payload },
        choosePosition: (state, action) => { state.position = action.payload },
        chooseTeam: (state, action) => { state.team = action.payload },
        chooseTotalStandard: (state, action) => { state.total_standard = action.payload },
        chooseTotalPPR: (state, action) => { state.total_ppr = action.payload },
        chooseTotalHPPR: (state, action) => { state.total_hppr = action.payload },
        chooseSznPassY: (state, action) => { state.szn_pass_y = action.payload },
        chooseSznRushY: (state, action) => { state.szn_rush_y = action.payload },
        chooseSznRcvY: (state, action) => { state.szn_rcv_y = action.payload },
        chooseSznPassTd: (state, action) => { state.szn_pass_td = action.payload },
        chooseSznRushTd: (state, action) => { state.szn_rush_td = action.payload },
        chooseSznRcvTd: (state, action) => { state.szn_rcv_td = action.payload },
        chooseStarting: (state, action) => { state.starting = action.payload }


    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
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
    chooseSznRcvTd,
    chooseStarting
} = rootSlice.actions;