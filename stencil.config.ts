import {Config} from '@stencil/core';
import {sass} from "@stencil/sass";
import {inlineSvg} from 'stencil-inline-svg';
import {postcss} from '@stencil/postcss';
import {namespace} from "./src/global";
import * as path from "path";

// This is needed for jest to create stubs of anything that isn't javascript
const stub = {
  '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
};


export const config: Config = {
  namespace,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      buildDir: namespace,
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass({
      importer: (url) => ({file: url.startsWith('~') ? path.resolve('./node_modules', url.substr(1)) : url})
    }),
    inlineSvg(),
    postcss()
  ],
  enableCache: false,
/*  excludeSrc: [
    '/test/',
    '**!/!*.spec.*',
    '**!/!*.test.*',
    '**!/!*.e2e.*',
    '**!/!*.stories.*'
  ],*/
  devServer: {
    openBrowser: false
  },
  testing: {
    transformIgnorePatterns: ['\\.svg$'],
    testRegex: '\\.spec\\.tsx?$',
    transform: stub,
    moduleNameMapper: stub,
    reporters: [ "default", "jest-junit" ],
  }
};
