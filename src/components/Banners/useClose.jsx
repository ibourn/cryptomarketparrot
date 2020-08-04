import React, { useState } from 'react';
//import paprikaLogo from "./coinpaprika.svg"
import styled from 'styled-components';

/************************************
 * 
 * isolation of the close function to make it reusable
 * 
 * ******************************** */

export const useClose = () => {

    const [isOpened, setIsOpened] = useState(true);

    const closeElement = () => {
        setIsOpened(false);
    };

    return [isOpened, closeElement];
};