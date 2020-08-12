import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import styled from 'styled-components';

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';


/**
 * Styles
 */
const Li = styled.li`
    padding: 0.5rem;
    font-size: 0.9rem;
    list-style-type: square;
    list-style-position: inside;
`;
const SpanOrigin = styled.span`
margin-left: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
`;
const StyledLink = styled(Link)`
padding-left: 0.5rem;
`;

/************************************
 * 
 * CoinMedias page
 * 
 * @ integrate cointelegraph widget
 * 
 * ******************************** */
export default function CoinMedias(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const colorStyle = theme == 'light' ? { backgroundColor: `${lightTheme.container}`,
    color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
    color: `${darkTheme.content}` }

    const activeLink = theme == 'light' ?  {color: `${lightTheme.text}`} :
    {color: `${darkTheme.text}`} ;

    return (
        <section className="row mt-3" style={colorStyle}>

            <ul><SpanOrigin> Last From Twitter :</SpanOrigin>
{
                    props.coinTwitter.map(res => {
                        return (
                            <Li key={res.status_id}>
                                <StyledLink to={res.status_link} style={colorStyle}
                                 activeLink={activeLink}>
                                    {res.status}
                                </StyledLink>
                            </Li>
                        )
                    })

                }
            </ul>
        </section>


    )

}