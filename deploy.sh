#!/bin/bash
# move files to website dev section
rm -rf Website/dev/modevious
cp -R tmp/ Website/dev/modevious/

# clean up
rm -rf tmp

# files should be ready to be sent via FTP
echo -e "\nFiles moved to website dev section. Ready for FTP."
exit 0