import React from 'react'
import Bugs from './Bugs.js'

class ProjectDetails extends React.Component {
    render () {
        return (
            <article>
                <div>
                    <h3>{this.props.showData[0].name}</h3>
                </div>
                <div>
                    <p>Start of Project: {this.props.showData[0].start}</p>
                    <p>Deadline: {this.props.showData[0].deadline}</p>
                    <p>Language: {this.props.showData[0].language}</p>

                </div>

                <div>
                <h3>Bugs</h3>
                <button onClick={() => {
                    this.props.handleView('addBug');
                }}>Record New Bug</button>

                {this.props.showData[0].project_issue_id !== null ?

                    this.props.showData[0].project_issue_id.map((bugData) => (
                        <Bugs
                            key={bugData.id}
                            bugData={bugData}
                            showBug={this.props.showBug}

                        />
                    )) :

                        ''

                    }
                </div>

            </article>


        )
    }
}

export default ProjectDetails
