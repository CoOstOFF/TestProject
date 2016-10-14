const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../public/schema.json');

module.exports = getBabelRelayPlugin(schema.data);