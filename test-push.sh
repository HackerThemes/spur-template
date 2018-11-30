
#!/bin/bash

echo "Building Spur"
gulp

echo "Pushing to live"
aws s3 sync dist/ s3://test-static-hackerthemes/spur/demo --delete
