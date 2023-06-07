import pkg from 'lodash';

const { assign } = pkg;

/**
 *
 * @param options
 * @param options.baseUrl
 * @param options.hostName
 * @param options.url
 * @param options.originalUrl
 * @param options.path
 * @param options.ip
 * @constructor
 */
let Request: any;
let Response: any;

function MockRequest(this: any, options: any) {
  assign(this, options);
}

function MockResponse(this: any) {
  this.headers = {};
}

MockResponse.prototype.setHeader = function (this: any, name: any, value: any) {
  if (!this.headers) this.headers = {};
  this.headers[name.toLowerCase()] = value;
};

// Request = MockRequest;
// Response = MockResponse;

export { MockRequest, MockResponse };
