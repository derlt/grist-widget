#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Download Vue 2.5.3
echo "==> Downloading vue.min.js..."
curl -sL -o vue.min.js "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.3/vue.min.js"
echo "    saved vue.min.js ($(wc -c < vue.min.js) bytes)"

# Download Grist Plugin API
echo "==> Downloading grist-plugin-api.js..."
curl -sL -o grist-plugin-api.js "https://docs.getgrist.com/grist-plugin-api.js"
echo "    saved grist-plugin-api.js ($(wc -c < grist-plugin-api.js) bytes)"

echo ""
echo "Done. Action Buttons widget is ready for offline/airgap use."
