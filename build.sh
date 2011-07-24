#!/bin/bash
# used by deploy script, can be used by itself to test build

# check first parameter for build type
if [ "$1" = "-m" ]
	then
		# remove non-minified files
		BUILDTYPE=".MIN"
		
		# first _hide_ minified files in another tmp directory
		mkdir js/tmp
		for file in js/*.min.js; do
			mv $file js/tmp/
		done

		mkdir css/tmp
		for file in css/*.min.css; do
			mv $file css/tmp/
		done
		
		# then delete remaining files
		rm -f js/*.js
		rm -f css/*.js
		
		# move files back
		for file in js/tmp/*.min.js; do
			mv $file js/
		done

		for file in css/tmp/*.min.css; do
			mv $file css/
		done

		# clean up tmp
		rm -rf js/tmp
		rm -rf css/tmp
	else
		# remove minified files, we can straight delete them without
		BUILDTYPE=""

		# having to move stuff around like above
		rm -f js/*.min.js
		rm -f css/*.min.css
fi

# prep
rm -rf tmp
mkdir tmp

# copy all files into tmp for processing
cp -R Development/ tmp/
cd tmp

# start by including jQuery in the library
cat js/jquery$BUILDTYPE.js >> library.js
rm -f js/jquery.js
rm -f js/jquery.min.js

# add the Core library
cat js/core$BUILDTYPE.js >> library.js
rm -f js/core*.js

# then add Prototype, the only exception to minified files
cat js/prototype.js >> library.js
rm -f js/prototype.js

# move jQuery UI CSS, which is exempt from concat similar to Prototype JS
mv css/jquery-ui.css jquery-ui.css

# move init script to temporary location for later processing
# note that there will only be one init file, the next line grabs either
# js/init.js or js/init.min.js
mkdir js/tmp
mv js/init*.js js/tmp/init.js

# concat all the rest of the JavaScript files
cat js/*.js >> library.js

# now add the init script to the library
cat js/tmp/init.js >> library.js
rm -rf js

# concat all the rest of the CSS files
cat css/*.css >> library.css
rm -f css/*.css

# copy remaining files, which should be images
mv css/* ../tmp/
rm -rf css/

# at this point everything should be ready to deploy
echo "Files processed. Build completed. Ready to deploy."
cd ../
exit 0