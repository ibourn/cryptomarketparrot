/**
 * 
 * Module for helper functions
 * 
 */

import { logDOM } from "@testing-library/react";


/**
 * 
 * price and text formatters
 * 
 */
export var Format = {
    /**
     * price
     */
    price: price => { parseFloat(Number(price).toFixed(4));
     },
    toCurrency: (price, devise) => { 
        if(price){
        const newFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0, 
  minimumFractionDigits: 0,style: 'currency', currency: `${devise}` });
        return newFormat.format(price);
        } else {
            return "not yet..";
        }
    },
    toCurrencyNDigits: (price, devise, n) => {
        const newFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: n, 
            minimumFractionDigits: 0,style: 'currency', currency: `${devise}` });
                  return newFormat.format(price);

    },
    toLocale: (price) => {
        if(price){
            return price.toLocaleString();
            } else {
                return "not yet..";
            }
    },
    /**
     * text
     * 
     * @todo use regex to filter \r\n 1 2... i ii ...
     */
    parseToHtml: (text) => {
        for(let i=0; i < text.length; i++){
            text=text.replace("\r\n\r\n","<br/><span style=\"padding-left: 0.5rem\"></span>");
        }
        return text;
    }
}

/**
   * 
   * utility for sorting function :
   * compare by key in asc or desc order
   * 
   */
export var Compare = {
    byKey: (key, order = 'asc') => {
        return function compare(a, b) {
            let comparison = a[key] == b[key] ? 0 : a[key] > b[key] ? 1 : -1;
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
    },
    quotesByKey: (devise, key, order = 'asc') => {
        return function compare(a, b) {
            console.log(a.quotes[devise][key]);
            let comparison = a.quotes[devise][key] == b.quotes[devise][key] ? 0 : a.quotes[devise][key] > b.quotes[devise][key] ? 1 : -1;
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
    }

}

/**
   * 
   * utility for filtering function :
   * 
   */
export var Filter = {
    byRange: (data, filter) => {
        function isInRange(value) {
            return (value.quotes[filter.devise]["market_cap"] >= filter.minCap &&
                value.quotes[filter.devise]["market_cap"] <= filter.maxCap &&
                value.circulating_supply >= filter.minSup &&
                value.circulating_supply <= filter.maxSup &&
                value.quotes[filter.devise]["percent_change_24h"] >= filter.minVarD &&
                value.quotes[filter.devise]["percent_change_24h"] <= filter.maxVarD &&
                (filter.devise == "USD" ? value.quotes[filter.devise]["percent_from_price_ath"] >= filter.minVarAth : true) &&
                (filter.devise == "USD" ? value.quotes[filter.devise]["percent_from_price_ath"] <= filter.maxVarAth: true) &&
                value.quotes[filter.devise]["price"] >= filter.minPrice &&
                value.quotes[filter.devise]["price"] <= filter.maxPrice);
        }
      
        return data.filter(isInRange)

    }
}

/**
   * 
   * utility to manipulate time :
   * 
   */
export var Time = {
    getPastDateByDay: (days) => {
        let day = new Date();
        day.setDate(day.getDate() - days);

        let j = day.getDate().toString().padStart(2, "0");
        let m = (day.getMonth() + 1).toString().padStart(2, "0");
        let y = day.getFullYear();
        return j + "-" + m + "-" + y;
    },
    getPastDateByDayInverse: (days) => {
        let day = new Date();
        day.setDate(day.getDate() - days);

        let j = day.getDate().toString().padStart(2, "0");
        let m = (day.getMonth() + 1).toString().padStart(2, "0");
        let y = day.getFullYear();
        return y + "-" + m + "-" + j;
    },
    fromTimestamp: (t) => {
        const dt = new Date(t * 1000);
        const y = dt.getFullYear();
        const m = (dt.getMonth() + 1).toString();
        const d = dt.getDate().toString();
        const hr = dt.getHours().toString();
        const min = dt.getMinutes().toString();
        const s = dt.getSeconds().toString();
        if(y && m && d && hr && min && s){
        return y + '/' + m.padStart(2, "0") + '/' + d.padStart(2, "0") + ' ' + hr.padStart(2, "0") + ':' + min.padStart(2, "0") + ':' + s.padStart(2, "0");
        } else {
            return "no data.."
        }
    }
}


/**
 * Copy helpers
 */
export var Copy = {
    shallow: (element) => {
        if(typeof element == "object") {
            return {...element};
        } else {
            return element;
        }
    },
    deep: (element) => {
        if(Array.isArray(element)) {
            return [...element];
        } else if(typeof element == "object") {
            return JSON.parse(JSON.stringify(element));
        } else {
            return element;
        }
    },
    nested: (element) => {
        let deepCopy = (element) => {
            //If not a object then return
            if (!element) {
              return element;
            }
            
            let item;
            let copy = Array.isArray(element) ? [] : {};
 
            for (const i in element) {
                item = element[i];
              copy[i] = (typeof item === "object") ? deepCopy(item) : item;
            }  
            return copy;
          }
          return deepCopy(element);
    }

}

/**
 * Math Helpers
 */
export var Maths = {

    getMinOfSerieInSet: (set, item) => {       
        let min = +1e19;         
        for(let i in set) {        
            if(set[i][item] < min)
                min = set[i][item]; 
        }
        return min; 
    },
    getMaxOfSerieInSet: (set, item) => {
        let max = -1e19;         
        for(let i in set) {      
            if(set[i][item] > max)
                max = set[i][item];  
            }
            return max; 
    }

}