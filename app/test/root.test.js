const chai = require("chai");
const sinon = require("sinon");
var rootResponder = require("../routes/root");

// const expect = chai.expect;
// const assert = chai.assert;
chai.should();
describe("Root Directory Test", function() {
  describe("Should Behave properly on GETing /", function() {
    const nextSpy = sinon.spy();
    const resSpy = { send: sinon.spy() };
    beforeEach(function() {
      nextSpy.resetHistory();
      resSpy.send.resetHistory();
    });
    it("should call next", function() {
      rootResponder({}, resSpy, nextSpy);
      nextSpy.calledOnce.should.be.true;
    });

    it("should call send on resp", function() {
      rootResponder({}, resSpy, nextSpy);
      resSpy.send.calledOnce.should.be.true;
    });
    it("should call send on resp with Hello World as a message", function() {
      rootResponder({}, resSpy, nextSpy);
      resSpy.send.calledWith({ message: "hello K8s" }).should.be.true;
    });
    it("should have json as the content type of the respones", function() {
      rootResponder({}, resSpy, nextSpy);
      resSpy.contentType.should.exist;
      resSpy.contentType.should.equal("json");
    });
  });
});
