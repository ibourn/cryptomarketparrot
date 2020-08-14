import React, { useState, useEffect } from 'react';
import './Loader.css';

import styled from 'styled-components';

/**
 * Style
 */
const Div = styled.div`{
  height: 100px;
  margin-top: 50px;
 
}`;
/**
 * 
 * Loader component waiting for api responses
 */
export default function Loader(props) {
  const [msg, setMsg] = useState("Waiting for birds and boats to bring back data ...")

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      updateMsg();
    }, 4000);

    return () => clearInterval(interval);
  })

  const updateMsg = () => {
    setMsg("There are still not there.. they may be blocked in a tempest of requests. Just try to refresh");
  }

  return (
    <>
      <Div className="row">
        <div id="loader">
          <div id="shadow"></div>
          <div id="box"></div>
        </div>
      </Div>
      <Div className="row d-flex justify-content-end">
        <span>{msg}</span>
      </Div>
    </>
  )
}


