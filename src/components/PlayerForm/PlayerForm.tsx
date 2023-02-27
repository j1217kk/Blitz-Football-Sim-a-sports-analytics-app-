import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
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
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface PlayerFormProps {
    id?:string;
    data?:{}
}

export const PlayerForm = (props:PlayerFormProps) => {

    const dispatch = useDispatch();
    let { playerData, getData } = useGetData();
    const store = useStore()

    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseStarting(data.starting))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="starting">Is this player a STARTER in your lineup?</label>
                    <Input {...register('starting')} name="starting" placeholder='True/False' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}