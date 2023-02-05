import { api } from './api';

const response = api.ping.query();
response.then((v) => {
  console.log(v);
});

api.timer.subscribe(undefined, {
  onData(data) {
    console.log('WS:', data);
  },
  onError(err) {
    console.error(err);
  },
});
