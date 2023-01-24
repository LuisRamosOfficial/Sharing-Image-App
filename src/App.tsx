import { useState } from 'react'
import firebaseConfig from './assets/Components/FirebaseConfig';
import layout_styles from './assets/styles/layout.module.scss'
import { initializeApp } from 'firebase/app';
import Navbar from './assets/Components/Navbar';

function App() {

const app = initializeApp(firebaseConfig);

  return (
    <div className={layout_styles.App}>
      <Navbar />
      <p>Stubborn</p>
    </div>
  )
}

export default App
