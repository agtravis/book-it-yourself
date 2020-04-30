"use strict";

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: `jest`,
    },
    binary: {
      version: `4.2.3`,
      skipMD5: true,
    },
    autoStart: false,
  },
};
