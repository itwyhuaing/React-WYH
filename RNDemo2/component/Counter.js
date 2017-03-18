import React , {Component , Proptypes} from 'react';

class Counter extends Component {

  // static propTypes = {
  //   value: PropTypes.number.isRequired,
  //   onIncrement: PropTypes.func.isRequired,
  //   onDecrement: PropTypes.func.isRequired
  // }

  render (){

    const {value , onIncrement , onDecrement} = this.props

    return (
      <p>
        <button>{value}</button>
        {' '}
        {' '}
        {' '}
        <button onClick={onIncrement}> + </button>
        {' '}
        {' '}
        {' '}
        <button onClick={onDecrement}> - </button>
      </p>
    )
  }
}
export default Counter
