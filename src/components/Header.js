import React from 'react'
import bugs from './bug.png'

class Header extends React.Component {
    render () {
        return (
            <header>
                <span>squash coding bugs with the</span>
                <h1>TERMINATOR</h1>
                <marquee scrollamount="10"
                        direction="left"
                        behavior="scroll">
                <img className="running-bugs" src={bugs} alt="bugs running across screen" />
                </marquee>
            </header>
        )
    }
}

export default Header
