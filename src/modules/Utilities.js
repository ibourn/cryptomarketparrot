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
    quotesByKey: (key, order = 'asc') => {
        return function compare(a, b) {
            console.log(a.quotes["USD"][key]);
            let comparison = a.quotes["USD"][key] == b.quotes["USD"][key] ? 0 : a.quotes["USD"][key] > b.quotes["USD"][key] ? 1 : -1;
            return ((order === 'desc') ? (comparison * -1) : comparison);
        };
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
      }
}
