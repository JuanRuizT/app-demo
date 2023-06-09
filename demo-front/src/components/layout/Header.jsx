import React, {useState} from 'react';
import {Auth} from '@aws-amplify/auth';
import {AppBar, Button, Tab, Tabs, Toolbar, useMediaQuery, useTheme} from '@mui/material';
import {Image} from '@aws-amplify/ui-react';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import DrawerComp from './Drawer';
import {useAuthContext} from '../../context/AuthContext';

const Header = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

	const {user} = useAuthContext();

	const signOutFunction = () => {
		Auth.signOut();
	};

	return (
		<AppBar sx={{background: 'black'}}>
			<Toolbar>
				<Image alt="logo" src={logo} style={{width: '100px', height: '50px'}} />
				{isMatch ? (
					<DrawerComp />
				) : (
					<>
						<Tabs
							sx={{marginLeft: 'auto'}}
							indicatorColor="primary"
							value={value}
							onChange={(e, value) => {
								setValue(value);
							}}>
							<Tab label="Companies" style={{color: 'white'}} onClick={() => navigate('/companies')} />
							{/* <Tab label="Articles" style={{color: 'white'}} /> */}
						</Tabs>
						<div className="row justify-content-center" style={{color: 'white', marginLeft: 'auto'}}>
							<div className="col-7">{user.email}</div>
							<div className="col-7">Role: {user?.groups ?? 'Visitors'}</div>
						</div>
						<Button style={{color: 'white', borderColor: 'white'}} variant="outlined" onClick={signOutFunction}>
							Logout
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
