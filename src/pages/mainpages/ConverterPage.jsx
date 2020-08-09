import React from 'react';

/************************************
 * 
 * ConverterPage
 * 
 * ******************************** */

export default function ConverterPage(props) {
    return (
        <div>
            The ConverterPage
            <label htmlFor="convInput"> amount to convert</label>
            <input id="convInput" type="text" name="convInput"/>
            <select name="" id="originCur">origin currency</select>
            <span>to</span>
            <select name="" id="finalCur">fianl currency</select>
            <button>convert</button>
            <span id="convResult">resutl</span>
        </div>
    );

}