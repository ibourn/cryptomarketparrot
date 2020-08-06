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
    price: price => {parseFloat(Number(price).toFixed(4));}
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
                return ( (order === 'desc') ? (comparison * -1) : comparison  );
                };
            }
}