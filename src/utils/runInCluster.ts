import * as cluster from 'cluster';
import * as os from 'os';
import { Logger } from '@nestjs/common';

export function runInCluster(bootstrap: () => Promise<void>) {
  const numberOfCores = os.cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < numberOfCores; ++i) {
      cluster.fork();
    }
    cluster.on('online', (worker) => {
      Logger.log('Worker ' + worker.process.pid + ' is online.');
    });
    cluster.on('exit', ({ process }, code, signal) => {
      Logger.log('worker ' + process.pid + ' died.');
    });
  } else {
    bootstrap();
  }
}
