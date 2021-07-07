import { createStore } from 'redux';

const INC_A = 'INC_A';
const INC_B = 'INC_B';
const INITIAL_STATE = {
  values: {
    a: 0,
    b: 0,
  },
};

function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case INC_A:
      return {
        ...state,
        values: {
          ...state.values,
          a: state.values.a + 1,
        },
      };
    case INC_B:
      return {
        ...state,
        values: {
          ...state.values,
          b: state.values.b + 1,
        },
      };
    default:
      return state;
  }
}

function incA() {
  return {
    type: INC_A,
  };
}

function incB() {
  return {
    type: INC_B,
  };
}

function initCounterStore() {
  if (!window.globalState) {
    window.globalState = {};
  }

  if (!window.globalState.counter) {
    window.globalState.counter = createStore(reducer, INITIAL_STATE);
  }
}

export default {
  incA,
  incB,
  initCounterStore,
  reducer,
};
