import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseFirstName,
    chooseLastName,
    chooseAge,
    chooseNumber, 
    choosePosition,
    chooseHeight,
    chooseWeight, 
    chooseAccel,
    chooseAgility,
    chooseSpeed,
    chooseStrength,
    chooseCatching,
    chooseThrowing,
    chooseTackling,
    choosePassRush,
    chooseManCoverage,
    chooseZoneCoverage,
    chooseBlocking,
    chooseKickPower,
    chooseKickAcc,
    chooseDurability } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface PlayerFormProps {
    id?:string;
    data?:{}
}

interface PlayerState {
    name: string;
    price: string;
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
            dispatch(chooseFirstName(data.first_name))
            dispatch(chooseLastName(data.last_name))
            dispatch(chooseAge(data.age))
            dispatch(chooseNumber(data.number))
            dispatch(choosePosition(data.position))
            dispatch(chooseHeight(data.height))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseAccel(data.accel))
            dispatch(chooseAgility(data.agility))
            dispatch(chooseSpeed(data.speed))
            dispatch(chooseStrength(data.strength))
            dispatch(chooseCatching(data.catching))
            dispatch(chooseThrowing(data.throwing))
            dispatch(chooseTackling(data.tackling))
            dispatch(choosePassRush(data.pass_rush))
            dispatch(chooseManCoverage(data.man_coverage))
            dispatch(chooseZoneCoverage(data.zone_coverage))
            dispatch(chooseBlocking(data.blocking))
            dispatch(chooseKickPower(data.kick_power))
            dispatch(chooseKickAcc(data.kick_acc))
            dispatch(chooseDurability(data.durability))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <Input {...register('first_name')} name="first_name" placeholder='First Name' />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Input {...register('last_name')} name="last_name" placeholder="Last Name"/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <Input {...register('age')} name="age" placeholder="Age"/>
                </div>
                <div>
                    <label htmlFor="number">Jersey Number</label>
                    <Input {...register('number')} name="number" placeholder="Jersey #"/>
                </div>
                <div>
                    <label htmlFor="position">Player Position</label>
                    <Input {...register('position')} name="position" placeholder="Position (Note. Use abbrv... ex: QB or RB)"/>
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <Input {...register('height')} name="height" placeholder="Height (Note. Do not denote inches with a symbol. Ex: 6'7) "/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight (in Lbs)"/>
                </div>
                <div>
                    <label htmlFor="accel">Acceleration</label>
                    <Input {...register('accel')} name="accel" placeholder="Acceleration Rating"/>
                </div>
                <div>
                    <label htmlFor="agility">Agility</label>
                    <Input {...register('agility')} name="agility" placeholder="Agility Rating"/>
                </div>
                <div>
                    <label htmlFor="speed">Speed</label>
                    <Input {...register('speed')} name="speed" placeholder="Speed Rating"/>
                </div>
                <div>
                    <label htmlFor="strength">Strength</label>
                    <Input {...register('strength')} name="strength" placeholder="Strength Rating"/>
                </div>
                <div>
                    <label htmlFor="catching">Catching</label>
                    <Input {...register('catching')} name="catching" placeholder="Catching Rating"/>
                </div>
                <div>
                    <label htmlFor="throwing">Throwing</label>
                    <Input {...register('throwing')} name="throwing" placeholder="Throwing Rating"/>
                </div>
                <div>
                    <label htmlFor="tackling">Tackling</label>
                    <Input {...register('tackling')} name="tackling" placeholder="Tackling Rating"/>
                </div>
                <div>
                    <label htmlFor="pass_rush">Pass Rush</label>
                    <Input {...register('pass_rush')} name="pass_rush" placeholder="Pass Rush Rating"/>
                </div>
                <div>
                    <label htmlFor="man_coverage">Man Coverage</label>
                    <Input {...register('man_coverage')} name="man_coverage" placeholder="Man Coverage Rating"/>
                </div>
                <div>
                    <label htmlFor="zone_coverage">Zone Coverage</label>
                    <Input {...register('zone_coverage')} name="zone_coverage" placeholder="Zone Coverage Rating"/>
                </div>
                <div>
                    <label htmlFor="blocking">Blocking</label>
                    <Input {...register('blocking')} name="blocking" placeholder="Blocking Rating"/>
                </div>
                <div>
                    <label htmlFor="kick_power">Kick Power</label>
                    <Input {...register('kick_power')} name="kick_power" placeholder="Kick Power Rating"/>
                </div>
                <div>
                    <label htmlFor="kick_acc">Kick Accuracy</label>
                    <Input {...register('kick_acc')} name="kick_acc" placeholder="Kick Accuracy Rating"/>
                </div>
                <div>
                    <label htmlFor="durability">Durability</label>
                    <Input {...register('durability')} name="durability" placeholder="Durability Rating"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}