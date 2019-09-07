import { app } from './server/config/express';
import { config } from './server/config/config';
require('./server/config/mongoose');
const runPort = process.env.PORT || config.port;

// TODO : Use HTTP2 in next express generation. For now express(v4) and heroku does not support http2
app.listen(runPort, () => {
  console.log(
    `Node Express server listening on http://localhost:${runPort} (${config.env})`
  );
});
