// @ts-check
/**
 * This method is only good for continious
 * functions within the giving x range.
 * @param {{
 *      f:(x:number)=>number;
 *      range:{
 *          xMin:number,
 *          xMax:number,
 *          yMin:number,
 *          yMax:number
 *      };
 *      step?:number;
 *      precision?:number;
 *      size:{
 *          x:number,
 *          y:number
 *      };
 * }} params 
 * @returns {string}
 */
export function functionToSvgPath(params){
    const step = params.step ?? (params.range.xMax-params.range.xMin)/200;
    const pc = (params.range.xMax  -  params.range.xMin)/step >>> 0;
    if(pc <= 1){
        throw new Error('Step is too large');
    }
    const xScale = params.size.x/(params.range.xMax-params.range.xMin);
    const yScale = params.size.y/(params.range.yMax-params.range.yMin);
    const precision = params.precision??5;
    
    /** calculate points */
    /**
     * @type {Array<{x:number,y:number}>}
     */
    const points = [];
    for(let i = 0;i<pc;i++){
        let px = params.range.xMin + i*step;
        let py = params.f(px);
        if(Number.isNaN(py)){
            throw new Error('Function is not continious');
        }
        points.push({
            x:px*xScale,
            y:py*yScale
        });
    }
    
    /** create path */
    let r = `M${points[0].x.toPrecision(precision)} ${points[0].y.toPrecision(precision)}`;
    for(const p of points.slice(1)){
        r+=`L${p.x.toPrecision(precision)} ${p.y.toPrecision(precision)}`;
    }

    return r;
}
