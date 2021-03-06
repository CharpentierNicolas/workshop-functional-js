var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;


describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return false', function() {
    expect(transformCheckpoint()).to.be.false;
  });

  it('Verify parameter is mutated with the function', function() {
    expect(transformCheckpoint(
    	{
			  id: 'whataw0nd3rful1d',
			  uuid: 'whataw0nd3rful1d',
			  address: 'unknown',
			  addressType: 'unknown',
			  connectable: true,
			  advertisement: 
			  {
			    localName: undefined,
			    txPowerLevel: undefined,
			    manufacturerData: undefined,
			    serviceData: [],
			    serviceUuids: [ 'abcd' ]
			  },
			  rssi: -66,
			  services: null,
			  state: 'outofcontrol'
			})).to.be.eql(true);
		});

   it('Verify transformCheckpoint is pure function', function() {
    expect(transformCheckpoint(
	    {
		  id: 'whataw0nd3rful1d',
		  uuid: 'whataw0nd3rful1d',
		  address: 'unknown',
		  addressType: 'unknown',
		  connectable: true,
		  advertisement: 
		  {
			    localName: undefined,
			    txPowerLevel: undefined,
			    manufacturerData: undefined,
			    serviceData: [],
			    serviceUuids: [ 'abcd' ]
		  },
			  rssi: -66,
			  services: null,
			  state: 'outofcontrol'
		})).to.be.sealed;
  });

});