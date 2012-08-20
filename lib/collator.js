var Collate = require('collate'),
    Path = require('path'),
    fs = require('fs');

module.exports.compile = function(source_dir, dest_dir, outputname) {
    var files = fs.readdirSync(source_dir);
    var css_files = [];
    var js_files = [];

    files.forEach(function(file) {
        if(file.match(/.css/g) == null) {
            return;
        }


        if(file.toLowerCase() == outputname + '.css') {
            return;
        }

        css_files.push(file);
    });

    files = fs.readdirSync(source_dir);

    files.forEach(function(file) {
        if(file.match(/.js/g) == null) {
            return;
        }

        if(file.toLowerCase() == outputname + '.js') {
            return;
        }

        js_files.push(file);
    });

    Collate.collate(
        outputname + '.css', 
        css_files, 
        { 
            basedir: source_dir, 
            callback: function(){
                if(fs.existsSync(Path.join(source_dir, outputname + '.css'))) {
                    fs.renameSync(Path.join(source_dir, outputname + '.css'), Path.join(dest_dir, outputname + '.css'));
                }
            }
        }
    );

    Collate.collate(
        outputname + '.js', 
        js_files, 
        { 
            basedir: source_dir, 
            callback: function(){
                if(fs.existsSync(Path.join(source_dir, outputname + '.js'))) {
                    fs.renameSync(Path.join(source_dir, outputname + '.js'), Path.join(dest_dir, outputname + '.js'));
                }
            }
        }
    );
}