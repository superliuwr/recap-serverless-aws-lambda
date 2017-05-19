"use strict";

const mocha = require('mocha');
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;

const sinon = require('sinon');

const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

let underTest = require('../lib/profileService.js');

describe('Profile', function(){
  it('Should return successfully', sinon.test(() => {
    const profile = underTest.getUserProfile({profile: {name: 'Marvin'}}, 'test-uid');

    return expect(profile.name).to.equal('Marvin');
  }));
});
