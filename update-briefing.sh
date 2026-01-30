#!/bin/bash

# Quick script to update morning briefing with redirect URLs
# Usage: ./update-briefing.sh https://your-ngrok-or-railway-url.com

if [ -z "$1" ]; then
  echo "Usage: $0 <base-url>"
  echo "Example: $0 https://abc123.ngrok-free.app"
  exit 1
fi

BASE_URL="$1"

echo "🔗 Deep Link URLs for Morning Briefing:"
echo ""
echo "Weather:   ${BASE_URL}/weather"
echo "Oura:      ${BASE_URL}/oura"
echo "Sunsama:   ${BASE_URL}/sunsama"
echo "Reminders: ${BASE_URL}/reminders"
echo "Shortwave: ${BASE_URL}/shortwave"
echo ""
echo "Copy these URLs into your morning briefing buttons!"
