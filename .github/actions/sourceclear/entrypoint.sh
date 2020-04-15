#!/bin/sh -l
echo "Download srcclr ci script ..."
curl -sSL https://download.sourceclear.com/ci.sh --output srcclr.sh
echo "Script saved to srcclr.sh"
chmod a+x srcclr.sh
echo "Script execution rights added"

# monorepo
echo "Starting scan on . (root) ..."
./srcclr.sh scan .
echo "Scan completed on . (root)"

echo "Starting scan on ./packages/cmf ..."
./srcclr.sh scan ./packages/cmf
echo "Scan completed on ./packages/cmf"

echo "Starting scan on ./packages/cmf-cqrs ..."
./srcclr.sh scan ./packages/cmf-cqrs
echo "Scan completed on ./packages/cmf-cqrs"

echo "Starting scan on ./packages/cmf-webpack-plugin ..."
./srcclr.sh scan ./packages/cmf-webpack-plugin
echo "Scan completed on ./packages/cmf-webpack-plugin"

echo "Starting scan on ./packages/components ..."
./srcclr.sh scan ./packages/components
echo "Scan completed on ./packages/components"

echo "Starting scan on ./packages/containers ..."
./srcclr.sh scan ./packages/containers
echo "Scan completed on ./packages/containers"

echo "Starting scan on ./packages/datagrid ..."
./srcclr.sh scan ./packages/datagrid
echo "Scan completed on ./packages/datagrid"

echo "Starting scan on ./packages/forms ..."
./srcclr.sh scan ./packages/forms
echo "Scan completed on ./packages/forms"

echo "Starting scan on ./packages/icons ..."
./srcclr.sh scan ./packages/icons
echo "Scan completed on ./packages/icons"

echo "Starting scan on ./packages/saga ..."
./srcclr.sh scan ./packages/saga
echo "Scan completed on ./packages/saga"

echo "Starting scan on ./packages/stepper ..."
./srcclr.sh scan ./packages/stepper
echo "Scan completed on ./packages/stepper"

echo "Starting scan on ./packages/theme ..."
./srcclr.sh scan ./packages/theme
echo "Scan completed on ./packages/theme"

# non monorepo
echo "Starting scan on ./packages/faceted-search ..."
./srcclr.sh scan ./packages/faceted-search
echo "Scan completed on ./packages/faceted-search"

echo "Starting scan on ./packages/router ..."
./srcclr.sh scan ./packages/router
echo "Scan completed on ./packages/router"

echo "Starting scan on ./packages/html-webpack-plugin ..."
./srcclr.sh scan ./packages/html-webpack-plugin
echo "Scan completed on ./packages/html-webpack-plugin"