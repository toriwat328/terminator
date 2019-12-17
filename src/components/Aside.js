import React from 'react'
import bug from './bugfavi.png'

class Aside extends React.Component {
    render () {
        return (
            <aside>
                <h2>Manage Projects</h2>
                <ul className="nav-bar">
                    <li onClick={() => {this.props.handleView('home', '', '')
                        }}>Main</li>
                    <li onClick={() => {this.props.handleView('addProject', '', '')
                }}>Add Project</li>
                </ul>
            </aside>
        )
    }
}

export default Aside
