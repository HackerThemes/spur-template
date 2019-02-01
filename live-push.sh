#!/bin/bash

echo "Building Spur"
. build.sh

echo "Pushing to live"

rsync -a --delete dist/ wildmind@wildmind.ch:~/public_html/hackerthemes/hackerthemes.com/spur/demo
rsync -a package/ wildmind@wildmind.ch:~/public_html/hackerthemes/hackerthemes.com/spur/package
