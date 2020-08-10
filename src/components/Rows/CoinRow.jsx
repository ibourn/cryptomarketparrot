import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink, withRouter, useHistory, useParams } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';
import styled, { keyframes } from 'styled-components';
import CanvasJSReact from '../../modules/canvasjs.react';
import CoinsPage from '../../pages/mainpages/CoinsPage';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


/**
 * Style
 */
const Td = styled.td`
    width: 2vw;
    `;

/*styling the prices*/
const blinkingGreen = keyframes` 
0%{  opacity: 1; }
25%{ opacity: 0.4; }
50%{ opacity: 0.8; }
75%{ opacity: 0.4; }
100%{opacity: 1; }
`;
const blinkingRed = keyframes` 
0%{  opacity: 1; }
25%{ opacity: 0.4; }
50%{ opacity: 0.8; }
75%{ opacity: 0.4; }
100%{opacity: 1; } 
`;

const TdUnchanged = styled.td`
    width: 2vw;
    `;
const TdUp = styled.td`
    width: 2vw;
     color: green;
     font-weight: bold;
    animation: ${blinkingGreen} ease-in-out 2s 5;
    `;
const TdDown = styled.td`
    width: 2vw;
    color: red;
    font-weight: bold;
    animation: ${blinkingRed} ease-in-out 2s 5;
    `;
const TdG = styled.td`
    width: 150px;
    height: 20px;
    margin: 0;
    padding: 0;
    `;
/**
 * colore set of mini chart
 */
CanvasJS.addColorSet("lightThemeColor", [lightTheme.text]);
CanvasJS.addColorSet("darkThemeColor", [darkTheme.text]);

/************************************
* 
* Coins row in ranking
* 
* ******************************** */
const CoinRow = (props) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const link = "/coin/" + props.symbol.toLowerCase() + "/chart";
    const trysymbol = props.symbol.toLowerCase();
    /**
     * Style classNames
     */
    const styleClassPrice = "text-" + (props.percent_from_price_ath >= 0 ? "success" : "danger");

    const styleClassVarH1 = "text-" + (props.percent_change_1h >= 0 ? "success" : "danger");
    const styleClassVarH24 = "text-" + (props.percent_change_24h >= 0 ? "success" : "danger");
    const styleClassVarD7 = "text-" + (props.percent_change_7d >= 0 ? "success" : "danger");
    const styleClassVarD30 = "text-" + (props.percent_change_30d >= 0 ? "success" : "danger");
    const styleClassVarAth = "text-" + (props.percent_from_price_ath >= 0 ? "success" : "danger");

    const lineColor = theme == 'light' ? "lightThemeColor" : "darkThemeColor";
    const bckgrndColor = theme == 'light' ? lightTheme.body : darkTheme.body;

    const graphStyle = {
        margin: 0,
        padding: 0,
    };

    /**
     * chart data
     */
    const dataSet = props.priceSet.data.prices.map(set => {
        return {
            /*paprika
            x: set.timestamp,
            y: set.price
            */
            //geko
            x: set[0],
            y: set[1]
            //*/
        }
    })
    /**
    * chart settings
    */
    const options = {
        title: {
            text: null
        },
        width: 120,
        height: 40,
        colorSet: lineColor,
        backgroundColor: bckgrndColor,
        toolTip: {
            enabled: false   //enable here
        },
        axisX: {
            gridDashType: "dot",
            gridThickness: 0,
            valueFormatString: " ",
            tickLength: 0,
            margin: 0,
        },
        axisY: {
            gridDashType: "dot",
            gridThickness: 0,
            valueFormatString: " ",
            tickLength: 0,
            argin: 0,
            scaleBreaks: {
                //autoCalculate: true //change it to false
                customBreaks: [{
                    startValue: 0,
                    endValue: dataSet[0].y,
                    color: " ",
                    type: " "
                }]
            }
        },
        data: [{
            yValueFormatString: " ",
            xValueFormatString: " ",
            type: "spline",
            dataPoints: dataSet
        }]
    }

    function getAvailableIcon() {
        try {
            const filename = require(`../../assets/coloredsvg/${props.svg}`);
            return filename;
        }
        catch (error) {
            if (error instanceof Error && error.code === "MODULE_NOT_FOUND") {
                return require('../../assets/coloredsvg/generic.svg');
            } else {
                throw error;
            }
        }
    }
    const icon = getAvailableIcon();





    return (
        <>
            <tr>
                <Td>{props.rank}</Td>
                <Td>
                    <Link to={link} exact>
                        <span><img src={icon} alt={props.symbol} width={"15px"} /></span>
                        <span >{props.name}</span>
                    </Link>
                </Td>
                {
                    props.snapshotChange === 'unchanged' ?
                        <TdUnchanged>{props.price}</TdUnchanged> :
                        props.snapshotChange === 'up' ?
                            <TdUp>{props.price}</TdUp> :
                            <TdDown>{props.price}</TdDown>
                }
                <Td className={styleClassVarH1}>{props.percent_change_1h}</Td>
                <Td className={styleClassVarH24}>{props.percent_change_24h}</Td>
                <Td className={styleClassVarD7}>{props.percent_change_7d}</Td>
                {
                props.priceSet.status == 429 ? null :

                    <TdG>
                        <CanvasJSChart className="chart" style={graphStyle} options={options} />
                        </TdG>
                }
                <Td className={styleClassVarD30}>{props.percent_change_30d}</Td>

                <Td className={styleClassVarAth}>{props.percent_from_price_ath}</Td>
                <Td>{props.volume_24h}</Td>
                <Td>{props.market_cap}</Td>
                <Td>{props.circulating_supply}</Td>


            </tr>

            <Route exact path={link} >
                <CoinsPage coin={trysymbol} />
            </Route>

        </>
    );

}

export default withRouter(CoinRow);