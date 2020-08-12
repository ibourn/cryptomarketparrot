import React, { useContext } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';

import styled from 'styled-components';
import { Format } from '../../modules/Utilities';

/**
 * 
 * Styles
 */
const Section = styled.section`
font-size: 0.9rem;
`;
const ArtDescription = styled.article`
line-height: 1.5rem;
`;
const SpanTitle = styled.span`
line-height: 1.5rem;
margin: 0.2rem 0 0.4rem 0.2rem;
font-weight: bold;
font-size: 1rem;
text-decoration: underline;
`;
const SpanLabel = styled.span`
margin-right: 0.5rem;
font-weight: bold;
font-size: 0.8rem;
`;
const Li = styled.li`
    list-style-type: circle;
    list-style-position: inside;
`;

/************************************
 * 
 * CoinAbout component
 * 
 * ******************************** */
export default function CoinAbout(props) {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const colorStyle = theme == 'light' ? {
        backgroundColor: `${lightTheme.container}`,
        color: `${lightTheme.content}`
    } : {
        backgroundColor: `${darkTheme.container}`,
            color: `${darkTheme.content}`
        };

    let doc = props.coinInfo["description"].en;

    const descriptionMarkUp = { __html: Format.parseToHtml(doc) };


    return (
        <Section className="container">
            <main className="row container">
                <div className="row my-2 justify-content-between" style={colorStyle}>
                    <div className="col-6">
                        <ul><SpanTitle>Next events :</SpanTitle>
                            {
                                props.coinEvents.map((res) => {
                                    return (
                                        <Li key={res.id}>
                                            <span>Date : {" " + res.date}</span>
                                            <Link to={res.link}> {res.name}</Link>
                                            <article>{res.description}</article>
                                        </Li>
                                    )
                                })
                            }
                        </ul>
                        <article><SpanTitle>Links :</SpanTitle>
                            <ul><SpanLabel>Homepage :</SpanLabel>
                                {props.coinInfo.links.homepage.map((link, index) => {
                                    return link != "" ? <Li key={index}><Link>{link}</Link></Li> : null
                                })}</ul>
                            <ul><SpanLabel>Sites :</SpanLabel>
                                {props.coinInfo.links.blockchain_site.map((link, index) => {
                                    return link != "" ? <Li key={index}><Link>{link}</Link></Li> : null
                                })}</ul>
                            <ul><SpanLabel>Forum :</SpanLabel>
                                {props.coinInfo.links.official_forum_url.map((link, index) => {
                                    return link != "" ? <Li key={index}><Link>{link}</Link></Li> : null
                                })}</ul>


                        </article>

                    </div>
                    <div className="col-4">
                        <article><SpanTitle>Market data :</SpanTitle>
                            <p><SpanLabel>Current price (usd):</SpanLabel><span>{props.coinInfo.market_data.current_price.usd}</span></p>

                            <p><SpanLabel>Current price (btc) :</SpanLabel><span>{props.coinInfo.market_data.current_price.btc}</span></p>
                            <p><SpanLabel>Current price (eth) :</SpanLabel><span>{props.coinInfo.market_data.current_price.eth}</span></p>

                            <p><SpanLabel>Ath (usd) :</SpanLabel><span>{props.coinInfo.market_data.ath.usd}</span></p>
                            <p><SpanLabel>Ath change %(usd) :</SpanLabel><span>{props.coinInfo.market_data.ath_change_percentage.usd}</span></p>
                            <p><SpanLabel>Ath date :</SpanLabel><span>{props.coinInfo.market_data.ath_date.usd}</span></p>

                            <p><SpanLabel>Market cap :</SpanLabel><span>{props.coinInfo.market_data.market_cap.usd}</span></p>


                            <p><SpanLabel>Price change (24h)</SpanLabel><span>{props.coinInfo.market_data.price_change_24h}</span></p>
                            <p><SpanLabel>Price change %(24h)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_7d}</span></p>
                            <p><SpanLabel>Price change %(7d)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_14d}</span></p>
                            <p><SpanLabel>Price change %(14d)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_30d}</span></p>
                            <p><SpanLabel>Price change %(30d)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_60d}</span></p>
                            <p><SpanLabel>Price change %(200d)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_200d}</span></p>
                            <p><SpanLabel>Price change %(1y)</SpanLabel><span>{props.coinInfo.market_data.price_change_percentage_1y}</span></p>

                            <p><SpanLabel>Market change (24h)</SpanLabel><span>{props.coinInfo.market_data.market_cap_change_24h}</span></p>
                            <p><SpanLabel>Market change % (24h)</SpanLabel><span>{props.coinInfo.market_data.market_cap_change_percentage_24h}</span></p>

                            {/* <p><SpanLabel></SpanLabel><span>{props.coinInfo.market_data.last_updated}</span></p> */}
                        </article>
                    </div>
                </div>
                <ArtDescription className="row  my-2 px-1" style={colorStyle}>
                    <SpanTitle>About :</SpanTitle>

                    <div dangerouslySetInnerHTML={descriptionMarkUp}></div>

                </ArtDescription>
                <div className="row my-2 container d-flex justify-content-between" style={colorStyle}>
                    <div className="col-4">
                        <article><SpanTitle>Rankings :</SpanTitle>
                            <p><SpanLabel>Genesis date :</SpanLabel><span>{props.coinInfo.genesis_date}</span></p>
                            <p><SpanLabel>Sentiment up :</SpanLabel><span>{props.coinInfo.sentiment_votes_up_percentage}</span></p>
                            <p><SpanLabel>Sentiment down :</SpanLabel><span>{props.coinInfo.sentiment_votes_down_percentage}</span></p>
                            <p><SpanLabel>market cap :</SpanLabel><span>{props.coinInfo.market_cap_rank}</span></p>
                            <p><SpanLabel>Coingecko rank :</SpanLabel><span>{props.coinInfo.coingecko_rank}</span></p>
                            <p><SpanLabel>Coingecko score :</SpanLabel><span>{props.coinInfo.coingecko_score}</span></p>
                            <p><SpanLabel>Daeveloper score :</SpanLabel><span>{props.coinInfo.developer_score}</span></p>
                            <p><SpanLabel>Community score :</SpanLabel><span>{props.coinInfo.community_score}</span></p>
                            <p><SpanLabel>Liquidity score :</SpanLabel><span>{props.coinInfo.liquidity_score}</span></p>
                            <p><SpanLabel>Public interest score :</SpanLabel><span>{props.coinInfo.public_interest_score}</span></p>
                        </article>
                    </div>
                    <div className="col-4">
                        <article><SpanTitle>Public interest :</SpanTitle>
                            <p><SpanLabel>Bing matches :</SpanLabel><span>{props.coinInfo.public_interest_stats.bing_matches}</span></p>
                            <p><SpanLabel>Alexa rank :</SpanLabel><span>{props.coinInfo.public_interest_stats.alexa_rank}</span></p>
                        </article>
                        <article><SpanTitle>Community infos :</SpanTitle>
                            <p><SpanLabel>Facebook likes :</SpanLabel><span>{props.coinInfo.community_data.facebook_likes}</span></p>
                            <p><SpanLabel>Twitter followers :</SpanLabel><span>{props.coinInfo.community_data.twitter_followers}</span></p>
                            <p><SpanLabel>Reddit post/48h :</SpanLabel><span>{props.coinInfo.community_data.reddit_average_posts_48h}</span></p>
                            <p><SpanLabel>Reddit comment/48h :</SpanLabel><span>{props.coinInfo.community_data.reddit_average_comments_48h}</span></p>
                            <p><SpanLabel>Telegram channel users :</SpanLabel><span>{props.coinInfo.community_data.telegram_channel_user_count}</span></p>
                        </article>
                    </div>
                    <div className="col-4">
                        <article><SpanTitle>Developer infos :</SpanTitle>
                            <p><SpanLabel>Forks :</SpanLabel><span>{props.coinInfo.developer_data.forks}</span></p>
                            <p><SpanLabel>Stars :</SpanLabel><span>{props.coinInfo.developer_data.stars}</span></p>
                            <p><SpanLabel>Subscribers :</SpanLabel><span>{props.coinInfo.developer_data.subscribers}</span></p>
                            <p><SpanLabel>Total issues :</SpanLabel><span>{props.coinInfo.developer_data.total_issues}</span></p>
                            <p><SpanLabel>Closed issues :</SpanLabel><span>{props.coinInfo.developer_data.closed_issues}</span></p>
                            <p><SpanLabel>Pull request contributors :</SpanLabel><span>{props.coinInfo.developer_data.pull_request_contributors}</span></p>
                            <p><SpanLabel>Pull request merger :</SpanLabel><span>{props.coinInfo.developer_data.pull_requests_merged}</span></p>
                        </article>
                    </div>

                </div>

            </main>
        </Section>



    )

}