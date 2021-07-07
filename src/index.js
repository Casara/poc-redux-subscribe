import './styles/main.scss';

import globalStateCounter from './globalState.counter';
import PageComponent from './pageComponent';

globalStateCounter.initCounterStore();

// eslint-disable-next-line
new PageComponent();
