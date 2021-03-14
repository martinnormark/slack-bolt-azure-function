const { IncomingMessage } = require('http');
const { HTTPReceiver } = require('@slack/bolt');
const ResponseProxy = require('../ResponseProxy');
const NOOP = () => {};

const app = require('../App');
const rec = new HTTPReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    endpoints: ['/slack/events']
});

rec.init(app);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let inc = new IncomingMessage({ destroy: NOOP });
    inc.url = req.originalUrl;
    inc.method = req.method;
    inc.body = req.body;
    inc.headers = req.headers;
    inc.rawBody = Buffer.from(req.rawBody);

    let resp = new ResponseProxy();

    rec.requestListener(inc, resp);

    context.res = await resp.getResponse();
}