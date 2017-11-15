#!/usr/bin/env bash
#!/bin/bash

modified_files=($(git diff --name-only HEAD $(git merge-base HEAD master)))

for i in ${modified_files[@]}; do
	if [[ $i == *.js || $i == *.scss ]]; then
		prettier --config .prettierrc ${i} --write
	fi
done
