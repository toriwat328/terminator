import React from 'react'

class Aside extends React.Component {
    render () {
        return (
            <aside>
                <h1>Manage Projects</h1>
                <ul>
                    <li onClick={() => {this.props.handleView('home')
                        }}>Main</li>
                    <li onClick={() => {this.props.handleView('addProject')
                }}>Add Project</li>
                </ul>
            </aside>
        )
    }
}

export default Aside
