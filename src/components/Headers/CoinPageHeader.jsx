import React, { useContext } from 'react';

import { Format } from '../../modules/Utilities';
import styled from 'styled-components';
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';

/**
 * 
 * Styles
 */
const SpanLabel = styled.span`
font-size: 0.8rem;
font-weight: bold;
`;
const SpanData = styled.span`
font-size: 0.9rem;
margin-left: 0.2rem;
`;
const SpanName = styled.span`
font-size: 2rem;
`;
const SpanSymbol = styled.span`
font-size: 1.5rem;
margin-left: 1.5rem;
`;
const Plogo = styled.p`
text-align: center;
`;
const H1 = styled.h1`
width: 100%;
text-align: center;
`;
const P = styled.p`
margin-right: 0.5rem;
`;

/************************************
 * 
 * CoinPage Header
 * 
 * ******************************** */
export default function CoinPageHeader(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const colorStyle = theme == 'light' ? { backgroundColor: `${lightTheme.container}`,
    color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
    color: `${darkTheme.content}` }
    
    return (
        <header className="row mt-3 mb-3" style={colorStyle}>
            <div className="col-3">
                <Plogo><img src={props.coinInfo.image.small} alt="" /></Plogo>
                <P>
                    <SpanLabel>Market cap rank :</SpanLabel>
                    <SpanData>{props.coinInfo.market_data.market_cap_rank}</SpanData>
                </P>

                <P>
                                <SpanLabel>Change % (24h)</SpanLabel>
                                <SpanData>{Format.toCurrencyNDigits(props.coinInfo.market_data.price_change_percentage_24h,'USD',5)}</SpanData>
                            </P>
                            <P>
                                <SpanLabel>Total volume :</SpanLabel>
                                <SpanData>{Format.toCurrencyNDigits(props.coinInfo.market_data.total_volume.usd,'USD',0)}</SpanData>
                            </P>
            </div>

            <div className="col-9">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <H1>
                                <SpanName>{props.coinInfo.name}
                                </SpanName><SpanSymbol>
                                    {props.coinInfo.symbol}</SpanSymbol>
                            </H1>
                        </div>
                        <div className="row flex justify-content-between">
                            <P>
                                <SpanLabel>High (24h)</SpanLabel>
                                <SpanData>{Format.toCurrencyNDigits(props.coinInfo.market_data.high_24h.usd,'USD',2)}</SpanData>
                            </P>
                            <P>
                                <SpanLabel>Low (24h)</SpanLabel>
                                <SpanData>{Format.toCurrencyNDigits(props.coinInfo.market_data.low_24h.usd,'USD',2)}</SpanData>
                            </P>

                        </div>
                        <div className="row flex flex-direction-column justify-content-between">
                            <P>
                                <SpanLabel>Price (usd) :</SpanLabel>
                                <SpanData>{props.coinInfo.market_data.current_price.usd}</SpanData>
                            </P>
                            <P>
                                <SpanLabel>Price (btc) :</SpanLabel>
                                <SpanData>{props.coinInfo.market_data.current_price.btc}</SpanData>
                            </P>
                            <P>
                                <SpanLabel>Price (eth) :</SpanLabel>
                                <SpanData>{props.coinInfo.market_data.current_price.eth}</SpanData>
                            </P>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row my-1">
                            <P>
                                <SpanLabel>Total supply :</SpanLabel>
                                <SpanData>{Format.toLocale(props.coinInfo.market_data.total_supply)}</SpanData>
                            </P>
                            <P>
                                <SpanLabel>Circulating supply</SpanLabel>
                                <SpanData>{Format.toLocale(props.coinInfo.market_data.circulating_supply)}</SpanData>
                            </P>


                        </div>
                        <div className="row my-1">
                            <P>
                                <SpanLabel>Block time(min) :</SpanLabel>
                                <SpanData>{props.coinInfo.block_time_in_minutes}</SpanData>
                            </P>


                            <P>
                                <SpanLabel>Hash Algorithm :</SpanLabel>
                                <SpanData>{props.coinInfo.hashing_algorithm}</SpanData>
                            </P>

                        </div>
                        <div className="row">

                            <P>
                                <SpanLabel>Category :</SpanLabel>
                                <SpanData>{props.coinInfo.categories.map((cat, index) => {
                                    if (index > 0 && cat != "") {
                                        return ", " + cat;
                                    } else {
                                        return cat
                                    }
                                })}</SpanData>
                            </P>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )

}
