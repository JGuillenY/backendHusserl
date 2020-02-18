var fs = require('fs');
const minify = require('@node-minify/core');
const uglifyes = require('@node-minify/uglify-es')
// const csso = require('@node-minify/csso');
const csso = require('@node-minify/csso');
const htmlMinifier = require('@node-minify/html-minifier');
const createSymlink = require('create-symlink');
var ncp = require('ncp').ncp;
var rimraf = require("rimraf");
 
ncp.limit = 10000;

console.log("Preparando...")

rimraf("./dist", function () { 
  console.log("Iniciando instalación..."); 
  console.log("--------------------------")
 
  console.log("Diccionario")
  console.log("--------------------------")
  console.log("Minificando archivos JS...")

  minify({
    compressor: uglifyes,
    input: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/jquery-view/dist/jquery-view.js',
    "node_modules/jquery-scrollTo/dist/jquery-scrollTo.min.js",
    'node_modules/jquery-lang-js/js/jquery-lang.js', 'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'ckeditorFull/ckeditor.js', 'ckeditorFull/adapters/jquery.js'],
    output: './dist/js/vendor.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: vendor minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['js/localStorage.js', 'js/langConfig.js', 'js/configuration.js', 'js/app.js'],
    output: './dist/js/app.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: app minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['js/initialCheck.js', 'diccionario/js/main.js'],
    output: './dist/diccionario/js/main.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: main minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['diccionario/js/login.js'],
    output: './dist/diccionario/js/login.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: login minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['diccionario/js/pasajes.js'],
    output: './dist/diccionario/js/pasajes.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: pasajes minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['diccionario/js/alfabeto.js'],
    output: './dist/diccionario/js/alfabeto.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: alfabeto minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['diccionario/js/manual.js'],
    output: './dist/diccionario/js/manual.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: manual minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['diccionario/js/acerca_de.js'],
    output: './dist/diccionario/js/acerca_de.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: acercade minificado');
    }
  });

  console.log("Minificando archivos CSS...")

  // minify({
  //   compressor: csso,
  //   input: ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'fontawesome/css/all.min.css'],
  //   output: './dist/css/vendor.css',
  //   // type: 'js',
  //   sync: true,
  //   callback: function(err, value) {
  //     console.log('CSS: vendor minificado');
  //   }
  // });

  minify({
    compressor: csso,
    input: ['diccionario/css/common.css', 'css/app.css'],
    output: './dist/diccionario/css/app.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: common & app minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['diccionario/css/login.css'],
    output: './dist/diccionario/css/login.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: login minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['diccionario/css/pasajes.css'],
    output: './dist/diccionario/css/pasajes.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: pasajes minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['diccionario/css/alfabeto.css'],
    output: './dist/diccionario/css/alfabeto.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: alfabeto minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['diccionario/css/acercade.css'],
    output: './dist/diccionario/css/acercade.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: acercade minificado');
    }
  });

  console.log("Minificando archivos HTML...")

  minify({
    compressor: htmlMinifier,
    input: ['index.html'],
    output: './dist/index.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: index minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/index.html'],
    output: './dist/diccionario/index.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: index minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/login.html'],
    output: './dist/diccionario/login.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: login minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/main.html'],
    output: './dist/diccionario/main.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: main minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/recoverPassword.html'],
    output: './dist/diccionario/recoverPassword.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: recoverPassword minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/vistas/pasajes.html'],
    output: './dist/diccionario/vistas/pasajes.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: pasajes minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/vistas/manual.html'],
    output: './dist/diccionario/vistas/manual.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: manual minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/vistas/alfabeto.html'],
    output: './dist/diccionario/vistas/alfabeto.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: alfabeto minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['diccionario/vistas/acerca_de.html'],
    output: './dist/diccionario/vistas/acerca_de.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: acercade minificado');
    }
  });

  console.log("--------------------------")
  console.log("Administrador")
  console.log("--------------------------")
  console.log("Minificando archivos JS...")

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/initialCheck.js', './administrador/js/main.js'],
    output: './dist/administrador/js/main.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: main minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/acerca_de.js'],
    output: './dist/administrador/js/acerca_de.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: acerca de minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/expresiones.js'],
    output: './dist/administrador/js/expresiones.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: expresiones minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/login.js'],
    output: './dist/administrador/js/login.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: login minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/manual.js'],
    output: './dist/administrador/js/manual.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: manual minificado');
    }
  });

  minify({
    compressor: uglifyes,
    input: ['./administrador/js/pasajes.js'],
    output: './dist/administrador/js/pasajes.js',
    type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('JS: pasajes minificado');
    }
  });

  console.log("Minificando archivos CSS...")

  minify({
    compressor: csso,
    input: ['./administrador/css/common.css'],
    output: './dist/administrador/css/common.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: common minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['./administrador/css/login.css'],
    output: './dist/administrador/css/login.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: login minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['./administrador/css/main.css'],
    output: './dist/administrador/css/main.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: main minificado');
    }
  });

  minify({
    compressor: csso,
    input: ['./administrador/css/pasajes.css'],
    output: './dist/administrador/css/pasajes.css',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('CSS: pasajes minificado');
    }
  });

  console.log("Minificando archivos HTML...")

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/index.html'],
    output: './dist/administrador/index.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: index minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/expresiones.html'],
    output: './dist/administrador/expresiones.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: expresiones minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/acerca_de.html'],
    output: './dist/administrador/acerca_de.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: acerca de minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/login.html'],
    output: './dist/administrador/login.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: login minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/main.html'],
    output: './dist/administrador/main.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: main minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/manual.html'],
    output: './dist/administrador/manual.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: manual minificado');
    }
  });

  minify({
    compressor: htmlMinifier,
    input: ['./administrador/pasajes.html'],
    output: './dist/administrador/pasajes.html',
    // type: 'js',
    sync: true,
    callback: function(err, value) {
      console.log('HTML: pasajes minificado');
    }
  });

  console.log("Creando los directorios para el copiado...")

  fs.mkdir('./dist/diccionario/lang', { recursive: true }, (err) => {
    if (err) throw err;
    else{
      fs.mkdir('./dist/diccionario/fuentes', { recursive: true }, (err) => {
        if (err) throw err;
        else{
          fs.mkdir('./dist/css', { recursive: true }, (err) => {
            if (err) throw err;
            else{
              fs.mkdir('./dist/diccionario/images', { recursive: true }, (err) => {
                if (err) throw err;
                else{
                  fs.mkdir('./dist/administrador/images', { recursive: true }, (err) => {
                    if (err) throw err;
                    else{
                      fs.mkdir('./dist/diccionario/sounds', { recursive: true }, (err) => {
                        if (err) throw err;
                        else{
                          console.log("Transportando JSON de lenguaje...")
                          fs.copyFile('./diccionario/lang/al.json', './dist/diccionario/lang/al.json', (err) => {
                            if(err) throw err;
                            console.log('al.json transportado.')
                          })

                          fs.copyFile('./diccionario/lang/en.json', './dist/diccionario/lang/en.json', (err) => {
                            if(err) throw err;
                            console.log('en.json transportado.')
                          })

                          fs.copyFile('./diccionario/lang/fr.json', './dist/diccionario/lang/fr.json', (err) => {
                            if(err) throw err;
                            console.log('fr.json transportado.')
                          })

                          // fs.copyFile('./diccionario/lang/al.json', './dist/diccionario/vistas/lang/al.json', (err) => {
                          //   if(err) throw err;
                          //   console.log('al.json transportado.')
                          // })

                          // fs.copyFile('./diccionario/lang/en.json', './dist/diccionario/vistas/lang/en.json', (err) => {
                          //   if(err) throw err;
                          //   console.log('en.json transportado.')
                          // })

                          // fs.copyFile('./diccionario/lang/fr.json', './dist/diccionario/vistas/lang/fr.json', (err) => {
                          //   if(err) throw err;
                          //   console.log('fr.json transportado.')
                          // })

                          console.log("Transportando fuentes...")

                          fs.copyFile('./fuentes/BERLINER.ttf', './dist/diccionario/fuentes/BERLINER.ttf', (err) => {
                            if(err) throw err;
                            console.log('BERLINER.ttf transportado.')
                          })

                          fs.copyFile('./fuentes/CASTELAR.ttf', './dist/diccionario/fuentes/CASTELAR.ttf', (err) => {
                            if(err) throw err;
                            console.log('CASTELAR.ttf transportado.')
                          })

                          console.log("Transportando imágenes...")

                          fs.copyFile('./diccionario/images/england.png', './dist/diccionario/images/england.png', (err) => {
                            if(err) throw err;
                            console.log('england.png transportado.')
                          })

                          fs.copyFile('./administrador/images/Alemania.gif', './dist/administrador/images/Alemania.gif', (err) => {
                            if(err) throw err;
                            console.log('Alemania.gif transportado.')
                          })

                          fs.copyFile('./administrador/images/ip3-2mss.gif', './dist/administrador/images/ip3-2mss.gif', (err) => {
                            if(err) throw err;
                            console.log('england.png transportado.')
                          })

                          fs.copyFile('./administrador/images/Spain.gif', './dist/administrador/images/Spain.gif', (err) => {
                            if(err) throw err;
                            console.log('england.png transportado.')
                          })

                          fs.copyFile('./administrador/images/UCSD_Shuttle_H_icon.svg', './dist/administrador/images/UCSD_Shuttle_H_icon.svg', (err) => {
                            if(err) throw err;
                            console.log('england.png transportado.')
                          })

                          fs.copyFile('./diccionario/images/Facebook-1s-200px.gif', './dist/diccionario/images/Facebook-1s-200px.gif', (err) => {
                            if(err) throw err;
                            console.log('Facebook-1s-200px.gif transportado.')
                          })

                          fs.copyFile('./diccionario/images/Facebook-1s-200px.svg', './dist/diccionario/images/Facebook-1s-200px.svg', (err) => {
                            if(err) throw err;
                            console.log('Facebook-1s-200px.svg transportado.')
                          })

                          fs.copyFile('./administrador/images/Facebook-1s-200px.gif', './dist/administrador/images/Facebook-1s-200px.gif', (err) => {
                            if(err) throw err;
                            console.log('Facebook-1s-200px.gif transportado.')
                          })

                          fs.copyFile('./administrador/images/Facebook-1s-200px.svg', './dist/administrador/images/Facebook-1s-200px.svg', (err) => {
                            if(err) throw err;
                            console.log('Facebook-1s-200px.svg transportado.')
                          })

                          fs.copyFile('./diccionario/images/fondo.jpeg', './dist/diccionario/images/fondo.jpeg', (err) => {
                            if(err) throw err;
                            console.log('fondo.jpeg transportado.')
                          })

                          fs.copyFile('./diccionario/images/french.png', './dist/diccionario/images/french.png', (err) => {
                            if(err) throw err;
                            console.log('french.png transportado.')
                          })

                          fs.copyFile('./diccionario/images/germany.png', './dist/diccionario/images/germany.png', (err) => {
                            if(err) throw err;
                            console.log('germany.png transportado.')
                          })

                          fs.copyFile('./diccionario/images/portuguese.png', './dist/diccionario/images/portuguese.png', (err) => {
                            if(err) throw err;
                            console.log('portuguese.png transportado.')
                          })

                          fs.copyFile('./diccionario/images/spain.png', './dist/diccionario/images/spain.png', (err) => {
                            if(err) throw err;
                            console.log('spain.png transportado.')
                          })

                          fs.copyFile('./diccionario/images/UCSD_Shuttle_H_icon.svg', './dist/diccionario/images/UCSD_Shuttle_H_icon.svg', (err) => {
                            if(err) throw err;
                            console.log('UCSD_Shuttle_H_icon.svg transportado.')
                          })

                          fs.copyFile('./node_modules/bootstrap/dist/css/bootstrap.min.css', './dist/css/bootstrap.min.css', (err) => {
                            if(err) throw err;
                            console.log('bootstrap.min.css transportado.')
                          })

                          console.log("Transportando fontawesome...")

                          ncp('./fontawesome', './dist/css/fontawesome', function (err) {
                            if (err) {
                              console.log("could not copy fa")
                              return console.error(err);
                            }
                            console.log('done copying fontawesome');
                          });

                          console.log("Transportando sonidos...")
                          
                          fs.copyFile('./diccionario/sounds/click.mp3', './dist/diccionario/sounds/click.mp3', (err) => {
                            if(err) throw err;
                            console.log('click transportado.')
                          })

                          createSymlink('./dist/diccionario/lang', './dist/diccionario/vistas/lang').then(() => {
                            realpathSync('./dist/diccionario/vistas/lang'); //=> '/where/file/exists'
                          });

                          return true;
                        }
                      });
                    }
                  })
                }
              })
            }
          });
        }
      });
    }
  });
});