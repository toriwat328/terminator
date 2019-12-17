import React from 'react'
import bug from './bugfavi.png'

class Aside extends React.Component {
    render () {
        return (
            <aside>
                <h2>Manage Bugs</h2>
                <ul className="bug-icon">
                    <li onClick={() => {this.props.handleView('home')
                    }}>Main</li>
                    <li onClick={() => {this.props.handleView('addIssue')
                        }}>Add Bug</li>
                </ul>
            </aside>
        )
    }
}

export default Aside
