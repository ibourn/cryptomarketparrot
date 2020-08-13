import { useState, useEffect } from 'react';

/************************************
 * 
 * isolation of the close function to make it reusable
 * 
 * if banner is vertical => close it under a specific viewport 
 * 
 * ******************************** */
export const useClose = (isVertical = false) => {

    const [isOpened, setIsOpened] = useState(true);
    // const [isClosedbyUser, setIsClosedByUser] = useState(false);
    //const [windowWidth, setWindowWidth] = useState(0);

    const closeElement = () => {
        setIsOpened(false);
        //setIsClosedByUser(true);
    };

    useEffect(() => {
        if (isOpened) {
            resizeWindow();
            window.addEventListener("resize", resizeWindow);
        }
        return () => window.removeEventListener("resize", resizeWindow);
    });


    const resizeWindow = () => {
        //setWindowWidth(window.innerWidth);
        if (window.innerWidth <= 920 && isVertical) {
            setIsOpened(false);
        }
    };

    return [isOpened, closeElement];
};