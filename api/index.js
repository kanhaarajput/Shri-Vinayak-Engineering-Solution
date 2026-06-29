// This file acts as the entry point for Vercel Serverless Functions.
// Vercel maps anything inside the /api directory to a serverless endpoint.
const app = require('../server/index.js');
module.exports = app;
