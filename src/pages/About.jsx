import React from 'react'
import styled from 'styled-components';

const Section = styled.section`
`;
const Article = styled.article`
margin: 1rem 0;
font-size: 0.9rem;
line-height: 1.3rem;
text-indent: 1.5em;
`;
const Main = styled.main`
margin: 2rem 0;
outline: 1px solid gainsboro;
  outline-offset: 4px;
`;
const H2 = styled.h2`
font-size: 1.5rem;
text-align: center;
`;
const P = styled.p`
margin: 0;
padding: 0;
`;
const Ptitle = styled(P)`
text-indent: 0;
font-weight: bold;
font-size: 1rem;
`;
const PSubtitle = styled(P)`
text-indent: 1em;
font-weight: bold;
font-style: italic;
font-size: 0.9rem;
`;
const I = styled.i`
font-size: 0.3rem;
margin-right: 0.2rem;
`;
function ComingSoonPage() {
    //const { pathname } = useLocation();

    return (
        <Section className="container pt-3">
            <H2>
                Presentation of CryptoMarketParrot :
                </H2>
            <Main>
                <Article>
                    This application is a work in the context of <a href="https://academy.ivanontech.com/">IvanOntech</a>'s bootcamp.
                    This is the first project to mark the end of the part of the courses on javascript
    The statement of duty is to do a clone of <a href="https://coinmarketcap.com/">CoinMarketCap</a> into a week.
    </Article>
                <Article>
                    As I have been following the courses on reactjs from <a href="https://academy.ivanontech.com/">IvanOntech</a> Academy in parallel,
                     I have tried to carry out this duty in using reactjs.
    </Article>
            </Main>

            <Article>
                <Ptitle>
                    About the development :
</Ptitle>
                <PSubtitle>
                    As there is no back-end, there are 2 restrictions:
</PSubtitle>

                <P>
                    <I className="fas fa-circle text-muted"></I>The login function is fake.
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>There is no intermediary between the customer and data providers for pre-construction 
                    of processed data and hide third-party service API keys.
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>For this reason I only use free api from <a href="https://coinpaprika.com/">coinprapika</a>
                 and <a href="https://www.coingecko.com/en">coingecko</a>. Therefore the application is subject to a limitation in number of requests.
                    A backend in this direction would have provided more data (such as on-chain data via glassnode..., blockchair.com, news data via cryptonpanic... ).
                    It would have allow also to manage more request by switching api services.
                    Thus i did a top 50 instead of a top 100 coins in order to circumvent the request limits because i chose to reproduce the mini chart in the rankings page
                    with prices updating automatically.
</P>
            </Article>
            <Article>
                <Ptitle>
                    Features :
    </Ptitle>
                <PSubtitle>
                    Concerning the theming :
</PSubtitle>
                <P>
                <I className="fas fa-circle text-muted"></I>You can switch from light/dark mode via the button on the top right.
                    </P>
                <P>
                <I className="fas fa-circle text-muted"></I>Prices are blinking when up or down.
                           </P>
                <P>
                <I className="fas fa-circle text-muted"></I> You can close the pubs banner with the close button or by resizing the window.
</P>
                <PSubtitle>
                    About the use of the APIs :
</PSubtitle>
                <P>
                    <I className="fas fa-circle text-muted"></I>All information are updated 2 times a minute (apart static info about a specific coin such as its description,
                 links...).
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>In the top banner : global infos of the market are displayed with the time of the last update
                (every 30 seconds or so).
</P>

                <P>
                    <I className="fas fa-circle text-muted"></I>In the ranking page (main page) 50 of all of the coins are displayed with
                a chart of the last 7 days price updated.
                <I className="fas fa-circle text-muted"></I>If requests are over the limit (mainly when fetching historical price of new displayed coins)
                 the app will display : 'no data' or 'not yet' the time to wait the next update.
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>In the coin's page : you have access informations about a specific coin :
                its desciption, rankings, market pairs, events, last tweets and a chart from <a href="https://www.tradingview.com/">tradingview</a>.
</P>
                <PSubtitle>
                    Menu and pages :
</PSubtitle>
                <P>
                    <I className="fas fa-circle text-muted"></I>The app menu currently only leads to:
                    this page, coin's page, ranking page (the main page), coming soon, and 404.
                    To access coin's page you can click a coin's name in the ranking or use the search bar in the top menu.
</P>
                <PSubtitle>
                    General :
</PSubtitle>
                <P>
                    <I className="fas fa-circle text-muted"></I>In the ranking : all columns are sortable, and filtrable. The currencies available are USD and BTC.
                 The filters and sorting are persistent (so you can change the page) but you cannot combine multiple sorts.
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>In the coin's page all buttons are functional and i use trading view to display a usable chart
                 (for chart analisys).
</P>
                <P>
                    <I className="fas fa-circle text-muted"></I>Know issues : if you request too many things (sorting, changing the page..) in a little time,
                the app can seem to be frozen. Just refresh the page.
  </P>
            </Article>
            <Article>

                <Ptitle>
                    To conclude :
</Ptitle>
                <P>
                    As it's my second react app, i learned more about data flow, usage of hooks, context, router, styled components. There's many things
                    to improve in the structure to better manage the re-render for example but i'm discovering the usage of hooks at the moment.
                    I need to deepen these aspects to be able to use them better.
</P>
                <P>
                    I should better choose my charting library. Canvasjs is good but no way to modify the watermark so the result is not top.
</P>
                <P>
                    The development with react is the part that took the most time. It's the reason why i implemented only these functionalities at the moment.
                    I'd like to do more (exchanges, on-chain data, filter defi coins, a converter...). There are so many things to add,
                    but I need to pause this development to complete my assignement and continue the bootcamp.
</P>
            </Article>
        </Section>
    )
}
export default ComingSoonPage;