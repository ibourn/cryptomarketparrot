/**
 * 
 * Modules for helper functions
 */



export var Format = {
    /**
     * 
     * Price formatter :4 decimal digits
     * 
     * @param {*} price 
     */
    price: price => { parseFloat(Number(price).toFixed(4)); }
}

export var Compare = {
    /**
     * 
     * utility fort sorting function :
     * compare by key in asc or desc order
     * 
     */
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
/*
 const [filter, setFilter] = useState({
    devise: "USD",
    minCap: 0,
    maxCap: 999999999999,
    minVarh1: -100,
    maxVarh1: 100
  })
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
            value.quotes[filter.devise]["percent_from_price_ath"] >= filter.minVarAth &&
            value.quotes[filter.devise]["percent_from_price_ath"] <= filter.maxVarAth &&
            value.quotes[filter.devise]["price"] >= filter.minPrice &&
            value.quotes[filter.devise]["price"] <= filter.maxPrice);
        }
        return data.filter(isInRange)

    }
}

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
        const dt = new Date(t*1000);
        const y = dt.getFullYear();
const m = (dt.getMonth() + 1).toString();
const d = dt.getDate().toString();
const hr = dt.getHours().toString();
const min = dt.getMinutes().toString();
const s = dt.getSeconds().toString();
return y + ':' + m.padStart(2,"0")  + ':' + d.padStart(2,"0")  + ':' + hr.padStart(2,"0") + ':' + min.padStart(2,"0")  + ':' + s.padStart(2,"0") ;  
}



}

