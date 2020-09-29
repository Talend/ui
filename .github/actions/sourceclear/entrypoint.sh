#!/bin/sh -l
echo "Download srcclr ci script ..."
curl -sSL https://download.sourceclear.com/ci.sh --output srcclr.sh
echo "Script saved to srcclr.sh"
chmod a+x srcclr.sh
echo "Script execution rights added"

packages="cmf,cmf-cqrs,cmf-webpack-plugin,components,containers,datagrid,forms,icons,sagas,stepper,theme,faceted-search,router,html-webpack-plugin"

# set comma as internal field separator for the string list
Field_Separator=$IFS 
IFS=,

# scan each folder
echo "Starting scan on . (root) ..."
./srcclr.sh scan .
echo "Scan completed on . (root)"

for folder in $packages;
do
    echo "Starting scan on ./packages/$folder ..."
    ./srcclr.sh scan ./packages/$folder
    echo "Scan completed on ./packages/$folder"
done

# set back default field separator
IFS=$Field_Separator

