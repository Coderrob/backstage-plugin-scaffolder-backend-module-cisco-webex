/*
 * Copyright 2024 @Coderrob
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import axios, { HttpStatusCode } from 'axios';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { format } from 'node:util';
import { z } from 'zod';

const ERROR_MESSAGE_FORMAT = 'Failed to send webhook message to %s (HTTP %d)';

/**
 * Creates a `webex:webhooks:sendMessage` Scaffolder action.
 *
 * @public
 */
export function createSendWebhooksMessageAction() {
  return createTemplateAction<{
    format: string;
    message: string;
    webhooks: string[];
  }>({
    id: 'webex:webhooks:sendMessage',
    description: 'Sends a message using Webex Incoming Webhooks',
    schema: {
      input: z.object({
        format: z
          .enum(['text', 'markdown'])
          .describe('The message content format'),
        message: z
          .string({
            required_error: 'Message is required',
            invalid_type_error: 'Message must be a string',
          })
          .min(1, 'Message should not be empty')
          .describe('The message to send via webhook(s)'),
        webhooks: z
          .string({
            required_error: 'Webhook urls are required',
            invalid_type_error: 'Webhook urls must be a string array',
          })
          .array()
          .nonempty()
          .describe('The Webex Incoming Webhooks to send a message to'),
      }),
    },
    async handler(ctx) {
      const failedMessages: string[] = [];
      const webhooks: string[] = ctx.input.webhooks || [];
      for (const webhook of webhooks) {
        try {
          const { status } = await axios.post(webhook, {
            [ctx.input.format]: ctx.input.message,
          });
          if (status !== HttpStatusCode.Ok) {
            failedMessages.push(format(ERROR_MESSAGE_FORMAT, webhook, status));
          }
        } catch (error) {
          const status = axios.isAxiosError(error) ? error.status : 500;
          failedMessages.push(format(ERROR_MESSAGE_FORMAT, webhook, status));
        }
      }
      ctx.output('failedMessages', failedMessages);
    },
  });
}
