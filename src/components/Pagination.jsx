import React, {Component} from 'react';
let pattern = null;

class Pagination extends Component {
    constructor(props) {
        super(props);
        switch (true) {
            case this.props.range < 7:
                pattern = [...new Array(this.props.range)].map((_, i) => i + 1);
                break;
            case this.props.value < 4:
                pattern = [1, 2, 3, 4, 5, "...", this.props.range];
                break;
            case this.props.value > this.props.range - 4:
                pattern = [1, "...", this.props.range - 4, this.props.range - 3, this.props.range - 2, this.props.range - 1, this.props.range];
                break;
            default:
                pattern = [1, "...", this.props.value - 1, this.props.value, this.props.value + 1, "...", this.props.range];
        }
    }

    changeNumber = (n) => {
        if (typeof n === "number" && n > 0 && n <= this.props.range) {
            console.log('Page ', this.props.data.slice(n*5-5,n*5) )
            this.props.onChange(n);
        }
    }

    render() {
        return (
            <div className='pagination'>
                <button className='btn'
                        disabled={this.props.value <= 1}
                        onClick={() => this.changeNumber(this.props.value - 1)}>
                    {"<"}
                </button>
                {pattern.map((label,index) => (
                    <button
                        key={index}
                        className={this.props.value === label ? "active" : "passive"}
                        onClick={() => this.changeNumber(label)}
                        isActive={this.props.value === label}
                    >
                        {label}
                    </button>
                ))}
                <button className='btn'
                        disabled={this.props.value >= this.props.range}
                        onClick={() => this.changeNumber(this.props.value + 1)}>
                    {">"}
                </button>
            </div>
        );
    }
}
Pagination.defaultProps = {
    page: 1,
    range : 5,
}
export default Pagination;
