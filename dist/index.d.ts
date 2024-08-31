import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';

/**
 * Creates a `webex:webhooks:sendMessage` Scaffolder action.
 *
 * @public
 */
declare function createSendWebhooksMessageAction(): _backstage_plugin_scaffolder_node.TemplateAction<{
    format: string;
    message: string;
    webhooks: string[];
}, _backstage_types.JsonObject>;

export { createSendWebhooksMessageAction };
