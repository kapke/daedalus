// @flow
import { observable, computed } from 'mobx';
import globalMessages from '../../i18n/global-messages';

import Store from '../lib/Store';

export class EtcNetworkStore extends Store {
  @observable
  name = '';

  @computed
  get currencyUnitMsg(): string {
    return this.name === 'etc' ? globalMessages.unitEtc : globalMessages.unitEth;
  }

  setup() {
    this.api.etc.startEtcNode();
    this.api.etc.getCurrentNetworkName()
      .then(name => this.name = name);
  }

  switchNetworkTo(networkName: string): Promise<void> {
    return this.api.etc.switchToNetwork(networkName)
      .then(() => {
        this.name = networkName;
      });
  }
}
