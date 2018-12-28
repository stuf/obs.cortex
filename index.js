#!/usr/bin/env node
require('dotenv').config();
const argv = require('./src/core/argv');
require('./src/index').run(argv);
