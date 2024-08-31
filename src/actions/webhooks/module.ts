import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createSendWebhooksMessageAction } from './sendWebhooksMessageAction';

/**
 * A backend module that registers the action into the scaffolder
 */
export const webexWebhookScaffolderModule = createBackendModule({
  moduleId: 'webex:webhooks',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: { scaffolderActions: scaffolderActionsExtensionPoint },
      async init({ scaffolderActions }) {
        scaffolderActions.addActions(createSendWebhooksMessageAction());
      },
    });
  },
});
