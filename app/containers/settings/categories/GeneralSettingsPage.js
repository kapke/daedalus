// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import GeneralSettings from '../../../components/settings/categories/GeneralSettings';
import type { InjectedProps } from '../../../types/injectedPropsType';

@inject('stores', 'actions') @observer
export default class GeneralSettingsPage extends Component<InjectedProps> {

  static defaultProps = { actions: null, stores: null };

  onSelectLanguage = (values: { locale: string }) => {
    this.props.actions.profile.updateLocale.trigger(values);
  };

  switchNetwork = (name: string) => this.props.stores.etc.network.switchNetworkTo(name)

  render() {
    const { setProfileLocaleRequest, LANGUAGE_OPTIONS, currentLocale } = this.props.stores.profile;
    const isSubmitting = setProfileLocaleRequest.isExecuting;
    return (
      <GeneralSettings
        onSelectLanguage={this.onSelectLanguage}
        isSubmitting={isSubmitting}
        languages={LANGUAGE_OPTIONS}
        currentLocale={currentLocale}
        currentNetwork={this.props.stores.etc.network.name}
        onSelectNetwork={this.switchNetwork}
        error={setProfileLocaleRequest.error}
      />
    );
  }

}
