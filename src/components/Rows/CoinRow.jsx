import React, { useContext } from 'react';
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import {lightTheme, darkTheme} from '../../themes/Theme';
import styled from 'styled-components';
import CanvasJSReact from '../../modules/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/************************************
 * 
 * Coins row in ranking
 * 
 * ******************************** */

const Td = styled.td`
    width: 2vw;
    `;
    const TdG = styled.td`
    width: 150px;
    height: 20px;
    margin: 0;
    padding: 0;
    `;

    CanvasJS.addColorSet("lightThemeColor", [ lightTheme.text ]);
    CanvasJS.addColorSet("darkThemeColor", [ darkTheme.text ]);
  
export default function CoinRow(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    console.log(props);

    function getAvailableIcon() {
        try {
            var foo = require(`../../assets/coloredsvg/${props.svg}`);
            return foo;
        }
        catch (e) {
            if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
                return require('../../assets/coloredsvg/generic.svg');
             } else{
                throw e;}
        }
    }
    const icon = getAvailableIcon();

    const r = props.priceSet.data.prices.map(set =>{
        return {
            x: set[0],
            y: set[1]
        }
    })


const lineColor = theme == 'light' ? "lightThemeColor" : "darkThemeColor";
const bckgrndColor = theme == 'light' ? lightTheme.body : darkTheme.body;

    console.log(lineColor, theme);
    
   
  
    const options = {
        title: {
          text: null
        },
        width: 120,
        height: 40,
        colorSet:  lineColor,
        backgroundColor: bckgrndColor,
        toolTip:{
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
                    endValue: r[0].y,
                    color: " ",//"orange",
                    type: " "//"zigzag"
                }]
            }
        },
        data: [{				
            yValueFormatString: " ",
            xValueFormatString: " ",
            type: "spline",
                  dataPoints: r
         }]
     }
     
        console.log(options);
        console.log("priceset",props.priceSet);
console.log("priceset",props.priceSet.data.prices);

const graphStyle = {
    margin: 0,
    padding: 0,
  };

    return (
        <>
        <tr>
                        <Td>{props.rank}</Td> 
            <Td> 
                <span><img src={icon} alt={props.symbol} width={"15px"}/></span>
                <span>{props.name}</span>
            </Td>  
            <Td>{props.price}</Td> 
            <Td>{props.percent_change_1h}</Td> 
            <Td>{props.percent_change_24h}</Td> 
            <Td>{props.percent_change_7d}</Td> 
            <TdG><CanvasJSChart className="chart" style={graphStyle} options = {options}/></TdG> 
            <Td>{props.percent_change_30d}</Td> 

            <Td>{props.percent_from_price_ath}</Td> 
            <Td>{props.volume_24h}</Td>  
            <Td>{props.market_cap}</Td>          
            <Td>{props.circulating_supply}</Td> 
           
 
        </tr>
        {/* // <Route path="/coin/:id" component={CoinPage} /> */}
    </>
    );

}