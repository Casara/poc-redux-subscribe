import PageComponent from '../src/pageComponent';

const watchAHandlerMock = jest.fn();
const watchBHandlerMock = jest.fn();
const watchMock = (getState, pathToField) => {
  if (pathToField === 'values.a') {
    return watchAHandlerMock;
  }
  if (pathToField === 'values.b') {
    return watchBHandlerMock;
  }
  return jest.fn();
};
jest.mock('redux-watch', () => watchMock);

describe('PageComponent', () => {
  let pageComponent;
  let incA;
  let incB;
  let valueA;
  let valueB;
  let ledA;
  let ledB;
  let log;
  let logLine;

  beforeEach(() => {
    jest.clearAllMocks();

    incA = {
      addEventListener: jest.fn(),
    };
    incB = {
      addEventListener: jest.fn(),
    };

    valueA = {
      textContent: '0',
    };
    valueB = {
      textContent: '0',
    };

    ledA = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };
    ledB = {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    };

    log = {
      append: jest.fn(),
    };

    logLine = {
      innerHTML: '',
      classList: {
        add: jest.fn(),
      },
    };

    global.document.createElement = (tag) => {
      if (tag === 'p') {
        return logLine;
      }
      return null;
    };

    global.document.querySelector = (selector) => {
      if (selector === '#inca') {
        return incA;
      }
      if (selector === '#incb') {
        return incB;
      }
      if (selector === '#counter-a > .value') {
        return valueA;
      }
      if (selector === '#counter-b > .value') {
        return valueB;
      }
      if (selector === '#counter-a > .led-box > .led') {
        return ledA;
      }
      if (selector === '#counter-b > .led-box > .led') {
        return ledB;
      }
      if (selector === '.log') {
        return log;
      }
      return undefined;
    };

    window.globalState = {
      counter: {
        dispatch: jest.fn(),
        getState: jest.fn(() => ({
          values: {
            a: 1,
            b: 2,
          },
        })),
        subscribe: jest.fn(),
      },
    };

    pageComponent = new PageComponent();
  });

  describe('Constructor', () => {
    it('Should init and register events', () => {
      pageComponent.registerButtonsEvents = jest.fn();
      pageComponent.registerStoreSubscribes = jest.fn();

      pageComponent.constructor();

      expect(pageComponent.registerButtonsEvents).toHaveBeenCalled();
      expect(pageComponent.registerStoreSubscribes).toHaveBeenCalled();
    });
  });

  describe('Register buttons events', () => {
    it('Should register buttons events', () => {
      pageComponent.registerButtonsEvents();

      expect(incA.addEventListener)
        .toHaveBeenCalledWith('click', expect.any(Function));
      expect(incB.addEventListener)
        .toHaveBeenCalledWith('click', expect.any(Function));
    });
  });

  describe('Buttons handle click', () => {
    it('Should inc counter value "a"', () => {
      pageComponent.btnIncAHandleClick();

      expect(window.globalState.counter.dispatch)
        .toHaveBeenCalledWith({ type: 'INC_A' });
    });

    it('Should inc counter value "b"', () => {
      pageComponent.btnIncBHandleClick();

      expect(window.globalState.counter.dispatch)
        .toHaveBeenCalledWith({ type: 'INC_B' });
    });
  });

  describe('Register store subscribes', () => {
    it('Should register store subscribes', () => {
      pageComponent.registerStoreSubscribes();

      expect(watchAHandlerMock).toHaveBeenCalledWith(expect.any(Function));
      expect(watchBHandlerMock).toHaveBeenCalledWith(expect.any(Function));
      expect(window.globalState.counter.subscribe)
        .toHaveBeenNthCalledWith(6, expect.any(Function));
    });
  });

  describe('Update values on view', () => {
    it('Should update counter values', () => {
      pageComponent.updateValuesOnView();

      expect(valueA.textContent).toEqual(1);
      expect(valueB.textContent).toEqual(2);
    });
  });

  describe('Blink led and log change', () => {
    it('Should blink led A and log change', () => {
      jest.useFakeTimers();

      pageComponent.blinkLedAndLog(1, 0, 'values.a');

      jest.runAllTimers();

      expect(ledA.classList.add).toHaveBeenCalledWith('blink');
      expect(logLine.classList.add).toHaveBeenCalledWith('yellow');
      expect(logLine.innerHTML).toEqual('<b>values.a</b> changed from <b>0</b> to <b>1</b>.');
      expect(log.append).toHaveBeenCalledWith(logLine);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
      expect(ledA.classList.remove).toHaveBeenCalledWith('blink');
    });

    it('Should blink led B and log change', () => {
      jest.useFakeTimers();

      pageComponent.blinkLedAndLog(2, 1, 'values.b');

      jest.runAllTimers();

      expect(ledB.classList.add).toHaveBeenCalledWith('blink');
      expect(logLine.classList.add).toHaveBeenCalledWith('red');
      expect(logLine.innerHTML).toEqual('<b>values.b</b> changed from <b>1</b> to <b>2</b>.');
      expect(log.append).toHaveBeenCalledWith(logLine);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
      expect(ledB.classList.remove).toHaveBeenCalledWith('blink');
    });
  });
});
