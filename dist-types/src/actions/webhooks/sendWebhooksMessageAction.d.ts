/**
 * Creates a `webex:webhooks:sendMessage` Scaffolder action.
 *
 * @public
 */
export declare function createSendWebhooksMessageAction(): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    format: string;
    message: string;
    webhooks: string[];
}, import("@backstage/types").JsonObject>;
