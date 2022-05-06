import React, {Component} from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        console.log('Pagination')
    }
    pattern = null;

    changeNumber = (n) => {
    if (typeof n === "number" && n > 0 && n <= this.props.range) {
        this.props.onChange(n);
        }
    }

    render() {
        console.log('Pagination')

        switch (true) {
        case this.props.range < 7:
            this.pattern = [...new Array(this.props.range)].map((_, i) => i + 1);
            break;
        case this.props.value < 4:
            this.pattern = [1, 2, 3, 4, 5, "...", this.props.range];
            break;
        case this.props.value > this.props.range - 4:
            this.pattern = [1, "...", this.props.range - 4, this.props.range - 3, this.props.range - 2, this.props.range - 1, this.props.range];
            break;
        default:
            this.pattern = [1, "...", this.props.value - 1, this.props.value, this.props.value + 1, "...", this.props.range];
    }
        return (
            <div className='pagination'>
                <button className='btn' disabled={this.props.value <= 1} onClick={() => this.changeNumber(this.props.value - 1)}>
                    {"<"}
                </button>
                {this.pattern.map((label) => (
                    <button
                        className={this.props.value === label ? "active" : "passive"}
                        onClick={() => this.changeNumber(label)}
                        isActive={this.props.value === label}
                    >
                        {label}
                    </button>
                ))}
                <button className='btn' disabled={this.props.value >= this.props.range} onClick={() => this.changeNumber(this.props.value + 1)}>
                    {">"}
                </button>
            </div>
        );
    }
}

export default Pagination;
