#!/bin/bash
# prep
rm -rf tmp
mkdir tmp

# copy all files into tmp for processing
cp -R Development/ tmp/
cd tmp

# check first parameter for build type
if [ "$1" = "-m" ]
	then
		# using minified files when available
		BUILDTYPE=.min
	else
		# using source files when available
		BUILDTYPE=""
fi

#echo -e "type: "$type

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

# concat all the rest of the JavaScript files
cat js/*$BUILDTYPE.js >> library.js
rm -rf js

# concat all the rest of the CSS files
cat css/*$BUILDTYPE.css >> library.css
rm -f css/*.css

# copy remaining files, which should be images
mv css/* ../tmp
rm -rf css/

# at this point everything should be ready to deploy
echo -e "\nFiles processed. Build completed. Ready to deploy."
exit 0