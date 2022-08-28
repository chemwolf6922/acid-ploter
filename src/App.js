// @ts-check
import React from 'react';
import './App.css';
import { functionToSvgPath } from './functionToSvgPath.js';
import { HnA_dm } from './acidFunctions.js';



class Graph extends React.Component {
    static Colors = [
        '#1F77B4',
        '#FF7F0E',
        '#2CA02C',
        '#D62728',
        '#9467BD',
        '#8C564B',
        '#E377C2',
        '#7F7F7F',
        '#BCBD22',
        '#17BECF'
    ];
    render() {
        let indexes = this.props.pkas.map((x, i) => i);
        indexes.push(indexes.length);
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.props.size.x} ${this.props.size.y}`} className="Graph">
            {indexes.map((/** @type {number} */ i) => <path fill="none" stroke={Graph.Colors[i % Graph.Colors.length]}
                d={functionToSvgPath({
                    f: (x) => HnA_dm(x, i, this.props.pkas),
                    range: {
                        xMin: 0,
                        xMax: 14,
                        yMin: 0,
                        yMax: 1
                    },
                    size: {
                        xMin: 0,
                        xMax: this.props.size.x,
                        yMin: this.props.size.y,
                        yMax: 0
                    }
                })}
            />)}
        </svg>
    }
}

class Slider extends React.Component {
    onChange(event) {
        let value = Number(event.target.value);
        value = Math.min(this.props.max, Math.max(this.props.min, value));
        this.props.onValueChange(value, this.props.index);
    }
    render() {
        return <div className='Slider'>
            <input className='SliderInput' type="number" min={this.props.min} max={this.props.max} step={this.props.step}
                value={this.props.value} onChange={this.onChange.bind(this)} onInput={this.onChange.bind(this)} />
            <input className="SliderSlider" type="range" min={this.props.min} max={this.props.max} step={this.props.step}
                value={this.props.value} onChange={this.onChange.bind(this)} />
        </div>
    }
}

class App extends React.Component {
    state = {
        pkas: [5]
    }
    onAddButtonClick() {
        let newPkas = [...this.state.pkas];
        newPkas.push(5);
        this.setState({ ...this.state, pkas: newPkas });
    }
    onDelButtonClick() {
        if (this.state.pkas.length > 1) {
            let newPkas = [...this.state.pkas];
            newPkas.pop();
            this.setState({ ...this.state, pkas: newPkas });
        }
    }
    /**
     * @param {number} v 
     * @param {number} i 
     */
    onSliderValueChange(v, i) {
        let newPkas = [...this.state.pkas];
        newPkas[i] = v;
        this.setState({ ...this.state, pkas: newPkas });
    }
    render() {
        return (
            <div className="App">
                <div className='GraphAera'>
                    <Graph pkas={this.state.pkas} size={{ x: 600, y: 400 }} />
                </div>
                <div className='Menu'>
                    <button className='Button' onClick={this.onAddButtonClick.bind(this)}>添加一元</button>
                    <button className='Button' onClick={this.onDelButtonClick.bind(this)}>减少一元</button>
                    {this.state.pkas.map((x, i) => <Slider key={`Slider${i}`} min={0} max={14} step={0.01} value={x} index={i} onValueChange={this.onSliderValueChange.bind(this)} />)}
                </div>
            </div>
        );
    }
}

export default App;
