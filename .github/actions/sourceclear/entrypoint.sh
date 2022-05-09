#!/bin/sh -l
echo "Download srcclr ci script ..."
curl -sSL https://download.sourceclear.com/ci.sh --output srcclr.sh
echo "Script saved to srcclr.sh"
chmod a+x srcclr.sh
echo "Script execution rights added"

packages=$(yarn --silent workspaces info  | jq '.[].location' | sed 's/\"//g')

# scan each folder
echo "Starting scan on . (root) ..."
./srcclr.sh scan .
echo "Scan completed on . (root)"

for folder in $packages;
do
    echo "Starting scan on ./$folder ..."
    ln -s yarn.lock ./$folder/yarn.lock
    ./srcclr.sh scan ./$folder
    echo "Scan completed on ./$folder"
done


