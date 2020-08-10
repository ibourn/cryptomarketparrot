import React from 'react';
import styled from 'styled-components';

/**
 * Style
 */
const CloseButton = styled.button`
    margin-top: -0.5rem;
    justify-content: end;
    span {
        border: none; 
    }`;

    /************************************
 * 
 * Pub banner => closable with useClose and BannerClose
 * 
 * @TODO => transform it in container, passing component to show as children
 * to wrap the content inside the closer instead of having the need of useClose and 
 * ternary condition in the component to close
 * 
 * ******************************** */
export default function BannerCloser({ closePub }) {
    return (
        <CloseButton type="button" className="close" onClick={closePub} aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </CloseButton>
    );
}