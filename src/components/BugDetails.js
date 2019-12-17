import React from 'react'

class BugDetails extends React.Component {

    render () {
        return (
            <article>
            <div className="bug-header">
                <h1>{this.props.showBugData[0].title}</h1>
            </div>
            <div className="bug-body">
                <p>
                Description: {this.props.showBugData[0].description}
                </p>
                <img src={this.props.showBugData[0].screenshot} alt="Screenshot of error message" />
                <p>Discovered on: {this.props.showBugData[0].datefound}</p>
                <p>Bug resolved? {this.props.showBugData[0].isresolved}</p>

                { this.props.showBugData[0].isresolved === 't'
                    ? <p>{this.props.showBugData[0].solution}</p>
                    : <p>Solution Not Found</p>}

                <button onClick={() => {
                    this.props.handleView('showProject', '', '')
                }}>Back To Project</button>
            </div>

            </article>


        )
    }
}

export default BugDetails
