import React, { useState, useEffect, useCallback } from 'react';
import { serverCalls, serverCalls2, serverCalls3 } from '../api';

export const useGetData = () => {
    const [playerData, setData] = useState<any>([]);
    async function handleDataFetch(){
        const result = await serverCalls.get();             
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {playerData, getData:handleDataFetch}
}

// export const useGetData2 = () => {
//     const [playerData, setData] = useState<any>([]);
//     async function handleDataFetch(){
//         let result = await serverCalls2.get(i);  
        
//         setData(result)

//     }
//     useEffect(() => {
//         async function handleDataFetch() {
//             const players:any = {};
//             for (let i = 1; i < 18; i++){
//                 const result = await serverCalls2.get(i);
//                 result.forEach( (element: any) => {
//                     if (element.player_name in players){
//                         players[element.player_name].total_standard += element.fantasy_points.standard 
//                         players[element.player_name].total_ppr += element.fantasy_points.ppr
//                         players[element.player_name].total_hppr += element.fantasy_points.half_ppr
        
//                     }else {
//                         players[element.player_name] = {
//                             'player_name':element.player_name,
//                             'team': element.team,
//                             'position': element.position,
//                             'total_standard': element.fantasy_points.standard,
//                             'total_ppr': element.fantasy_points.ppr,
//                             'total_hppr': element.fantasy_points.hppr,
        
//                         }
//                     }

//                 })
        
//             }
//             setData(players);
//         }
//         handleDataFetch();

//     }, []);

//     return {playerData, getData:handleDataFetch}
// }

export const useGetData2 = () => {
    const [playerData, setData] = useState<any>([]);

    const handleDataFetch = useCallback(async () => {
        try {
            const players:any = {};
            for (let i = 1; i < 18; i++){
                const result = await serverCalls2.get(i);
                result.forEach( (element: any) => {
                    if (element.player_name in players){
                        players[element.player_name].total_standard += element.fantasy_points.standard 
                        players[element.player_name].total_ppr += element.fantasy_points.ppr
                        players[element.player_name].total_hppr += element.fantasy_points.half_ppr
                    } else {
                        players[element.player_name] = {
                            'player_name':element.player_name,
                            'team': element.team,
                            'position': element.position,
                            'total_standard': element.fantasy_points.standard,
                            'total_ppr': element.fantasy_points.ppr,
                            'total_hppr': element.fantasy_points.half_ppr,
                            }
                    }
            })
            }
            const result2 = await serverCalls3.get()
            result2.forEach( (element: any) => {
                if (element.player_name in players){
                    players[element.player_name].szn_pass_y = element.stats.passing.passing_yds
                    players[element.player_name].szn_rush_y = element.stats.rushing.rushing_yds 
                    players[element.player_name].szn_rcv_y = element.stats.receiving.receiving_yds 
                    players[element.player_name].szn_pass_td = element.stats.passing.passing_td 
                    players[element.player_name].szn_rush_td = element.stats.rushing.rushing_td
                    players[element.player_name].szn_rcv_td = element.stats.receiving.receiving_td
                }
            }) 
            setData(Object.values(players));
        } catch (error) {
            console.error(error);
        }
        }, []);
    
        useEffect(() => {
            handleDataFetch();
        }, [handleDataFetch]);
    
    return { playerData, getData: handleDataFetch }
}

export const useGetData3 = () => {
    const [playerData, setData] = useState<any>([]);
    async function handleDataFetch(){
        const result = await serverCalls3.get();             
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {playerData, getData:handleDataFetch}
}



