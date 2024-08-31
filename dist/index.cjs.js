'use strict';

var axios = require('axios');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var zod = require('zod');
var node_util = require('node:util');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefaultCompat(axios);

const ERROR_MESSAGE_FORMAT = "Failed to send webhook message to %s (HTTP %d)";
function createSendWebhooksMessageAction() {
  return pluginScaffolderNode.createTemplateAction({
    id: "webex:webhooks:sendMessage",
    description: "Sends a message using Webex Incoming Webhooks",
    schema: {
      input: zod.z.object({
        format: zod.z.enum(["text", "markdown"]).describe("The message content format"),
        message: zod.z.string({
          required_error: "Message is required",
          invalid_type_error: "Message must be a string"
        }).min(1, "Message should not be empty").describe("The message to send via webhook(s)"),
        webhooks: zod.z.string({
          required_error: "Webhook urls are required",
          invalid_type_error: "Webhook urls must be a string array"
        }).array().nonempty().describe("The Webex Incoming Webhooks to send a message to")
      })
    },
    async handler(ctx) {
      const failedMessages = [];
      const webhooks = ctx.input.webhooks || [];
      for (const webhook of webhooks) {
        try {
          const { status } = await axios__default.default.post(webhook, {
            [ctx.input.format]: ctx.input.message
          });
          if (status !== axios.HttpStatusCode.Ok) {
            failedMessages.push(node_util.format(ERROR_MESSAGE_FORMAT, webhook, status));
          }
        } catch (error) {
          const status = axios__default.default.isAxiosError(error) ? error.status : 500;
          failedMessages.push(node_util.format(ERROR_MESSAGE_FORMAT, webhook, status));
        }
      }
      ctx.output("failedMessages", failedMessages);
    }
  });
}

exports.createSendWebhooksMessageAction = createSendWebhooksMessageAction;
//# sourceMappingURL=index.cjs.js.map
