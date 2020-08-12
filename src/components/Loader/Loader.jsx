import React from 'react';
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

  
  return (
    <>
      <Div className="row">
        <div id="loader">
          <div id="shadow"></div>
          <div id="box"></div>
        </div>
      </Div>
      <Div className="row d-flex justify-content-end">
        <span>Waiting for birds and boats to bring back data ...</span>
      </Div>
    </>
  )
}


