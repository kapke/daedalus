import { spawn, spawnSync } from 'child_process';
import process from 'process';

import psTree from 'ps-tree';
import Log from 'electron-log';

export class Mantis {
  supportedNetworks = ['etc', 'eth'];

  constructor(mantisPath) {
    this.mantisProcess = null;
    this.mantisPath = mantisPath;
  }

  start = networkName => {
    if (this.mantisProcess) {
      return;
    }

    if (!this.supportedNetworks.includes(networkName)) {
      throw new Error(`Unsupported network ${networkName}. Supported networks are ${this.supportedNetworks}`);
    }

    Log.info('Starting Mantis...');
    this.mantisProcess = spawn(
      this.getNetworkCmd(networkName),
      [],
      { cwd: this.mantisPath, detached: true, shell: true }
    );
  }

  stop = () => {
    if (!this.mantisProcess) {
      return;
    }

    const mantisPid = this.mantisProcess.pid;
    Log.info('Stopping Mantis(PID ' + mantisPid + ')...');
    if (process.platform === 'win32') {
      Log.info('with taskkill');
      spawnSync('taskkill', ['/F', '/T', '/PID', mantisPid], { detached: true }); // Kill main Mantis process
      Log.info('done');
    } else {
      Log.info('with process.kill');
      psTree(mantisPid, (err, children) => {
        // Kill all Mantis child processes
        children.forEach((proc) => {
          Log.info('and child ' + proc.PID);
          process.kill(proc.PID);
        });
      });
      process.kill(mantisPid); // Kill main Mantis process
    }
  }

  getNetworkCmd = networkName => `mantis-${networkName}`;

  getNetworkArg = networkName => `-Dmantis.blockchains.network=${networkName}`;
}
