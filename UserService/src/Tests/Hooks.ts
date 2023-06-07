import sinon from 'sinon';
const mochaHooks = {
  afterEach() {
    sinon.restore();
  },
};
export { mochaHooks };
