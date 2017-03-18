export default (state = 0,action) => {
  switch (action.type) {
    case 'INCREMENT':
    {
      console.log(" INCREMENT state + 1");
      return state + 1;
    }
    case 'DECREMENT':
    {
      console.log(" DECREMENT state - 1");
      return state - 1;
    }
      break;
    default:
    return state;

  }
}
