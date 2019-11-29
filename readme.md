# Travel-Site
# Description
Fully responsive front-end website built to practice with SASS/JS file architecture, BEM naming conventions, icon sprites, Gulp, Webpack and the deployment process.
# Features
- HTML: responsive images with data-srcset attributes
- CSS: column layout with floats and flexbox
- JS/JQUERY: sticky header on scroll, animated hamburger menu, full screen modal, reveal elements on scroll, lazy loading images (LazySizes), smooth scrolling (Waypoints and JQUERY smooth scroll).
# Dev Notes
- icon management: gulp-sprites
- sass: mixins for mediaqueries, color variables
- sass compilation with autoprefixing and sourcemaps
- js bundling with webpack + babel loader
- build task: optimize images with imagemin, Modernizr feature detection, static asset revisioning by appending content hash to filenames, update assets path in html with replace-in-file
- browserSync 
# Credits
The design is based upon the course by Brad Schiff: Git a Web Developer Job: Mastering the Modern Workflow.
The design and site features are as teached in the course but the folder structure is different. Also, the GULP task setup is fully customized for Gulp version 4 where the original was based on version 3.
Similarly, the original course project relies heavily on gulp-postCSS where this project uses gulp-SASS as it requires less dependencies.
