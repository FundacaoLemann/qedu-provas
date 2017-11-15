module.exports = {
  staticFileGlobs: [
    'dist/assets/**',
    'dist/**.html',
    'dist/**.css}',
    'dist/**.js',
    'dist/**.svg',
    'dist/**.gif',
    'dist/**.png',
    'dist/**.jpg',
    'dist/**.jpeg',
    'dist/**.ico',
    'dist/**.eot',
    'dist/**.ttf',
    'dist/**.woff',
    'dist/**.woff2'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  directoryIndex: 'index.html',
  navigateFallback: 'index.html',
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
  runtimeCaching: []
}
