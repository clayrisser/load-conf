import path from 'path';
import loadConf, { loadYaml, loadJson, loadJavaScript } from '../src';

describe('loadYaml', () => {
  it("should be 'null' when config not found", async () => {
    expect(loadYaml(path.resolve('./tests/null'))).toBe(null);
  });
  it('should load config', async () => {
    expect(loadYaml(path.resolve('./tests/test.yml'))).toEqual({
      howdy: 'yaml'
    });
  });
  it("should be 'null' when invalid config", async () => {
    expect(loadYaml(path.resolve('./tests/_test.js'))).toEqual(null);
  });
});

describe('loadJson', () => {
  it("should be 'null' when config not found", async () => {
    expect(loadJson(path.resolve('./tests/null'))).toBe(null);
  });
  it('should load config', async () => {
    expect(loadJson(path.resolve('./tests/test.json'))).toEqual({
      howdy: 'json'
    });
  });
  it("should be 'null' when invalid config", async () => {
    expect(loadJson(path.resolve('./tests/test.yml'))).toEqual(null);
  });
});

describe('loadJavaScript', () => {
  it("should be 'null' when config not found", async () => {
    expect(loadJavaScript(path.resolve('./tests/null'))).toBe(null);
  });
  it('should load config', async () => {
    expect(loadJavaScript(path.resolve('./tests/_test.js'))).toEqual({
      howdy: 'javascript'
    });
  });
  it("should be 'null' when invalid config", async () => {
    expect(loadJavaScript(path.resolve('./tests/test.yml'))).toEqual(null);
  });
});

describe('loadConf', () => {
  it('should equal an empty object when config not found', async () => {
    expect(loadConf(path.resolve('./tests/null'))).toEqual({});
  });
  it('should auto detect yaml', async () => {
    expect(loadConf(path.resolve('./tests/test.yml'))).toEqual({
      howdy: 'yaml'
    });
  });
  it('should auto detect json', async () => {
    expect(loadConf(path.resolve('./tests/test.json'))).toEqual({
      howdy: 'json'
    });
  });
  it('should auto detect javascript', async () => {
    expect(loadConf(path.resolve('./tests/_test.js'))).toEqual({
      howdy: 'javascript'
    });
  });
});
