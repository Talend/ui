# Get previous and current version from lerna.json
PREVIOUS_COMMIT=$(git log --format="%H" -n 2 |  sed -n 2p)
git checkout $PREVIOUS_COMMIT
PREVIOUS_VERSION=$(cat lerna.json | jq '.version' | tr -d '"')
git checkout -
CURRENT_VERSION=$(cat lerna.json | jq '.version' | tr -d '"')
echo "VERSIONS--------------------------------"
echo "Previous: $PREVIOUS_VERSION"
echo "Current: $CURRENT_VERSION"

# Build the demo domain
DEMO_DOMAIN="${CURRENT_VERSION//[.]/-}.talend.surge.sh"
echo "Demo: $DEMO_DOMAIN"

# Generate changelog
CHANGELOG=$(git log --date=short --pretty="%ad %s" v$PREVIOUS_VERSION..HEAD | tail -n +2)
DEMO="Demo: http://$DEMO_DOMAIN"$'\n'
TITLE=$'# Changelog\n'
FEATURES=$'## Features\n'
FIXES=$'## Fixes\n'
CHORE=$'## Chore\n'
OTHER=$'## Other\n'
while read -r line; do
    if [[ $line == *"feat"* ]]; then
        FEATURES="$FEATURES""$line"$'\n'
    elif [[ $line == *"fix"* ]]; then
        FIXES="$FIXES""$line"$'\n'
    elif [[ $line == *"chore"* ]]; then
        CHORE="$CHORE""$line"$'\n'
    else
        OTHER="$OTHER""$line"$'\n'
    fi
done < <(echo "$CHANGELOG")
FORMATTED_CHANGELOG="$DEMO"$'\n'"$TITLE"$'\n'"$FEATURES"$'\n'"$FIXES"$'\n'"$CHORE"$'\n'"$OTHER"
echo "Changelog-------------------------------"
echo "$FORMATTED_CHANGELOG"

FORMATTED_CHANGELOG="${FORMATTED_CHANGELOG//'%'/'%25'}"
FORMATTED_CHANGELOG="${FORMATTED_CHANGELOG//$'\n'/'%0A'}"
FORMATTED_CHANGELOG="${FORMATTED_CHANGELOG//$'\r'/'%0D'}"

# Set env var for create-release action
echo ::set-output name=CHANGELOG::"$FORMATTED_CHANGELOG"
echo ::set-output name=TAG::"v$CURRENT_VERSION"
echo ::set-output name=DEMO_DOMAIN::"$DEMO_DOMAIN"
