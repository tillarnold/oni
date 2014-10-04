mkdir -p /tmp/oniTestBuild


echo '<!doctype html ><html><head><title>Oni Test</title><style>*{-webkit-user-select: none; -moz-user-select: none;-ms-user-select: none;}</style></head><body><script src=bundle.js></script></body></html>' > /tmp/oniTestBuild/index.html
echo 'Created index.html'
browserify test/test.js > /tmp/oniTestBuild/bundle.js
echo 'Built browserify bundle'
serve /tmp/oniTestBuild/
