import { addUser } from './reducers';
import { store } from './reducers';
import data from './data.json';

function defaultData() {
  data.forEach((user: any) => {
    store.dispatch(addUser(user));
  });
}

export default defaultData;