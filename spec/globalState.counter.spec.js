import globalStateCounter from '../src/globalState.counter';

const {
  incA, incB, initCounterStore, reducer,
} = globalStateCounter;

describe('globalState.counter', () => {
  beforeEach(() => {
    expect(global.window.globalState).toBeUndefined();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.window.globalState = undefined;
  });

  it('Should init window.globalState.customer', () => {
    initCounterStore();

    expect(global.window.globalState).toBeDefined();
    expect(global.window.globalState.counter).toBeDefined();
    expect(global.window.globalState.counter.dispatch).toBeDefined();
    expect(global.window.globalState.counter.dispatch).toBeInstanceOf(Function);
    expect(global.window.globalState.counter.getState).toBeDefined();
    expect(global.window.globalState.counter.getState).toBeInstanceOf(Function);
    expect(global.window.globalState.counter.subscribe).toBeDefined();
    expect(global.window.globalState.counter.subscribe).toBeInstanceOf(Function);
  });

  it('Should not reset state values', () => {
    const expectedState = {
      values: {
        a: 1,
        b: 0,
      },
    };

    initCounterStore();

    const { globalState } = global.window;

    globalState.counter.dispatch(incA());

    initCounterStore();

    expect(globalState.counter.getState()).toEqual(expectedState);
  });

  it('Should update state when dispatch a action', () => {
    const expectedState = {
      values: {
        a: 1,
        b: 0,
      },
    };

    initCounterStore();

    const { globalState } = global.window;

    globalState.counter.dispatch(incA());

    expect(globalState.counter.getState()).toEqual(expectedState);
  });

  it('Show call subscribers when the state is changed', (done) => {
    const expectedState = {
      values: {
        a: 0,
        b: 1,
      },
    };

    initCounterStore();

    const { globalState } = global.window;

    globalState.counter.subscribe(() => {
      expect(globalState.counter.getState()).toEqual(expectedState);
      done();
    });

    globalState.counter.dispatch(incB());
  });

  it('Should return initial state when dispatch is called with nothing to do', () => {
    const state = reducer();
    expect(state).toEqual({ values: { a: 0, b: 0 } });
  });
});
