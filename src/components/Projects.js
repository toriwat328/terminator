import React from 'react'

class Projects extends React.Component {

    render () {
        return (
            <article>
                <div className="bug-header">
                    <h3>{this.props.projectData.name}</h3>
                    <h4>Project ID: {this.props.projectData.id}</h4>
                </div>
                <div className="bug-body">
                    <p>
                    Start of Project: {this.props.projectData.start}
                    </p>
                    <p>Deadline: {this.props.projectData.deadline}</p>
                    <p>Language: {this.props.projectData.language}</p>

                </div>
                <div className="bug-options">
                    <ul className="nav-bar">
                        <li onClick={() => {
                            this.props.showProject(this.props.projectData);



                        }}>View Project</li>
                        <li onClick={() => {
                            this.props.handleView('editProject',
                            this.props.projectData, '')
                        }}>Edit Project</li>
                        <li onClick={() => {
                            this.props.deleteProject(this.props.projectData.id)
                        }}>Delete Project</li>
                    </ul>
                </div>
            </article>
        )
    }
}

export default Projects
