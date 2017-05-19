'use strict';

global.chai = require('chai');
global.chai.should();

global.expect = global.chai.expect;
global.sinon = require('sinon');

const sinonChai = require('sinon-chai');
global.chai.use(sinonChai);

const chaiAsPromised = require('chai-as-promised');
global.chai.use(chaiAsPromised);
