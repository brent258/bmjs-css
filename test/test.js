const expect = require('chai').expect;
const css = require('../index');
const fs = require('fs');

describe('CSS', () => {

  it('should return an object', () => {
    expect(css).to.be.an('object');
    expect(css).to.not.be.undefined;
  });

  it('init should return initialize each media query section', () => {
    css.init();
    expect(css.markup).to.be.a('string');
    expect(css.markup).to.equal('');
    expect(css.xs.tags).to.deep.equal([]);
    expect(css.xs.animations).to.deep.equal([]);
    expect(css.xs.markup).to.equal('');
    expect(css.sm.tags).to.deep.equal([]);
    expect(css.sm.animations).to.deep.equal([]);
    expect(css.sm.markup).to.equal('');
    expect(css.md.tags).to.deep.equal([]);
    expect(css.md.animations).to.deep.equal([]);
    expect(css.md.markup).to.equal('');
    expect(css.lg.tags).to.deep.equal([]);
    expect(css.lg.animations).to.deep.equal([]);
    expect(css.lg.markup).to.equal('');
    expect(css.sm.query).to.equal(576);
    expect(css.md.query).to.equal(768);
    expect(css.lg.query).to.equal(992);
  });

  it('CSS tag should return the appropriate object', () => {
    css.init();
    expect(css.tag('h1')).to.be.an('object');
    expect(css.tag('h1')).to.have.property('inline');
    expect(css.tag('h1')).to.have.property('tag');
    expect(css.tag('h1')).to.have.property('xs');
    expect(css.tag('h1')).to.have.property('sm');
    expect(css.tag('h1')).to.have.property('md');
    expect(css.tag('h1')).to.have.property('lg');
    expect(css.tag('h1')).to.have.property('prop');
    expect(css.tag('h1')).to.have.property('close');
    expect(css.tag('h1').close()).to.be.an('object');
    expect(css.tag('h1').close().xs).to.be.a('string');
    expect(css.tag('h1').close().sm).to.be.a('string');
    expect(css.tag('h1').close().md).to.be.a('string');
    expect(css.tag('h1').close().lg).to.be.a('string');
    expect(css.tag('h1').close().inline).to.be.a('string');
    expect(css.tag('h1').prop('padding','0').close().xs).to.be.a('string');
    expect(css.tag('h1').prop('padding','0').close().xs).to.equal('h1 {\n    padding: 0;\n}');
    expect(css.tag('h1').prop('padding','0','sm').close().sm).to.equal('h1 {\n        padding: 0;\n    }');
    expect(css.tag('h1').prop('padding','0','md').close().md).to.equal('h1 {\n        padding: 0;\n    }');
    expect(css.tag('h1').prop('padding','0','lg').close().lg).to.equal('h1 {\n        padding: 0;\n    }');
    expect(css.tag('h1').prop('padding','0').close().inline).to.equal('padding: 0;');
  });

  it('CSS tag should throw if no string is entered', () => {
    expect(()=>{css.tag()}).to.throw();
  });

  it('add method should correctly add CSS tags', () => {
    css.init().add(css.tag('h1').prop('padding','0').close());
    expect(css.xs.tags.length).to.equal(1);
    expect(css.xs.tags[0]).to.equal('h1 {\n    padding: 0;\n}');
    css.init().add(css.tag('h1').prop('padding','0','sm').close());
    expect(css.sm.tags.length).to.equal(1);
    expect(css.sm.tags[0]).to.equal('h1 {\n        padding: 0;\n    }');
    css.init().add(css.tag('h1').prop('padding','0','md').close());
    expect(css.md.tags.length).to.equal(1);
    expect(css.md.tags[0]).to.equal('h1 {\n        padding: 0;\n    }');
    css.init().add(css.tag('h1').prop('padding','0','lg').close());
    expect(css.lg.tags.length).to.equal(1);
    expect(css.lg.tags[0]).to.equal('h1 {\n        padding: 0;\n    }');
  });

  it('file method should write CSS to file without error', () => {
    expect(()=>{css.init().add(css.tag('h1').prop('width','70%').m('5px').pl('5px').c('#333','lg').c('#777','md').d('inline-block').close()).file('test/test.css')}).to.not.throw();
  });

  it('keys method should produce @keyframes with properties and add to xs animations', () => {
    css.init();
    css.keys('myAnimation',css.tag('from, to').w('100%').close(),css.tag('50%').w('0%').close());
    expect(css.xs.animations.length).to.equal(1);
    expect(css.xs.animations[0]).to.equal('@keyframes myAnimation {\n    from, to {width: 100%;}\n    50% {width: 0%;}\n}');
    css.add(css.tag('h1').c('#333').w('100%','md').close());
    css.file('test/test.css');
  });

  it('reset should add all base styles to the CSS', () => {
    css.init();
    expect(()=>{css.reset()}).to.not.throw();
    css.init().reset().minify();
    expect(css.markup).to.not.equal('');
    expect(css.xs.tags.length).to.equal(7);
  });

  it('grid should add responsive styles to the CSS', () => {
    css.init();
    expect(()=>{css.grid()}).to.not.throw();
    css.init().grid('md');
    css.file('test/test.css');
    expect(css.markup).to.not.equal('');
    expect(css.xs.tags.length).to.equal(8);
    expect(css.md.tags.length).to.equal(12);
  });

});
