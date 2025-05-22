#!/bin/bash
cd /home/kavia/workspace/code-generation/codequest-rewards-5634-5639/main_container_for_codequest_rewards
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

