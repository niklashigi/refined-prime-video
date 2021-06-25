const gulp = require('gulp')

const multiDest = require('gulp-multi-dest')
const rename = require('gulp-rename')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const postCss = require('gulp-postcss')
const sass = require('gulp-sass')(require('sass'))

const del = require('del')
const tailwindCss = require('tailwindcss')
const csso = require('postcss-csso')

const isProduction = process.env.NODE_ENV === 'production'

const commonDest = () => multiDest(['extensions/chrome', 'extensions/firefox'])

const clean = () => del('extensions/*/**')

const copyIcon = () => gulp.src('source/icon.png').pipe(commonDest())

const compileJs = () =>
  webpackStream(require('./webpack.config.js'), webpack).pipe(commonDest())

const compilePopupCss = () =>
  gulp
    .src('source/popup/popup.css')
    .pipe(
      postCss([
        tailwindCss(),
        ...(isProduction ? [csso({ comments: false })] : []),
      ]),
    )
    .pipe(commonDest())

const compileContentCss = () =>
  gulp
    .src('source/content.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(commonDest())

const copyChromeHtml = () =>
  gulp
    .src('source/popup/popup.chrome.html')
    .pipe(rename('popup.html'))
    .pipe(gulp.dest('extensions/chrome'))

const copyChromePolyfill = () =>
  gulp
    .src('node_modules/webextension-polyfill/dist/browser-polyfill.min.js')
    .pipe(gulp.dest('extensions/chrome'))

const copyFirefoxHtml = () =>
  gulp
    .src('source/popup/popup.firefox.html')
    .pipe(rename('popup.html'))
    .pipe(gulp.dest('extensions/firefox'))

const generateManifests = require('./scripts/generate-manifests')

const build = gulp.series(
  clean,
  gulp.parallel(
    copyIcon,
    compileJs,
    compilePopupCss,
    compileContentCss,
    copyFirefoxHtml,
    copyChromeHtml,
    copyChromePolyfill,
    generateManifests,
  ),
)

const watch = () => {
  gulp.watch('source/**/*.scss', compileContentCss)
  gulp.watch(['source/popup/popup.css', 'tailwind.config.js'], compilePopupCss)
  gulp.watch('source/**/*.(ts|vue)', compileJs)
  gulp.watch('source/manifest.js', generateManifests)
}

const dev = gulp.series(build, watch)

module.exports = { build, dev }

// Necessary in order to see errors from webpack
process.on('unhandledRejection', (_, promise) => {
  console.log('Unhandled promise rejection:', promise)
  process.exit(1)
})
