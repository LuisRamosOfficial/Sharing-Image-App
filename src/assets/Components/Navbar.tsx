import React, { FC } from 'react'
import styles from "../styles/navbar.module.scss"

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
        <p>Sharing Image App</p>
    </nav>
  )
}

export default Navbar