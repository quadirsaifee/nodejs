var gulp= require('gulp');
var jshint=require('gulp-jshint');
var jscs=require('gulp-jscs');
var jsfiles=['*.js', 'views/*.js'];


gulp.task('style',function(){
    
    
    
   return gulp.src(jsfiles).pipe(jshint())
    
    
        .pipe(jshint.reporter('jshint-stylish',{verbose:true})).pipe(jscs());
    
});
var options={
    
    bowerjson:require('./bower.json'),
    directory: './public/lib',
    ignorePath:'../public'
};

gulp.task('inject',function(){
    
    var wiredep=require('wiredep').stream;
    var inject=require('gulp-inject');
    
    var injectsrc=gulp.src(['./public/css/*.css','./public/js/*.js'],{read:false});
    
    var injectOptions={ignorePath:'/public'};
    console.log('test');
   return gulp.src('./views/*.html').pipe(wiredep(options)).
   pipe(inject(injectsrc,injectOptions))
      .pipe(gulp.dest('./views' ));
    
});