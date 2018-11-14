#!/bin/bash

echo "Building Spur"
gulp

echo "Pushing to live"
aws s3 sync dist/ s3://spur-admin/spur/demo --delete
