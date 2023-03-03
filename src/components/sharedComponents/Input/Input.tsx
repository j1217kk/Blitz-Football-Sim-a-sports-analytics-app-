import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface inputType{
    name: string;
    placeholder: string;
}

export const Input = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            style={{border: '1px', borderColor: 'beige', color: 'beige'}}
            InputProps={{style:{color:'white'}}}
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            type='text'
            {...props}
        ></TextField>
    );
    });

export const Input2 = forwardRef((props: inputType, ref) => {
    return (
        <TextField
            style={{border: '1px', borderColor: 'beige', color: 'beige'}}
            InputProps={{style:{color:'white'}}}
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            type="password"
            {...props}
        ></TextField>
    );
});

export const Input3 = forwardRef((props:inputType, ref) => {
    return (
        <TextField
            style={{border: '1px', borderColor: 'beige', color: 'beige'}}
            InputProps={{style:{color:'white'}}}
            variant="outlined"
            margin="normal"
            inputRef={ref}
            fullWidth
            type='text'
            {...props}
        ></TextField>
    );
    });