var gulp=require('gulp');
var nodemon=require('gulp-nodemon');
var notify = require('gulp-notify');


gulp.task('serve', function () {
    
    nodemon({
        script: 'index.js'
        , ext: 'js html'
    }).on('restart', function(){
		
		gulp.src('index.js')
			
			.pipe(notify('Reloading page, please wait...'));
	})
})


gulp.task('default', ['serve']);