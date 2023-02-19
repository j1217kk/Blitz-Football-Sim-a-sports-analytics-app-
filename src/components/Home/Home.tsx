import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import field_image from '../../assets/images/field.jpg';
// Below Imports
import { Link } from 'react-router-dom';


interface Props {
    title:string;
}

const Root = styled("div")({
    padding: 0,
    margin: 0
})
const NavbarContainer = styled('div')( {
    display: 'flex',
    gap: '50vh',
    backgroundColor: 'rgb(60, 167, 120)',
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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${field_image});`,
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

export const Home = (props:Props) => {
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
                        <NavA to="/signin">Sign In</NavA>
                    </li>
                    <li>
                        <NavA to="/signup">Sign Up</NavA>
                    </li>
                </LogoNavigation>
            </NavbarContainer>
            <Main>
                <MainText>
                    <h1>{props.title}</h1>
                    <p>Build and win.</p>
                    <Button color='primary' variant='contained' component={Link} to='/dashboard'>See Your Roster!</Button>
                </MainText>
            </Main>
        </Root>
    )
}
