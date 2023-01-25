import { useState, createContext } from 'react';
import firebaseConfig from './assets/Components/FirebaseConfig';
import layout_styles from './assets/styles/layout.module.scss';
import { initializeApp } from 'firebase/app';
import Navbar from './assets/Components/Navbar';
import { getStorage, ref } from 'firebase/storage';
import Content from './assets/Components/Content';

function App() {
	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);
  const storageRef = ref(storage, 'images');

	return (
		<div className={layout_styles.App}>
			<Navbar firebase={app} />
			<Content firebase={app} />
		</div>
	);
}

export default App;
