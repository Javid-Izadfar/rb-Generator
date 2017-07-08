const fs = require('fs')
const callArgs = process.argv.slice(2)

let rb_verison = callArgs[0] ? callArgs[0] : '1.8'
let rb_logo = ' ██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗    ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗\n ██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝    ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗\n ██████╔╝███████║██╔██╗ ██║██║  ███╗█████╗      ██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║\n ██╔══██╗██╔══██║██║╚██╗██║██║   ██║██╔══╝      ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║\n ██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗    ██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝\n ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝\n\n'


function rb_description(type){

  let rb_description = ''

  if (type != 'min.css' ) rb_description += rb_logo

  rb_description +=
    ' * Range Brand - Official Color Codes for Famous Brands in Iran\n\n' +
    ' * RangeBrand.' + type + ' - http://rangebrand.ir\n * Version - ' + rb_verison + '\n' +
    ' * Licensed under the MIT license - http://opensource.org/licenses/MIT\n\n' +
    ' * Created by @JavidIzadfar, @setarekarimi1 and @Mehrnooshdsht\n' +
    ' * Copyright (c) 2016-2017 IKA Computing Club - http://ikacc.ir\n\n'

  return rb_description
}

fs.readFile('./RangeBrand/json/rangebrand.json', 'utf8', function(err, data) {

  if (err) throw err

  let RangeBrand = JSON.parse(data)

  let pcss = '/*\n\n' + rb_description('pcss') + '*/\n\n'
  let less = '/*\n\n' + rb_description('less') + '*/\n\n'
  let css = '/*\n\n' + rb_description('css') + '*/\n\n'
  let css_min = '/*\n\n' + rb_description('min.css') + '*/\n\n'

  for (let brand of Object.keys(RangeBrand)) {

    if ( RangeBrand[brand].colors.length == 1) {
      pcss += '$rb-' + brand + ': ' + RangeBrand[brand].colors + ';\n'
      less += '@rb-' + brand + ': ' + RangeBrand[brand].colors + ';\n'
      css += '.rb-' + brand + '{background-color: ' + RangeBrand[brand].colors + '}\n'
      css += '.rb-' + brand + '-text{color: ' + RangeBrand[brand].colors + '}\n'
    } else {
      for (var i = 0; i < RangeBrand[brand].colors.length; i++) {
        pcss += '$rb-' + brand + '-' + (i + 1) + ': ' + RangeBrand[brand].colors[i] + ';\n'
        less += '@rb-' + brand + '-' + (i + 1) + ': ' + RangeBrand[brand].colors[i] + ';\n'
        css += '.rb-' + brand + '-' + (i + 1) + '{background-color: ' + RangeBrand[brand].colors[i] + '}\n'
      }
      for (var j = 0; j < RangeBrand[brand].colors.length; j++) {
        css += '.rb-' + brand + '-' + (j + 1) + '-text{color: ' + RangeBrand[brand].colors[j] + '}\n'
      }
    }

    pcss += '\n'
    less += '\n'
    css += '\n'

  }

  css_min += css.replace( /\/\*([\s\S]*?)\*\//g , '' ).replace( /\s/g, '')

  console.log('\n');
  console.log(rb_description('js'));

  fs.writeFile('RangeBrand/less/rangebrand.less', less, function(err) {
      if(err) throw err
      console.log("LESS file was saved!");
  });
  fs.writeFile('RangeBrand/postcss/rangebrand.pcss', pcss, function(err) {
      if(err) throw err
      console.log("PCSS file was saved!");
  });
  fs.writeFile('RangeBrand/css/rangebrand.css', css, function(err) {
      if(err) throw err
      console.log("CSS file was saved!");
  });
  fs.writeFile('RangeBrand/css/rangebrand.min.css', css_min, function(err) {
      if(err) throw err
      console.log("Minified CSS file was saved!");
  });

})
