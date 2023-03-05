import install from './imgview'

if (!window.$mangodoc) {
  window.$mangodoc = {}
}

window.$mangodoc.plugins = (window.$mangodoc.plugins || []).concat(install)