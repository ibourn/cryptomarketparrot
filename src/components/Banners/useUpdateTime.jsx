import React, { useState } from 'react';

/************************************
 * 
 * isolation of the update time refresh 
 * 
 * ******************************** */
export const useUpdateTime = () => {

    const [lastUpdateTime, setLastUpdateTime] = useState();

    const refreshUpdateTime = (newUpdateTime) => {
        setLastUpdateTime(newUpdateTime)
    };
    return [lastUpdateTime, refreshUpdateTime];
};