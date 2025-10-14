#!/bin/sh
# Detect if there are any changes under packages/
changed=$(git diff --name-only HEAD -- 'packages/*')

if [ -n "$changed" ]; then
  echo "🚨 Detected changes in packages:"
  echo "$changed"
  echo "📝 Creating a new changeset..."
  pnpm changeset
else
  echo "✅ No changes in packages, skipping changeset."
fi