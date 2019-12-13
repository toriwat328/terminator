import React from 'react';
import Header from './components/Header.js'
import Aside from './components/Aside.js'
import Main from './components/Main.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: {
                page: 'bugs'
            }
        }
    }


    render () {
        return (
            <div className="outer-container">
                <Header/>
                <div className="main-container">
                    <Aside/>
                    <Main/>
                </div>
            </div>
        )
    }
}

export default App
