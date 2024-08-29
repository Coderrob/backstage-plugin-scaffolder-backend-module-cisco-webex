import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api'
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha'
import { createSendIncomingWebhookMessageAction } from './sendIncomingWebhookMessage'

/**
 * A backend module that registers the action into the scaffolder
 */
export const webexWebhookScaffolderModule = createBackendModule({
  moduleId: 'webex:webhooks',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        config: coreServices.rootConfig,
        scaffolderActions: scaffolderActionsExtensionPoint,
      },
      async init({ config, scaffolderActions }) {
        scaffolderActions.addActions(
          createSendIncomingWebhookMessageAction({ config })
        )
      },
    })
  },
})
