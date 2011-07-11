#!/bin/bash
# run build script to test
./build.sh $1

# move build files to website dev section
rm -rf Website/dev/modevious
cp -R tmp/ Website/dev/modevious/

# clean up
rm -rf tmp

# files should be ready to be sent via FTP
echo "Files moved to website dev section. Ready for FTP."
exit 0