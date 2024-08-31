# @coderrob/backstage-plugin-scaffolder-backend-module-webex

<a href="https://www.buymeacoffee.com/coderrob" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 200px !important;" ></a>

The Webex Incoming Webhooks messaging module for [@backstage/plugin-scaffolder-backend](https://www.npmjs.com/package/@backstage/plugin-scaffolder-backend). This Backstage.io module contains actions for sending messages using Webex Incoming Webhooks.

## Prerequisites

- [Node.js](https://nodejs.org/en/download) must be installed in the environment.
- You must have a [Webex Incoming Webhook](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apphub.webex.com/applications/incoming-webhooks-cisco-systems-38054-23307-75252) URL available to send messages.

## Getting Started

To add the Webex Incoming Webhooks module to your Backstage project, follow these steps:

1. **Install the module:**

   In the root directory of your Backstage project, run the following command:

   ```shell
   yarn add --cwd packages/backend @coderrob/backstage-plugin-scaffolder-backend-module-webex
   ```

1. **Register the custom action:**

   After installing the module, you'll need to register the Webex Incoming Webhooks action in your Scaffolder backend.

   Open your `packages/backend/src/plugins/scaffolder.ts` file and [register the custom action](https://backstage.io/docs/features/software-templates/writing-custom-actions/#registering-custom-actions) as follows:

   ```typescript
   const backend = createBackend();
   backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
   backend.add(import('@coderrob/backstage-plugin-scaffolder-backend-module-webex'));
   ```

   This code snippet registers the `createSendWebhooksMessageAction` with the Scaffolder backend using the latest Backstage.io backend framework.

1. **Using the action in a scaffolder template:**

   Once the action is registered, you can use it in your scaffolder templates to send messages via Webex Incoming Webhooks.

   Here's an example template:

   ```yaml
   spec:
     . . . 
     steps:
       - id: send-webex-message
         name: Send Webex Message
         action: webex:webhooks:sendMessage
         input:
           format: "markdown"
           message: "# This Could Be Us"
           webhooks: 
             - "https://webexapis.com/v1/webhooks/incoming/<SPACE_ID>"
             - "https://webexapis.com/v1/webhooks/incoming/<SPACE_ID>" # optional ability to message multiple spaces
   ```

1. **Deploy and test:**

   With everything configured, deploy your Backstage instance and test the Webex Incoming Webhooks action by running a template that includes the `webex:webhooks:sendMessage` step.

   If everything is set up correctly, the specified Webex channels should receive the messages as defined in your template.
