#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "╔══════════════════════════════════════════╗"
echo "║  Grist Widgets — Deploy Prep            ║"
echo "╚══════════════════════════════════════════╝"

# 1. Run setup.sh for any widget that vendors dependencies
for f in "$REPO_DIR"/*/setup.sh; do
  if [ -x "$f" ]; then
    echo ""
    echo "==> Running $(basename "$(dirname "$f")")/setup.sh..."
    (cd "$(dirname "$f")" && bash setup.sh)
  fi
done

# 2. Copy the widget plugin config into place
echo ""
echo "==> Preparing custom-widget-path..."
mkdir -p "$SCRIPT_DIR/custom-widget-path/plugins/widgets"
# The widgets.json is already in place, but here you could generate it from
# setting-custom-widgets/widgets.config.json if you have a generator script.

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  Ready for Docker deployment             ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "To start Grist with all widgets:"
echo "  cd $SCRIPT_DIR"
echo "  docker compose up -d"
echo ""
echo "Then add a Custom Widget in Grist at:"
echo "  /plugins/widgets/actionbutton/index.html"
echo "  /plugins/widgets/calendar/index.html"
echo "  ... (any widget from widgets.json)"
