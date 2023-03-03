import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import xoxo from '../../assets/images/x-o-x-o.jpg';
import espn_logo from '../../assets/images/espn-logo.png';
import yahoo_logo from '../../assets/images/yahoo-logo.png';
import guru from '../../assets/images/guru.png';
import ball from '../../assets/images/ball-logo.png'
import { Link } from 'react-router-dom';

const Root = styled("div")({
    padding: 0,
    margin: 0
});

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

const NavbarContainer = styled('div')({
    display: 'flex',
    backgroundColor: 'rgb(36,33,36)',
    gap: '34.54vh',
});

const NavbarContainer2 = styled('div')({
    display: 'flex',
    backgroundColor: 'rgb(36,33,36)',
    gap: '32.21vh',
});


const LogoNavigation = styled('ul')({
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 'bolder',
    display: 'flex',
    justifyContent: 'center',
});

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'beige',
    textDecoration: 'none',
});

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${xoxo});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
});

const SlidingText = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#CCCCFF',
    fontSize: '25pt',
    fontWeight: 'bold',
    padding: '1em',
    border: '5px solid white',
    borderRadius: '10px',
    backgroundColor: '#191970',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
});

const SlideButton = styled(Button)({
    color: '#ffc054',
    top: '25%',
    left: '44.202%',
    fontWeight: 'bolder',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
});

const Leagues = styled('div')({
    color: 'white',
    fontWeight: 'bold',
    padding: '1em',
    border: '5px solid white',
    borderRadius: '10px',
    position: 'absolute',
    marginTop: '5vh',
    left: '40.5%',
    textAlign: 'center',
    backgroundColor: '#1c1020',
    fontSize: '18pt'
})

const OtherResources = styled('div')({
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: '3em',
    paddingRight: '3em',
    paddingTop: '1em',
    paddingBottom: '1.5em',
    border: '5px solid white',
    borderRadius: '10px',
    position: 'absolute',
    marginTop: '72vh',
    left: '41.4%',
    textAlign: 'center',
    backgroundColor: '#1c1020',
    fontSize: '12pt'
})

const A1 = styled(Link)({
    "&:hover": {
        color: 'lightpink'
    },
    textAlign: 'center',
    color: '#0080ff',
    textDecoration: 'none',
    fontWeight: 'none'
})

const ESPNLogo = styled('img')({
    maxHeight: '8.5vh',
    maxWidth: '8.5vh',
    marginTop: '.5vh'

})

const YahooLogo = styled('img')({
    marginLeft: '1vh',
    maxHeight: '7vh',
    maxWidth: '7.5vh',
    marginBottom: '.65vh'

})
const Guru1 = styled('img')({
    marginTop: '35vh',
    marginLeft: '10%',
    position: 'absolute',
    maxHeight: '30vh',
    maxWidth: '30vh'
})

const Guru2 = styled('img')({
    marginTop: '35vh',
    marginLeft: '64%',
    position: 'absolute',
    maxHeight: '30vh',
    maxWidth: '30vh'
})

const Ball1 = styled('img')({
    marginTop: '52vh',
    marginLeft: '30.7vh',
    position: 'absolute',
    maxHeight: '10vh',
    maxWidth: '10vh',
    zIndex:2
})

const Ball2 = styled('img')({
    marginTop: '52vh',
    marginLeft: '143.5vh',
    position: 'absolute',
    maxHeight: '10vh',
    maxWidth: '10vh',
    zIndex:2
})

const ArrowIcon = styled('span')({
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.5em',
});

const ChevronLeft = styled(ChevronLeftIcon)({
    fontSize: '2em',
});

const ChevronRight = styled(ChevronRightIcon)({
    fontSize: '2em',
});

const SpecialText = styled('span')({
    color: '#ffc054'
});


export const Tips = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    var emoji = String.fromCodePoint(128065)
    var crown = String.fromCodePoint(128081)
    const textData = [
        <>
            <SpecialText>What is Fantasy Football?</SpecialText>
            <br/>
            {"Fantasy football is a game in which participants draft their own virtual football teams from real-life NFL players and compete against each other based on the statistical performance of their chosen players in actual NFL games. The game has become increasingly popular in recent years, and is a fun way for fans to engage with the sport beyond just watching games on TV."}
        </>,
        <>
        <SpecialText>What is Standard Scoring?</SpecialText>
            <br/>
            {"Player scores are based on yards and touchdowns. This excludes receptions."}
        </>,
        <>
        <SpecialText>What is PPR Scoring?</SpecialText>
            <br/>
            {"Player scores are based on yards and touchdowns. They also receive 1 point per reception."}
        </>,
        <>
        <SpecialText>What is Half-PPR Scoring?</SpecialText>
            <br/>
            {"Player scores are based on yards and touchdowns. They also receive 0.5 points per reception"}
        </>,
        <>
        <SpecialText>Guru Tip #1</SpecialText>
            <br/>
                {"Always do your research/mock drafts. Leagues are typically won by drafting players who will outperform their ADP (Average Draft Position). Open that third eye. "}{emoji}
        </>,
        <>
        <SpecialText>Guru Tip #2</SpecialText>
            <br/>
                {"Never spend a 1st or 2nd round pick on a QB, unless you are in a 2-QB format. 1st and 2nd rounds should almost always be dedicated to drafting star WRs and RBs."}
        </>,
        <>
        <SpecialText>Guru Tip #3</SpecialText>
            <br/>
                {"If you are playing Standard scoring format, runningbacks (RB) are KING."}{crown}
        </>,
        <>
        <SpecialText>Guru Tip #4</SpecialText>
            <br/>
                {"Because the tight end (TE) position is so top-heavy and thin, go out of your way to secure a top TE. This will give you an uncommon advantage league-wide."}
        </>,
        <>
        <SpecialText>Guru Tip #5</SpecialText>
            <br/>  
                {"Never sleeep on a fantasy defense or kicker. They can be the difference in a week won or lost."}
        </>,
        <>
        <SpecialText>Guru Tip #6</SpecialText>
            <br/>
                {"Don't be afraid to reach* for the players in the draft that you believe in."}
            <br/>
                <span style={{fontSize: '11pt', fontStyle: 'italic'}}>{"*To reach is to draft a player higher than their Average Draft Position  (ADP) & popular-consensus value"}</span>
        </>
    ]
    const handleSlideButtonClick = (direction: any) => {
        if (direction === 'next') {
            setCurrentTextIndex((currentTextIndex + 1) % textData.length);
        } else {
            setCurrentTextIndex((currentTextIndex + textData.length - 1) % textData.length);
        }
    };
    
    if (localStorage.getItem('myAuth') == 'true'){
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
                    <Leagues>Start A Fantasy League Here:
                        <br/>
                        <a href="https://fantasy.espn.com/football/league/create" target="_blank"><ESPNLogo src={espn_logo} alt="ESPN" id="espn-logo"/></a>
                        <a href="https://football.fantasysports.yahoo.com/f1/reg/createleague" target="_blank"><YahooLogo src={yahoo_logo} alt="Yahoo" id="yahoo-logo"/></a>
                    </Leagues>
                    <Ball1 src={ball}/>
                    <Guru1 src={guru}/>
                    <SlidingText>{textData[currentTextIndex]}</SlidingText>
                    <SlideButton onClick={() => handleSlideButtonClick('prev')}>
                    <ArrowIcon><ChevronLeft /></ArrowIcon>Prev Tip
                    </SlideButton>
                    <SlideButton onClick={() => handleSlideButtonClick('next')}>
                    Next Tip<ArrowIcon><ChevronRight /></ArrowIcon>
                    </SlideButton>
                    <Ball2 src={ball}/>
                    <Guru2 src={guru}/>
                    <OtherResources><span style={{color:'goldenrod', fontSize: '16pt'}}>Other Resources:</span>
                        <br/>
                        <br/>
                        <A1 to="https://draftwizard.fantasypros.com/football/mock-draft-simulator/settings/" target="_blank">Mock Draft Simulator</A1>
                        <br/>
                        <br/>
                        <A1 to="https://www.fantasypros.com/nfl/adp/overall.php" target="_blank">Current Average Draft Positions</A1>
                        <br/>
                        <br/>
                        <A1 to="https://www.fantasysp.com/nfl_trade_analyzer/" target="_blank">Third-Party Trade Analyzer</A1>
                    </OtherResources>
                </Main>
            </Root>
        )
    }else return (
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
            </NavbarContainer2>
            <Main>
                <Leagues>Start A Fantasy League Here:
                    <br/>
                    <a href="https://fantasy.espn.com/football/league/create" target="_blank"><ESPNLogo src={espn_logo} alt="ESPN" id="espn-logo"/></a>
                    <a href="https://football.fantasysports.yahoo.com/f1/reg/createleague" target="_blank"><YahooLogo src={yahoo_logo} alt="Yahoo" id="yahoo-logo"/></a>
                </Leagues>
                <Ball1 src={ball}/>
                <Guru1 src={guru}/>
                <SlidingText>{textData[currentTextIndex]}</SlidingText>
                <SlideButton onClick={() => handleSlideButtonClick('prev')}>
                <ArrowIcon><ChevronLeft /></ArrowIcon>Prev Tip
                </SlideButton>
                <SlideButton onClick={() => handleSlideButtonClick('next')}>
                Next Tip<ArrowIcon><ChevronRight /></ArrowIcon>
                </SlideButton>
                <Ball2 src={ball}/>
                <Guru2 src={guru}/>
                <OtherResources><span style={{color:'goldenrod', fontSize: '16pt'}}>Other Resources:</span>
                    <br/>
                    <br/>
                    <A1 to="https://draftwizard.fantasypros.com/football/mock-draft-simulator/settings/" target="_blank">Mock Draft Simulator</A1>
                    <br/>
                    <br/>
                    <A1 to="https://www.fantasypros.com/nfl/adp/overall.php" target="_blank">Current Average Draft Positions</A1>
                    <br/>
                    <br/>
                    <A1 to="https://www.fantasysp.com/nfl_trade_analyzer/" target="_blank">Third-Party Trade Analyzer</A1>
                </OtherResources>
            </Main>
        </Root>
    )
}
