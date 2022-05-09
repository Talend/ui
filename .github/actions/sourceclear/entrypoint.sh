#!/bin/sh -l
echo "Download srcclr ci script ..."
curl -sSL https://download.sourceclear.com/ci.sh --output srcclr.sh
echo "Script saved to srcclr.sh"
chmod a+x srcclr.sh
echo "Script execution rights added"

packages=$(yarn --silent workspaces info  | jq '.[].location' | sed 's/\"//g')
# set comma as internal field separator for the string list
Field_Separator=$IFS
IFS=,

pwd
ls -l

echo "Packages: $packages"

# scan each folder
echo "Starting scan on . (root) ..."
./srcclr.sh scan .
echo "Scan completed on . (root)"

for folder in $packages;
do
    echo "Starting scan on ./$folder ..."
    echo "ln -s yarn.lock ./$folder/yarn.lock"
    ln -s yarn.lock ./$folder/yarn.lock
    echo "./srcclr.sh scan ./$folder"
    ./srcclr.sh scan ./$folder
    echo "Scan completed on ./$folder"
done

# set back default field separator
IFS=$Field_Separator

