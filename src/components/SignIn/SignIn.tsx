import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Input2 } from '../sharedComponents/Input';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import luck from '../../assets/images/andrew-luck.jpg'
import tunnelvision from '../../assets/images/football-tunnel.jpg'
import google from '../../assets/images/google-logo.png'

const peace = require("../../assets/video/tyreek-peace.mp4");

const signinStyles = {
    googleButton:{
        backgroundColor: '#556d7c',
        marginLeft: '17.2vh',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 1px 2px 2px 2px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'flex',
        borderRadius: '25px',
        fontFamily: 'OCR A Std, monospace',
        cursor: 'pointer',
        justifyContent: 'space-around',
        alignItems: 'space-around'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Bangers;',
        textAlign: 'center',
        fontSize: '2em',
        paddingBottom: '3vh',
        color: 'beige'
    },
    containerStyle: {
        marginTop: '2em',
        backgroundColor: '#36454f',
        borderRadius: '25px',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '60px',
        paddingRight: '100px',
        width: '1000px',
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    },
    labels: {
        fontFamily: 'Bangers;'
    }
}
const NavB = styled (Link) ({
    display: 'block',
    color: 'yellow',
    fontFamily: 'sans-serif',
    marginBottom: '20px',
    marginLeft: '15.5vh',
    fontStyle: 'italic'
})

const InputLabel = styled('div')({
    color: 'white',
    fontWeight: 'bolder',
    fontFamily: 'OCR A Std, monospace',
    fontSize: '15pt'

})

const Root = styled("div")({
    padding: 0,
    margin: 0,
    backgroundColor: 'black'
})
const NavbarContainer = styled('div')( {
    display: 'flex',
    gap: '34.5vh',
    backgroundColor: 'rgb(36,33,36)',
})
const Logo = styled('h1')({
    marginTop: '.5vh',
})
const LogoA = styled(Link)( {
    color: 'rgb(255, 165, 0)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
})
const LogoNavigation = styled('ul')( {
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 'bolder',
    display: 'flex',
    justifyContent: 'center',
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'beige',
    textDecoration: 'none',
})
const Main = styled('main')( {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
})
const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
})

const Main2 = styled('main')({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${luck});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute'

})

const Main3 = styled('main')({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${tunnelvision});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute'

})

const GoogleLogo = styled('img')({
    maxWidth: '4vh',
    maxHeight: '4vh',
    paddingTop: '1vh',
    position: 'relative',
    marginBottom: '1vh',
    paddingRight: '1vh'

})

const NavbarContainer2 = styled('div')( {
    display: 'flex',
    gap: '37.7vh',
    backgroundColor: 'rgb(36,33,36)',
})


//Functional components to be used inside of SignIn Component
const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled' />
}

interface ButtonProps {
    open?: boolean,
    onClick?: ()=> void //onClick is expected to be a function that may not return something but will do something

}

//Functional component to conditionally render Google SignIn Button
const GoogleButton = (props:ButtonProps) => {
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

    const signIn = async () =>{
        await signInWithGoogle()
        // Storing authenticated user in a local variable
        localStorage.setItem('myAuth', 'true')
        //navigate to dashboard after successful signin
        navigate('/dashboard')
    }

    const signUsOut = async () => {
        await signOut(auth)
        //setting local variable to false for signed out usser
        localStorage.setItem('myAuth', 'false')
        navigate('/signin')
    }

    if (loading) {
        return <CircularProgress/>
    }
    if (localStorage.getItem('myAuth') == 'true') {
        return(
            <Button variant="contained" color="error" onClick={signUsOut}>Sign Out</Button>
        )
    } else {
        return (
        <Button sx={signinStyles.googleButton} onClick={signIn}><span style={{paddingLeft: '1vh'}}> Sign In With Google</span><GoogleLogo src={google} alt="google-logo"/></Button>
        )
    }
}

interface UserProps {
    email?: any,
    password?: any,
}



export const SignIn = (props:UserProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()
    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose = () => {
        setOpen(false)
        navigate('/dashboard')
    }

    //onSubmit to grab user info from form
    const onSubmit = async (data:any, event:any) => {
        console.log(data.email, data.password)
        //adding option to sign in with form
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Sign In
                //checking for current user
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user
                navigate('/dashboard')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            })

    }
    return (
        <Root>
        <NavbarContainer>
            <Logo>
                <LogoA to="/">BLITZ FOOTBALL SIM</LogoA>
            </Logo>
            <LogoNavigation>
                <li>
                    <NavA to="/">Home</NavA>
                </li>
                <li>
                    <NavA to="/dashboard">Roster</NavA>
                </li>
                <li>
                    <NavA to="/playerbase">Playerbase</NavA>
                </li>
                <li>
                    <NavA to="/tips">Tips</NavA>
                </li>
                <li>
                    <NavA to="/signin">Sign In</NavA>
                </li>
                <li>
                    <NavA to="/signup">Sign Up</NavA>
                </li>
            </LogoNavigation>
        </NavbarContainer>
        <Main3>
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputLabel>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Email here ...'/>
                    </InputLabel>
                </div>
                <div style={{marginTop: '1vh'}}>
                    <InputLabel>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Password here...'/>
                    </InputLabel>
                </div>
                <br></br>
                <Button sx={{marginLeft: '25.35vh', fontWeight: 'bold', fontFamily: 'OCR A Std, monospace'}} type="submit" variant="contained" color="primary">Sign In</Button>
            </form>
                <br/>
            <NavB to='/signup'>Don't have an account? Sign Up Here</NavB>
            <GoogleButton open={open} onClick={handleSnackClose}/>
            <Snackbar message ='Success' open={open} autoHideDuration={3000}>
                <Alert severity="success">
                    <AlertTitle>Successful Sign In --- redirecting in 3 seconds...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
        </Main3>
        </Root>
    )
}

export const SignUp = (props: UserProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose = () => {
        setOpen(false)
        navigate('/signin')
    }
    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password)
        console.log(auth)

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential)=> {
            //Signed In
            const user = userCredential.user 
            console.log(user)
            navigate('/signin')
        })
        .catch((error)=> {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }
    return (
        <Root>
        <NavbarContainer>
            <Logo>
                <LogoA to="/">BLITZ FOOTBALL SIM</LogoA>
            </Logo>
            <LogoNavigation>
                <li>
                    <NavA to="/">Home</NavA>
                </li>
                <li>
                    <NavA to="/dashboard">Roster</NavA>
                </li>
                <li>
                    <NavA to="/playerbase">Playerbase</NavA>
                </li>
                <li>
                    <NavA to="/tips">Tips</NavA>
                </li>
                <li>
                    <NavA to="/signin">Sign In</NavA>
                </li>
                <li>
                    <NavA to="/signup">Sign Up</NavA>
                </li>
            </LogoNavigation>
        </NavbarContainer>
        <Main2>
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                New Account Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputLabel>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Email here ...'/>
                    </InputLabel>
                </div>
                <div>
                    <InputLabel>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Password here...'/>
                    </InputLabel>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2vh'}}>
                <Button sx={{fontWeight: 'bold', fontFamily: 'OCR A Std, monospace'}}type="submit" variant="contained" color="primary">Register</Button>
                </div>
            </form>
            <Snackbar message ='Success' open={open} onClose={handleSnackClose} autoHideDuration={3000}>
                <Alert severity="success">
                    <AlertTitle>Successful Sign Up --- redirecting in 3 seconds...</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
        </Main2>
        </Root>
)
}

export const SignOut = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    var deuces = String.fromCodePoint(9996)

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.setItem('myAuth', 'false');
            navigate('/signin');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Root>
        <NavbarContainer2>
            <Logo>
                <LogoA to="/">BLITZ FOOTBALL SIM</LogoA>
            </Logo>
            <LogoNavigation>
                <li>
                    <NavA to="/">Home</NavA>
                </li>
                <li>
                    <NavA to="/dashboard">Roster</NavA>
                </li>
                <li>
                    <NavA to="/playerbase">Playerbase</NavA>
                </li>
                <li>
                    <NavA to="/tips">Tips</NavA>
                </li>
                <li>
                    <NavA to="/signout">Sign Out</NavA>
                </li>
            </LogoNavigation>
        </NavbarContainer2>
        <Main>
            <video autoPlay loop muted id='video'>
                <source src={peace} type='video/mp4'/>
            </video>
            <MainText>
            <h1 style={{color: 'whitesmoke', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontFamily: 'Bangers'}}>You're sure you want to sign out?</h1>
            <button style ={{
                fontSize: '16pt',
                padding: '1.5vh',
                marginTop: '2vh',
                backgroundColor: '#ff1540',
                borderRadius: '25px',
                borderColor:'goldenrod',
                fontFamily: 'Bangers',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                color: '#ffae42'        
                }}onClick={handleSignOut}>Sign Me Out<span style={{paddingRight:'1vh'}}></span>{deuces}</button>
            {error && <p>{error}</p>}
            </MainText>
        </Main>
        </Root>
    )
};