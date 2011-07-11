#!/bin/bash
# used by deploy script, can be used by itself to test build

# prep
rm -rf tmp
mkdir tmp

# copy all files into tmp for processing
cp -R Development/ tmp/
cd tmp

# start by including jQuery in the library
cat js/jquery$BUILDTYPE.js >> library.js
rm -f js/jquery.js
rm -f js/jquery.min

# add the Core library
cat js/core$BUILDTYPE.js >> library.js
rm -f js/core*.js

# then add Prototype, the only exception to minified files
cat js/prototype.js >> library.js
rm -f js/prototype.js

# move jQuery UI CSS, which is exempt from concat similar to Prototype JS
mv css/jquery-ui.css jquery-ui.css

# check first parameter for build type
if [ "$1" = "-m" ]
	then
		# remove non-minified files		
		# first _hide_ minified files in another tmp directory
		mv js/*.min.js js/tmp
		mv css/*.min.css css/tmp
		
		# then delete remaining files
		rm -f js/*.js
		rm -f css/*.js
		
		# move files back
		mv js/tmp/*.js js
		mv css/tmp/*.css css
	else
		# remove minified files, we can straight delete them without
		# having to move stuff around like above
		rm -f js/*.min.js
		rm -f css/*.min.css
fi

# concat all the rest of the JavaScript files
cat js/*.js >> library.js
rm -rf js

# concat all the rest of the CSS files
cat css/*.css >> library.css
rm -f css/*.css

# copy remaining files, which should be images
mv css/* ../tmp
rm -rf css/

# at this point everything should be ready to deploy
echo "Files processed. Build completed. Ready to deploy."
cd ../
exit 0