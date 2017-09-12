#!/usr/bin/env node
'use strict';
const meow = require('meow');
const radiopoznan = require('./radiopoznan-dl.js');
const cli = meow(`
	Usage
	  $ radiopoznan <url>

	Examples
	  $ radiopoznan http://radiopoznan.fm/audycje/historia-bez-retuszu
`);
radiopoznan(cli.input[0], cli.flags);
