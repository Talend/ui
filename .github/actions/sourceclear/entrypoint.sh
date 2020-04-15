#!/bin/sh -l
echo "Download srcclr ci script ..."
curl -sSL https://download.sourceclear.com/ci.sh --output srcclr.sh
echo "Script saved to srcclr.sh"
chmod a+x srcclr.sh
echo "Script execution rights added"
echo "Starting scan on . (root) ..."
./srcclr.sh scan .
echo "Scan completed on . (root)"
echo "Starting scan on ./packages/components ..."
./srcclr.sh scan ./packages/components
echo "Scan completed on ./packages/components"