#!/bin/sh
# Check if has packages module changed
changed=$(git diff --cached --name-only | grep '^packages/')

if [ -n "$changed" ]; then
  echo "🚨 Detected changes in packages:"
  echo "$changed"
  echo "📦 Auto updating versions via changeset..."
  pnpm changeset version
else
  echo "✅ No changes in packages, skipping version update."
fi