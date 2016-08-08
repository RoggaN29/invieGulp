var gulp = require('gulp')
var postcss = require('gulp-postcss')
//var autoprefixer = require('autoprefixer')
// autoprefixer:  agrega automaticamente vendor prefixes-para determinadas propiedades que no son iguales en todos los navegadores por ej. display:flex
//transpiler escribe "css del futuro" y lo traduce al css para que los navegadores actuales lo puedan leer 
var rucksack = require('rucksack-css')
//fuentes responsive automaticas sin media queries
var cssnext = require('postcss-cssnext')
//Conjunto de varios puggins para usar el "css a futuro desde" ahora(ya incluye autoprefixer, custon media queries)
var cssnested = require('postcss-nested')
//Para usar sintaxis de anidamiento de clases tipo sass y stylus
var mixins = require('postcss-mixins')
//Pequeños bloques para reutilizar estilos
var lost = require('lost')
//Grillas responsive al estilo boostrap o fundation
var atImport = require('postcss-import')
//Permite separar nuestro fichero css en varios modulos e importarlos cuando se necesiten 
var csswring = require('csswring')
//Minifica nuestro archivo css de salida
var mqpacker = require('css-mqpacker')
//Agrupa en orden los bloques para que pueda ser leido mejor por el browser(media queries al final
var browserSync = require('browser-sync').create()

//Servidor de desarrollo
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

//Tarea para procesar el CSS
gulp.task('css',function(){

    var processors = [
    atImport(),
    mixins(),
    cssnested,
    lost(),
    rucksack(),
    cssnext({ browsers: ['> 5%', 'ie 8'] }), //Da soporte a los navegadores que tienen mas del 5% del uso y a las versiones a partir ie8
    mqpacker(),
    csswring()
  ]

  return gulp.src('./src/invie.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambios
  gulp.task('watch', function () {
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve'])