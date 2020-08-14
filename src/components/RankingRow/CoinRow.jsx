import React, { useContext } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';
import styled, { keyframes } from 'styled-components';
import CanvasJSReact from '../../modules/canvasjs.react';
import { Maths, Format } from '../../modules/Utilities';
import CoinsPage from '../../pages/mainpages/CoinsPage';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * INFOS :
 * canvasjs throw (in verbose mode)
 * [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. 
 * Consider marking event handler as 'passive' to make the page more responsive.
 */



//test to hide the watermark
//
///////

/**
 * Style
 */
const Td = styled.td`
height: 50px;
border-style: solid none solid none;
border-width: 1px;
border-color: ${props => (props.theme === 'light' ? lightTheme.border : darkTheme.border)};

@media (max-width: 1100px) {
    height:40px; }
    `;
const TdRank = styled(Td)`
    padding-left: 0.2rem;
    font-weight: bold;
    text-align: left;
   `;
const TdName = styled(Td)`
   font-weight: bold;
   text-align: left;
   img{
       margin-right: 0.3rem;
   }
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

const TdUnchanged = styled(Td)`
text-align: right;
padding-right: 0.1rem;
    `;
const TdUp = styled(TdUnchanged)`
padding-right: 0;
     color: green;
     font-weight: bold;
    animation: ${blinkingGreen} ease-in-out 2s 5;
    `;
const TdDown = styled(TdUnchanged)`
padding-right: 0;
    color: red;
    font-weight: bold;
    animation: ${blinkingRed} ease-in-out 2s 5;
    `;
const TdG = styled.td`
    `;
const TdRight = styled(Td)`
    text-align: right;
    `;
const TdSupply = styled(TdRight)`
    padding-right: 0.2rem;
    `;
// const TrickChartBorder = styled.div`
// height: 1px;
// z-index: 5;
// border-width: 0 0 1px 0;
// border-style: solid none;
// border-color: ${props => (props.theme == 'light' ? lightTheme.border : darkTheme.border)};
// padding-top:6px;
// `;

/**
 * colore set of mini chart
 */
CanvasJS.addColorSet("lightThemeColor", [lightTheme.content]);
CanvasJS.addColorSet("darkThemeColor", [darkTheme.content]);

/************************************
* 
* Coins row in ranking
* 
* ******************************** */
const CoinRow = (props) => {
    const { theme } = useContext(ThemeContext);

    const link = "/coin/" + props.symbol.toLowerCase() + "/chart";
    const trysymbol = props.symbol.toLowerCase();
    /**
     * Style classNames
     */
    const styleClassVarH1 = "text-" + (props.percent_change_1h >= 0 ? "success" : "danger");
    const styleClassVarH24 = "text-" + (props.percent_change_24h >= 0 ? "success" : "danger");
    const styleClassVarD7 = "text-" + (props.percent_change_7d >= 0 ? "success" : "danger");
    const styleClassVarD30 = "text-" + (props.percent_change_30d >= 0 ? "success" : "danger");
    const styleClassVarAth = "text-" + (props.percent_from_price_ath >= 0 ? "success" : "danger");

    const lineColor = theme === 'light' ? "lightThemeColor" : "darkThemeColor";
    const bckgrndColor = theme === 'light' ? lightTheme.container : darkTheme.container;

    // const graphStyle = {
    //     margin: '0',
    //     padding: '2rem 0',

    // };

    const textLinkColor = theme === 'light' ? lightTheme.text : darkTheme.text;
    const linkStyle = {
        color: `${textLinkColor}`
    }
    const activeLink = {
        color: `${textLinkColor}`
    };


    /**
     * chart data
     */
    const dataSet = props.priceSet === undefined ?
        [[0, 0], [0, 0]]
        : props.priceSet.map(set => {
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
        interactivityEnabled: false,
        height: 40,
        colorSet: lineColor,
        backgroundColor: bckgrndColor,
        toolTip: {
            enabled: false
        },
        axisX: {
            lineColor: "transparent",
            gridDashType: "dot",
            gridThickness: 0,
            valueFormatString: " ",
            tickLength: 0,
            margin: 0,
        },
        axisY: {
            lineColor: "transparent",
            gridDashType: "dot",
            gridThickness: 0,
            valueFormatString: " ",
            tickLength: 0,
            argin: 0,
            scaleBreaks: {
                customBreaks: [{
                    startValue: 0,
                    endValue: Maths.getMinOfSerieInSet(dataSet, "y"), //dataSet[0].y,  
                    color: " ",
                    type: " "
                }]
            }
        },
        data: [{
            lineThickness: 1,
            yValueFormatString: " ",
            xValueFormatString: " ",
            type: "spline",
            dataPoints: dataSet
        }],
        dataSeries: {
            cursor: " "
        }
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


    const price = Format.toCurrencyNDigits(props.price, 'USD', 8);
    const volume = Format.toCurrencyNDigits(props.volume_24h, 'USD', 0);
    const marketcap = Format.toCurrency(props.market_cap, 'USD');

    return (
        <>
            <tr>
                <TdRank className="ml-1" theme={theme}>{props.rank}</TdRank>
                <TdName theme={theme}>
                    <NavLink to={link} exact style={linkStyle} activeStyle={activeLink}>
                        <span><img src={icon} alt={props.symbol} width={"15px"} /></span>
                        <span >{props.name}</span>
                    </NavLink>
                </TdName>
                {
                    props.snapshotChange === 'unchanged' ?
                        <TdUnchanged theme={theme}>{price}</TdUnchanged> :
                        props.snapshotChange === 'up' ?
                            <TdUp theme={theme}>{price}</TdUp> :
                            <TdDown theme={theme}>{price}</TdDown>
                }
                <TdRight className={styleClassVarH1} theme={theme}>{props.percent_change_1h}</TdRight>
                <TdRight className={styleClassVarH24} theme={theme}>{props.percent_change_24h}</TdRight>
                <TdRight className={styleClassVarD7} theme={theme}>{props.percent_change_7d}</TdRight>
                {
                    props.priceSet === undefined ?
                        <TdG theme={theme}>
                            ...   .no data yet.  ... {/* null */}
                        </TdG>
                        :
                        <TdG theme={theme}>
                            <CanvasJSChart className="chart" theme={theme} options={options} />
                            {/* <TrickChartBorder theme={theme}></TrickChartBorder> */}
                        </TdG>

                }
                <TdRight className={styleClassVarD30} theme={theme}>{props.percent_change_30d}</TdRight>

                <TdRight className={styleClassVarAth} theme={theme}>{props.percent_from_price_ath}</TdRight>
                <TdRight theme={theme}>{volume}</TdRight>
                <TdRight theme={theme}>{marketcap}</TdRight>
                <TdSupply theme={theme} >{props.circulating_supply.toLocaleString()}</TdSupply>


            </tr>

            <Route exact path={link} >
                <CoinsPage coin={trysymbol} />
            </Route>

        </>
    );

}

export default withRouter(CoinRow);