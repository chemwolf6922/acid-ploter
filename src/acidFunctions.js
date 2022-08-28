// @ts-check
/**
 * @param {number} ph 
 * @param {number} m 
 * @param {Array<number>} pkas 
 * @returns {number}
 */
export function HnA_dm(ph,m,pkas){
    let h = 10**(-ph);
    let kas = pkas.map(x=>10**(-x));
    /** @type {Array<number>} */
    let items = [];
    let kasMul = 1;
    for(let i=0;i<=kas.length;i++){
        items.push(h**(kas.length-i)*kasMul);
        kasMul *= (kas[i]??1);
    }
    return items[m]/items.reduce((a,b)=>a+b);
}
