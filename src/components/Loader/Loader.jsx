import React from 'react';
import './Loader.css';


import styled from 'styled-components';

export default function Loader(props) {

const Div = styled.div`{
    height: 100px;
   
}`;
const Span = styled.span`{
margin-top: 50%;
}`;
return(
    <>
<div className="row">
<div id="loader">
  <div id="shadow"></div>
  <div id="box"></div>
</div>
</div>
<Div className="row d-flex justify-content-end align-self-end">
<span>Waiting for birds and boats to bring back data ...</span>
</Div>
</>
)
}


