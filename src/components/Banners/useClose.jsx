import React, { useState } from 'react';

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