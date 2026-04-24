import '@testing-library/jest-dom';
import { createRequire } from 'module';
import { Module } from 'module';

const require03 = createRequire(import.meta.url);
const reactResolved = require03.resolve('react');
const reactDomResolved = require03.resolve('react-dom');

const origResolve = Module._resolveFilename.bind(Module);
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === 'react') return reactResolved;
  if (request === 'react-dom') return reactDomResolved;
  return origResolve(request, parent, isMain, options);
};
