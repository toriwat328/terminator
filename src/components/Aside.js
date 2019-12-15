import React from 'react'

class Aside extends React.Component {
    render () {
        return (
            <aside>
                <h1>Manage Bugs</h1>
                <ul>
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
