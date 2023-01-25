import React, { Dispatch, FC, useState, SetStateAction } from 'react';
import styles from '../styles/navbar.module.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {LoginAction} from './../Redux/Actions/Actions';
import Upload from './Upload';



const Navbar: FC<any> = ({firebase}) => {
	const [logged, setLogged] = useState<boolean>(false);
	const [upload, setUpload] = useState<boolean>(false);

	return (
		<nav className={styles.navbar}>
			<p>Sharing Image App</p>
			{logged ? <Profile setUpload={setUpload} /> : <Login setLogged={setLogged} />}
			{upload ? <Upload firebase={firebase} setUpload={setUpload}/> : <></>}
		</nav>
	);
};
interface ProfileProps {
	setUpload: Dispatch<SetStateAction<boolean>>;
}

const Profile: FC<ProfileProps> = ({setUpload}) => {
	const loginInfo = useSelector((state: any) => state.login);
	return (
		<div className={styles.Profile}>
			<button onClick={() => {setUpload(true)}} className={styles.Upload}>
				<img src="/Upload.png" />
				Upload
			</button>
			<img className={styles.Pic} src={loginInfo.ProfilePic} />
		</div>
	);
}

interface LoginProps {
	setLogged: Dispatch<SetStateAction<boolean>>
}
const Login: FC<LoginProps> = ({setLogged}) => {
	const dispatch = useDispatch();
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	const clickHandler = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;

				if (user.displayName && user.photoURL && user.email) {
					
					dispatch(LoginAction(user.displayName, user.photoURL, user.email));
					setLogged(true)
				}
				else {
					console.log("super error")
				}
			})
			.catch((error) => {});
	};

	return <button className={styles.Login} onClick={() => clickHandler()}>Login</button>;
};

export default Navbar;
