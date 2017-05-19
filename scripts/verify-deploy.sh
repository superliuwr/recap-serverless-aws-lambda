#!/usr/bin/env bash

funcOutput=$(SLS_DEBUG=true npm run serverless -- invoke --verbose \
                                           --path testEvent.json \
                                           --function fetchUserProfile \
                                           $@) || {
    echo "Invoking fetchUserProfile function to verify deployment failed"
    echo "${funcOutput}"
    exit 1
}

echo "${funcOutput}" | grep '"statusCode": 200' > /dev/null || {
    echo "Function invocation failed"
    echo "${funcOutput}"
    exit 1
}

echo "Deployment successfully verified"
