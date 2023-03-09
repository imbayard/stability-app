import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <header>
            <h1>Stable.</h1>
            <nav>
                <ul>
                <li><a href="http://localhost:3001/" class="home-icon"><span>Home</span></a></li>
                <li><a href="http://localhost:3001/" >Profile</a></li>
                </ul>
            </nav>
        </header>
    )
}