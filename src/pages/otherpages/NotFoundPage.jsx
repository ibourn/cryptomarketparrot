import React from 'react';
import './NotFound.css';



export default function NotFound(props) {
    return (
        <div id="notfoundContainer">
            <div id="notfoundDiv">
                <p id="notfound" title="404">404</p>
                <p className="notfoundComment">
                    it seems you are lost, this page does not exist
                  </p>
            </div>
            <div>
                <p className="notfoundComment">
                    (following an example from Piotr Galor : Clean CSS Glitch)
                </p>
            </div>
        </div>
    );

}