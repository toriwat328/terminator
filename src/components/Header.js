import React from 'react'
import bugs from './bug.png'

class Header extends React.Component {
    render () {
        return (
            <header>
                <span>squash coding bugs with the</span>
                <h1>TERMINATOR</h1>
                <img src={bugs} alt="bugs running across screen" />

            </header>
        )
    }
}

export default Header
