import React from 'react';
import styled from 'styled-components';

import reactLogo from '../../assets/logos/logo192.png';
import geckoLogo from '../../assets/logos/coingecko.svg';
import paprikaLogo from '../../assets/logos/coinpaprika.svg';


/**
 * Style
 */
const Footer = styled.footer`
height: 5vh;
  `;
const Span = styled.span`
  font-style: italic;
    `;
    const Spanesp = styled(Span)`
  padding: 0 1rem 0 1rem;
    `;
    const Img = styled.img`
  margin-bottom: 1rem;
    `;
/************************************
* 
* Footer / logos
* 
* ******************************** */
export default function CoinChart() {


    return (
        <Footer className="row container-fluid justify-content-between">

            <div className="col-6">
                <div className="row ">

                    <div className="col-4 d-flex justify-content-around">
                        <Span>build with</Span>
                    </div>
                    <div className="col-8 ">
                        <Img src={reactLogo} alt="react logo"
                            height="30px" />
                    </div>
                </div>
            </div>

            <div className="col-6">
                <div className="row ">

                    <div className="col-4 d-flex justify-content-around">
                        <Span>powered by</Span>
                    </div>
                    <div className="col-8 ">

                        <a href="https://www.coinpaprika.com/">
                            <Img src={paprikaLogo} alt="coinpaprika.com"
                                height="30px" />
                        </a>
                        <Spanesp>&</Spanesp>
                        <a href="https://www.coinpaprika.com">
                            <Img src={geckoLogo} alt="coingecko.com"
                                height="30px"/>
                        </a>
                    </div>
                </div>
            </div>
        </Footer>
    )

}