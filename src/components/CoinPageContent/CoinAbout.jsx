import React from 'react';
import { useHistory, useParams, Link } from "react-router-dom";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsAbout(props) {
    
console.log("FROM ABOUT",props.coinInfo);
///APIcalls
return(
<section className="container">
<main className="row">
    <div className="row">
<div className="col-6">
<ul><span>Next events :</span>
{
    props.coinEvents.map((res) => {
        return (
<li key={res.id}>
    <span>Date : {" " + res.date}</span>
<Link to={res.link}> {res.name}</Link>
<article>{res.description}</article>
</li>
        )
    })
}
</ul>
<article><span>Links :</span>
<ul><span>Homepage :</span>
    {props.coinInfo.links.homepage.map((link, index) =>{
 return link != "" ? <li key={index}><Link>{link}</Link></li> : null
}) }</ul>
<ul><span>Sites :</span>
   {props.coinInfo.links.blockchain_site.map((link,index) =>{
 return link != "" ? <li key={index}><Link>{link}</Link></li> : null
}) }</ul>
   <ul><span>Forum :</span>
   {props.coinInfo.links.official_forum_url.map((link, index) =>{
 return link != "" ? <li key={index}><Link>{link}</Link></li> : null
}) }</ul>


</article>

</div>
<div className="col-6">
<article><span>Market data :</span>
<p><span>Current price (usd):</span><span>{props.coinInfo.market_data.current_price.usd}</span></p>

<p><span>Current price (btc) :</span><span>{props.coinInfo.market_data.current_price.btc }</span></p>
<p><span>Current price (eth) :</span><span>{props.coinInfo.market_data.current_price.eth}</span></p>

<p><span>Ath (usd) :</span><span>{props.coinInfo.market_data.ath.usd}</span></p>
<p><span>Ath change %(usd) :</span><span>{props.coinInfo.market_data.ath_change_percentage.usd }</span></p>
<p><span>Ath date :</span><span>{props.coinInfo.market_data.ath_date.usd}</span></p>

<p><span>Market cap :</span><span>{props.coinInfo.market_data.market_cap.usd}</span></p>


<p><span>Price change (24h)</span><span>{props.coinInfo.market_data.price_change_24h}</span></p>
   <p><span>Price change %(24h)</span><span>{ props.coinInfo.market_data.price_change_percentage_7d}</span></p>
    <p><span>Price change %(7d)</span><span>{props.coinInfo.market_data.price_change_percentage_14d}</span></p>
    <p><span>Price change %(14d)</span><span>{props.coinInfo.market_data.price_change_percentage_30d}</span></p>
    <p><span>Price change %(30d)</span><span>{props.coinInfo.market_data.price_change_percentage_60d}</span></p>
    <p><span>Price change %(200d)</span><span>{props.coinInfo.market_data.price_change_percentage_200d}</span></p>
    <p><span>Price change %(1y)</span><span>{props.coinInfo.market_data.price_change_percentage_1y}</span></p>

    <p><span>Market change (24h)</span><span>{props.coinInfo.market_data.market_cap_change_24h}</span></p>
<p><span>Market change % (24h)</span><span>{props.coinInfo.market_data.market_cap_change_percentage_24h}</span></p>

{/* <p><span></span><span>{props.coinInfo.market_data.last_updated}</span></p> */}
</article>



</div>
</div>
<article className="row"> <span>About :</span>



{props.coinInfo["description"].en}


</article>
<div className="row">
<div className="col-4">
<article><span>Rankings :</span>
<p><span>Genesis date :</span><span>{props.coinInfo.genesis_date}</span></p>
<p><span>Sentiment up :</span><span>{props.coinInfo.sentiment_votes_up_percentage}</span></p>
<p><span>Sentiment down :</span><span>{props.coinInfo.sentiment_votes_down_percentage}</span></p>
<p><span>market cap :</span><span>{props.coinInfo.market_cap_rank}</span></p>
<p><span>Coingecko rank :</span><span>{props.coinInfo.coingecko_rank}</span></p>
<p><span>Coingecko score :</span><span>{props.coinInfo.coingecko_score}</span></p>
<p><span>Daeveloper score :</span><span>{props.coinInfo.developer_score}</span></p>
<p><span>Community score :</span><span>{props.coinInfo.community_score}</span></p>
<p><span>Liquidity score :</span><span>{props.coinInfo.liquidity_score}</span></p>
<p><span>Public interest score :</span><span>{props.coinInfo.public_interest_score}</span></p>
</article>
</div>
<div className="col-4">
<article><span>Public interest :</span>
    <p><span>Bing matches :</span><span>{props.coinInfo.public_interest_stats.bing_matches}</span></p>
<p><span>Alexa rank :</span><span>{props.coinInfo.public_interest_stats.alexa_rank }</span></p>
    </article>
    <article><span>Community infos :</span>
<p><span>Facebook likes :</span><span>{props.coinInfo.community_data.facebook_likes}</span></p>
<p><span>Twitter followers :</span><span>{props.coinInfo.community_data.twitter_followers}</span></p>
<p><span>Reddit post/48h :</span><span>{props.coinInfo.community_data.reddit_average_posts_48h}</span></p>
<p><span>Reddit comment/48h :</span><span>{props.coinInfo.community_data.reddit_average_comments_48h}</span></p>
{/* <p><span></span><span>{props.coinInfo.community_data.reddit_subscribers}</span></p>
<p><span></span><span>{props.coinInfo.community_data.reddit_accounts_active_48h}</span></p> */}
<p><span>Telegram channel users :</span><span>{props.coinInfo.community_data.telegram_channel_user_count}</span></p>
</article>
</div>
<div className="col-4">
<article><span>Developer infos :</span>
<p><span></span><span>{props.coinInfo.developer_data.forks}</span></p>
    <p><span>Forks :</span><span>{props.coinInfo.developer_data.stars}</span></p>
    <p><span>Subscribers :</span><span>{props.coinInfo.developer_data.subscribers}</span></p>
    <p><span>Total issues :</span><span>{props.coinInfo.developer_data.total_issues}</span></p>
    <p><span>Closed issues :</span><span>{props.coinInfo.developer_data.closed_issues}</span></p>
    <p><span>Pull request contributors :</span><span>{props.coinInfo.developer_data.pull_request_contributors}</span></p>
    <p><span>Pull request merger :</span><span>{props.coinInfo.developer_data.pull_requests_merged}</span></p>
    </article>
</div>

</div>

</main>
</section>



)

}