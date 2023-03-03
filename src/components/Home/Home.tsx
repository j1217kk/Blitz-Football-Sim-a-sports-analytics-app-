import React from 'react';
import { styled } from '@mui/system';
import { Button,  Avatar, Box, Typography } from '@mui/material';
import field_image from '../../assets/images/field.jpg';
import guru from '../../assets/images/guru.png';
import ball from '../../assets/images/ball-logo.png';
import { Link } from 'react-router-dom';
import { GroupsOutlined } from '@mui/icons-material';


const backgroundVideo = require("../../assets/video/ab.mp4");

interface Props {
    title:string;
}

const styles2 = {
    container: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    chat: {
        maxWidth: '80%',
        padding: '.5em',
        borderRadius: '16px',
        backgroundColor: '#d0e2c9',
        color: 'black',
        position: 'relative',
        marginBottom: '15vh',
        marginLeft: '0vh',
        fontFamily: 'arial',
        fontWeight: 'bold'
    },
    avatar: {
        marginLeft: '10vh',
        width: '21vh',
        height: '21vh',
        marginBottom: '10vh'
    }
}

const Pointy = styled("div")({
        position: "absolute",
        bottom: "7vh",
        marginLeft: "-2.1vh",
        width: "0",
        height: "0",
        borderTop: "10px solid transparent",
        borderRight: "10px solid #d0e2c9",
        borderBottom: "10px solid transparent",
        color: ''
})

const Ball = styled("img")({
    position: 'absolute',
    maxHeight: '7vh',
    maxWidth: '7vh',
    marginBottom: '12vh',
    marginLeft: '17vh',
    zIndex: 2,

})

const Root = styled("div")({
    padding: 0,
    margin: 0
})
const NavbarContainer = styled('div')( {
    display: 'flex',
    backgroundColor: 'rgb(36,33,36)',
    justifyContent: 'center',
})
const Logo = styled('h1')({
})
const LogoA = styled(Link)( {
    color: 'rgb(255, 165, 0)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
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
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
})
const MainText2 = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#e7ff54',
    fontSize: '50pt'
})
const MainText3 = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '32%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '18pt',
    fontWeight: 'bold',
    fontStyle: 'italic'
})

export const Home = (props:Props) => {
    if (localStorage.getItem('myAuth') == 'true') {
        return (
            <Root>
            <NavbarContainer>
                <LogoNavigation>
                    <li>
                        <NavA to="/">Home</NavA>
                    </li>
                    <li>
                        <NavA to="/dashboard">Depth Chart</NavA>
                    </li>
                    <li>
                    <NavA to="/playerbase">Playerbase</NavA>
                    </li>
                    <li>
                    <NavA to="/tips">Tips</NavA>
                    </li>
                    <li>
                        <NavA to="/signout" sx={{color: '#ff00d9'}}>Sign Out</NavA>
                    </li>
                </LogoNavigation>
            </NavbarContainer>
            <Main>
                <video autoPlay loop muted id='video'>
                    <source src={backgroundVideo} type='video/mp4'/>
                </video>
                <MainText>
                    <div className="wordart blues"><span className="text">Blitz Football Sim</span></div>
                </MainText>
                <MainText2>
                <div className="wordart2 blues2"><span style={{fontSize: '20pt', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Build and win.</span></div>
                </MainText2>
                <MainText3>
                    {/* <div><span style={{backgroundColor: 'rgba(61, 61, 61, 0.2)'}}>New to Fantasy Football?</span></div>
                    <Button sx = {{marginTop: '1vh', fontFamily: 'Bangers', fontSize: '15pt', backgroundColor: '#ff9933', color: 'ivory'}} variant="contained" component={Link} to='/tips'>Learn Here!</Button> */}
                    <Box sx={styles2.container}>
                        <Ball src={ball} alt="ball"/>
                        <Avatar src ={guru} sx={styles2.avatar}>Fantasy Guru</Avatar>
                        <Box sx={styles2.chat}>
                            <Typography sx={{fontWeight: 'bolder'}} variant="body2">"Hey! Are you new to Fantasy Football?"<br/> 
                                <Button sx = {{marginTop: '1vh', fontFamily: 'Bangers', fontSize: '15pt', backgroundColor: '#70f211', color: 'ivory'}} variant="contained" component={Link} to='/tips'>Start Here!</Button>
                            </Typography>
                            <Pointy/>
                        </Box>
                    </Box>
                </MainText3>
            </Main>
        </Root>
        )
    }
    else return (
        <Root>
            <NavbarContainer>
                <LogoNavigation>
                    <li>
                        <NavA to="/">Home</NavA>
                    </li>
                    <li>
                        <NavA to="/dashboard">Depth Chart</NavA>
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
                        <NavA to="/signup" sx={{color: '#ff00d9'}}>Sign Up</NavA>
                    </li>
                </LogoNavigation>
            </NavbarContainer>
            <Main>
                <video autoPlay loop muted id='video'>
                    <source src={backgroundVideo} type='video/mp4'/>
                </video>
                <MainText>
                    <div className="wordart blues"><span className="text">Blitz Football Sim</span></div>
                </MainText>
                <MainText2>
                <div className="wordart2 blues2"><span style={{fontSize: '20pt', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Build and win.</span></div>
                </MainText2>
                <MainText3>
                    {/* <div><span style={{backgroundColor: 'rgba(61, 61, 61, 0.2)'}}>New to Fantasy Football?</span></div>
                    <Button sx = {{marginTop: '1vh', fontFamily: 'Bangers', fontSize: '15pt', backgroundColor: '#ff9933', color: 'ivory'}} variant="contained" component={Link} to='/tips'>Learn Here!</Button> */}
                    <Box sx={styles2.container}>
                        <Ball src={ball} alt="ball"/>
                        <Avatar src ={guru} sx={styles2.avatar}>Fantasy Guru</Avatar>
                        <Box sx={styles2.chat}>
                            <Typography sx={{fontWeight: 'bolder'}} variant="body2">"Hey! Are you new to Fantasy Football?"<br/> 
                                <Button sx = {{marginTop: '1vh', fontFamily: 'Bangers', fontSize: '15pt', backgroundColor: '#70f211', color: 'ivory'}} variant="contained" component={Link} to='/tips'>Start Here!</Button>
                            </Typography>
                            <Pointy/>
                        </Box>
                    </Box>
                </MainText3>
            </Main>
        </Root>
    )
}
