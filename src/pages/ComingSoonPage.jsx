import React from 'react'
import "./ComingSoonPage.css";


function ComingSoonPage(props) {

        return (
            <>
                <div className="app">
                    <div className="title">working on it</div>
                    <div className="subtitle">nice to see you again soon</div>
                    <div className="soon">{props.name} Coming Soon ...</div>
                </div>
            </>
        )
}
export default ComingSoonPage;