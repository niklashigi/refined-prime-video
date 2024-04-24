# Abort when any of the commands fail
set -e

# Make sure we're on "master"
if [ $(git branch --show-current) != 'master' ]; then
  echo 'You have to be on the "master" branch to release a new version!'
  exit 1
fi

# Generate a version based on the current time (e.g. 20.12.20.1230)
version=$(utc-version)

# Build the extension
VERSION=$version METRICS_ENDPOINT=$METRICS_ENDPOINT yarn build

# Upload the extension to CWS and AMO
shipit chrome extensions/chrome
shipit firefox extensions/firefox

# Tag the commit and push
tag="v${version}"
git tag "${tag}"
git push origin master "refs/tags/${tag}"

# Prepare source code archive for AMO
git archive -o source.zip master
echo "Opening AMO, so you can upload the source code..."
sleep 2
open "https://addons.mozilla.org/en-US/developers/addon/refined-prime-video/versions"

echo "All done!"
