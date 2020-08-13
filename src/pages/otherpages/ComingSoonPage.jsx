import React from 'react'
import { useLocation } from "react-router-dom";

import "./ComingSoonPage.css";


function ComingSoonPage() {
const { pathname } = useLocation();

        return (
            <>
                <div className="app">
                    <div className="title">working on it</div>
                    <div className="subtitle">nice to see you again soon</div>
                    <div className="soon">{pathname.replace("/", "") + " page"} Coming Soon ...</div>
                </div>
            </>
        )
}
export default ComingSoonPage;