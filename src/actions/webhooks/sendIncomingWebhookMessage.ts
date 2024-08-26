import axios, { HttpStatusCode } from 'axios'
import { Config } from '@backstage/config'
import { InputError } from '@backstage/errors'
import { createTemplateAction } from '@backstage/plugin-scaffolder-node'
import { z } from 'zod'

interface SendIncomingWebhookMessageOptions {
  config: Config
}

/**
 * Creates a `webex:webhook:sendMessage` Scaffolder action.
 *
 * @public
 */
export function createSendIncomingWebhookMessageAction({
  config,
}: SendIncomingWebhookMessageOptions) {
  return createTemplateAction<{
    message: string
    webhooks?: string[]
  }>({
    id: 'webex:webhook:sendMessage',
    description: 'Sends a message using Webex Incoming Webhooks',
    schema: {
      input: z.object({
        message: z
          .string({
            required_error: 'Message is required',
            invalid_type_error: 'Message must be a string',
          })
          .describe('The message to send via webhook(s)'),
        webhooks: z
          .string({
            required_error: 'Webhook urls are required',
            invalid_type_error: 'Webhook urls must be a string array',
          })
          .array()
          .describe('The Webex Incoming Webhooks to send a message to'),
      }),
    },
    async handler(ctx) {
      const webhooks: string[] =
        config.getOptionalStringArray('webex.webhooks') ?? ctx.input.webhooks

      if (webhooks?.length <= 0) {
        throw new InputError(
          'At least one Webex Incoming Webhook url should be provided.'
        )
      }
      const responses = await Promise.all(
        webhooks.map(
          async (webhook) =>
            await axios.post(webhook, {
              text: ctx.input.message,
            })
        )
      )
      const successful = responses.every(
        (response) => response.status === HttpStatusCode.Ok
      )
      if (!successful) {
        const message = `Something went wrong while trying to send a message to webhook URL - StatusCode ${result.status}`
        throw new Error(message)
      }
    },
  })
}
