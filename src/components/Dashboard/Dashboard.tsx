import React, {useState} from "react";
import { Drawer as MUIDrawer,
    ListItem, 
    List, 
    ListItemText, 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline, 
    Box,
    Dialog, // new item
    DialogActions, // new item
    DialogContent, // new item
    DialogContentText, // new item
    DialogTitle // new item
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight,ChevronLeft } from "@mui/icons-material";
import { theme } from "../../Theme/theme";
import { DataTable } from '../DataTable';
import { GridOverlay } from '@mui/x-data-grid';
import { PlayerForm } from '../PlayerForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const drawerWidth = 240;

const myStyles = {
appBar : {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
},
appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
    }),
},
menuButton: {
    marginRight: theme.spacing(2),
},
hide: {
    display: 'none',
},
drawer: {
    width: drawerWidth,
    flexShrink: 0,


},
drawerPaper: {
    width: drawerWidth,

},
drawerHeader: {
    display: 'flex',
    width: drawerWidth,
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'

},
content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
},
contentShift: {
    transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
},
toolbar:{
    display: 'flex',
    backgroundColor: 'rgb(36,33,36)'
},
toolbar_button: {
    marginLeft: 'auto',
    backgroundColor: '#4649d2',
    color: '#eab8a2',
    fontWeight: 'bolder',
    fontFamily: 'Bangers',
    fontSize: '15pt',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    boxShadow: 1,
    '&:hover': {
        backgroundColor: '#468fd2',
        color: '#d2468f',
        boxShadow: 6,
    },
},
popUp: {
    width: '2000px',
    color: 'red'
},
linky: {
    textDecoration: 'none',
}
};


export const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Handle Dialog Open/Close
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const itemsList = [
        {
        text: 'Home',
        onClick: () => navigate('/')
        },
        {
            text: 'Playerbase',
            onClick: () => navigate('/playerbase')
        },
        {
            text: 'Tips',
            onClick: () => navigate('/tips')
        },
        {
        text: 'Sign Out',
        onClick: () => navigate('/signout')
        }
    ]

    const itemsList2 = [
        {
        text: 'Home',
        onClick: () => navigate('/')
        },
        {
            text: 'Playerbase',
            onClick: () => navigate('/playerbase')
        },
        {
            text: 'Tips',
            onClick: () => navigate('/tips')
        },
        {
        text: 'Sign In',
        onClick: () => navigate('/signin')
        },
        {
        text: 'Sign Up',
        onClick: () => navigate('/signup')
        }
    ]

    if (localStorage.getItem('myAuth') == 'true'){
        return (
            <Box sx={{display:'flex', backgroundColor: '#e1e8e3', minHeight: '100vh'}} >
                <CssBaseline />
                <AppBar
                    sx={open ? myStyles.appBarShift : myStyles.appBar } 
                    position="fixed"
                >
                <Toolbar sx={myStyles.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={ open ? myStyles.hide : myStyles.menuButton }
                    >
                    <MenuIcon />
                    </IconButton>
                    <Button sx={myStyles.toolbar_button} component={Link} to='/playerbase'>Check Playerbase/Add Players</Button>
                    <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                    </Dialog>
                </Toolbar>
                </AppBar>
                <MUIDrawer
                    sx={open ? myStyles.drawer : myStyles.hide}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    style={{width:drawerWidth}}
                >
                <Box sx={myStyles.drawerHeader}>
                <Typography sx={{fontFamily: 'Bangers', textAlign: 'center' }} variant="h6" noWrap><span style={{marginRight: '2.5vh', color: 'black'}}>Depth Chart</span></Typography>
                        <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                </Box>
                <Divider />
                <Box sx={{backgroundColor: '#e9f0d6'}} >
                <List>
                    {itemsList.map((item, index) => {
                    const { text, onClick } = item;
                    return (
                        <ListItem key={text} onClick={onClick}>
                        <ListItemText>
                            <Typography sx={{fontFamily: 'Bangers', textAlign:'center'}}
                            variant="body1">
                            {text}
                            </Typography>
                        </ListItemText>
                        </ListItem>
                    );
                })}
                </List>
                </Box>
                </MUIDrawer>
                <Box sx={ myStyles.content } >
                    <Box sx={ myStyles.drawerHeader }/>
                    <DataTable />
                </Box>
            </Box>
            )
    } else return (
        <Box sx={{display:'flex', backgroundColor: '#e1e8e3', minHeight: '100vh'}} >
            <CssBaseline />
            <AppBar
                sx={open ? myStyles.appBarShift : myStyles.appBar } 
                position="fixed"
            >
            <Toolbar sx={myStyles.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={ open ? myStyles.hide : myStyles.menuButton }
                >
                <MenuIcon />
                </IconButton>
                <Button sx={myStyles.toolbar_button} component={Link} to='/playerbase'>Check Playerbase/Add Players</Button>
                <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                </Dialog>
            </Toolbar>
            </AppBar>
            <MUIDrawer
                sx={open ? myStyles.drawer : myStyles.hide}
                variant="persistent"
                anchor="left"
                open={open}
                style={{width:drawerWidth}}
            >
            <Box sx={myStyles.drawerHeader}>
            <Typography sx={{fontFamily: 'Bangers', textAlign: 'center' }} variant="h6" noWrap><span style={{marginRight: '2.5vh', color: 'black'}}>Depth Chart</span></Typography>
                    <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
            </Box>
            <Divider />
            <Box sx={{backgroundColor: '#e9f0d6'}} >
            <List>
                {itemsList2.map((item, index) => {
                const { text, onClick } = item;
                return (
                    <ListItem key={text} onClick={onClick}>
                    <ListItemText>
                        <Typography sx={{fontFamily: 'Bangers', textAlign:'center'}}
                        variant="body1">
                        {text}
                        </Typography>
                    </ListItemText>
                    </ListItem>
                );
            })}
            </List>
            </Box>
            </MUIDrawer>
            <Box sx={ myStyles.content } >
                <Box sx={ myStyles.drawerHeader }/>
                <DataTable />
            </Box>
        </Box>
        )
}