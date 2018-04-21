import fs from 'fs-extra';
import { safeLoad } from 'js-yaml';

export default function loadConf(path, defaultsTo = {}, type) {
  if (!fs.existsSync(path)) return defaultsTo;
  switch (type) {
    case 'json':
      return loadJson(path) || defaultsTo;
    case 'yaml':
      return loadYaml(path) || defaultsTo;
    case 'javascript':
      return loadJavaScript(path) || defaultsTo;
  }
  let config = loadJson(path);
  if (!config) config = loadYaml(path);
  if (!config) config = loadJavaScript(path);
  if (!config) config = {};
  return config;
}

export function loadYaml(path) {
  try {
    return safeLoad(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    return null;
  }
}

export function loadJson(path) {
  try {
    return fs.readJsonSync(path);
  } catch (err) {
    return null;
  }
}

export function loadJavaScript(path) {
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const config = require(path);
    if (config.default) return config.default;
    return config;
  } catch (err) {
    return null;
  }
}
