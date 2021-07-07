/* eslint class-methods-use-this: ["error", { "exceptMethods": ["btnIncAHandleClick", "btnIncBHandleClick"] }] */

import watch from 'redux-watch';
import globalStateCounter from './globalState.counter';

const { incA, incB } = globalStateCounter;

function createLogLineElement(color, path, oldVal, newVal) {
  const element = document.createElement('p');

  element.classList.add(color);
  element.innerHTML = `<b>${path}</b> changed from <b>${oldVal}</b> to <b>${newVal}</b>.`;

  return element;
}

class PageComponent {
  constructor() {
    this.valueA = document.querySelector('#counter-a > .value');
    this.ledA = document.querySelector('#counter-a > .led-box > .led');
    this.valueB = document.querySelector('#counter-b > .value');
    this.ledB = document.querySelector('#counter-b > .led-box > .led');
    this.log = document.querySelector('.log');

    this.registerButtonsEvents();
    this.registerStoreSubscribes();
  }

  registerButtonsEvents() {
    document.querySelector('#inca')
      .addEventListener('click', this.btnIncAHandleClick.bind(this));
    document.querySelector('#incb')
      .addEventListener('click', this.btnIncBHandleClick.bind(this));
  }

  btnIncAHandleClick() {
    window.globalState.counter.dispatch(incA());
  }

  btnIncBHandleClick() {
    window.globalState.counter.dispatch(incB());
  }

  registerStoreSubscribes() {
    const watchA = watch(window.globalState.counter.getState, 'values.a');
    const watchB = watch(window.globalState.counter.getState, 'values.b');

    window.globalState.counter.subscribe(watchA(this.blinkLedAndLog.bind(this)));
    window.globalState.counter.subscribe(watchB(this.blinkLedAndLog.bind(this)));
    window.globalState.counter.subscribe(this.updateValuesOnView.bind(this));
  }

  updateValuesOnView() {
    const { a, b } = window.globalState.counter.getState().values;
    this.valueA.textContent = a;
    this.valueB.textContent = b;
  }

  blinkLedAndLog(newVal, oldVal, objectPath) {
    let color;
    let led;

    if (objectPath === 'values.a') {
      color = 'yellow';
      led = this.ledA;
    } else {
      color = 'red';
      led = this.ledB;
    }

    led.classList.add('blink');
    this.log.append(createLogLineElement(color, objectPath, oldVal, newVal));
    setTimeout(() => led.classList.remove('blink'), 500);
  }
}

export default PageComponent;
