import React from 'react'

class Bugs extends React.Component {
    render () {
        return (
            <article>
                <div className="bug-header">
                    <h1>{this.props.bugData.title}</h1>
                </div>
                <div className="bug-body">
                    <p>
                    Description: {this.props.bugData.description}
                    </p>
                    <img src={this.props.bugData.screenshot} alt="Screenshot of error message" />
                    <p>Discovered on: {this.props.bugData.datefound}</p>
                    <p>Bug resolved? {this.props.bugData.isresolved}</p>

                    { this.props.bugData.isresolved === 't'
                        ? <p>{this.props.bugData.solution}</p>
                        : <p>Solution Not Found</p>}
                </div>
                <div className="bug-options">
                    <ul>
                    <li onClick={() => {
                        this.props.showBug(this.props.bugData);
                    }}>View Bug</li>

                        <li onClick={() => {
                            this.props.handleView('editBug',
                            this.props.bugData)
                        }}>Edit Bug</li>

                        <li onClick={() => {
                            this.props.deleteBug(this.props.bugData.id)
                        }}>Delete Bug</li>
                    </ul>
                </div>
            </article>
        )
    }
}

export default Bugs
