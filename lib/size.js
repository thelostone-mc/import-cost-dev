'use babel';
import axios from 'axios';
import version from './version';

let cache = {};

module.exports = module => {
  return new Promise((resolve, reject) => {
    if(!module)
      reject("module: name is empty");

    const v = version(module);

    if(v) module += "@" + v;
    if(cache[module]) resolve(cache[module]);

    // TODO : Read from node_modules and determine size

    const url = "https://bundlephobia.com/api/size?package=" + module;

    axios.get(url).then(response => {
      if(response.data && response.data.gzip) {
        const size = (response.data.gzip / 1000).toFixed(1) + "KB";
        cache[module] = size;
        resolve(size);
      }

      reject("module: unable look up " + module);
    });
  });
};
