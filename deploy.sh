#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_DIR="$ROOT_DIR/plugins/my-widgets"

echo "╔══════════════════════════════════════════╗"
echo "║  Grist Widgets — Deploy Prep            ║"
echo "╚══════════════════════════════════════════╝"

# 1. Run setup.sh for each enabled widget
if [ -f "$ROOT_DIR/widget-settings.json" ]; then
  dirs=$(python3 -c "
import json
with open('$ROOT_DIR/widget-settings.json') as f:
  cfg = json.load(f)
for w in cfg['widgets']:
  if w.get('enabled'):
    print(w['dir'])
")
  for dir in $dirs; do
    setup="$ROOT_DIR/$dir/setup.sh"
    if [ -x "$setup" ]; then
      echo ""
      echo "==> Running $dir/setup.sh..."
      (cd "$ROOT_DIR/$dir" && bash setup.sh)
    fi
  done
fi

# 2. Create symlinks from plugin dir to each enabled widget
echo ""
echo "==> Creating symlinks in $PLUGIN_DIR ..."
mkdir -p "$PLUGIN_DIR"

for dir in $dirs; do
  target="$PLUGIN_DIR/$dir"
  if [ -L "$target" ] || [ ! -e "$target" ]; then
    rm -f "$target"
    ln -s "../../$dir" "$target"
    echo "    $dir/ → ../../$dir"
  else
    echo "    WARNING: $target exists and is not a symlink, skipping"
  fi
done

# 3. Generate widgets.json from settings
echo ""
echo "==> Generating widgets.json ..."
python3 -c "
import json

with open('$ROOT_DIR/widget-settings.json') as f:
  cfg = json.load(f)

entries = []
for w in cfg['widgets']:
  if w.get('enabled'):
    entries.append({
      'name': w['name'],
      'widgetId': '@local/' + w['dir'],
      'url': '/plugins/my-widgets/' + w['dir'] + '/index.html',
      'accessLevel': w.get('accessLevel', 'full'),
      'renderAfterReady': True
    })

with open('$PLUGIN_DIR/widgets.json', 'w') as f:
  json.dump(entries, f, indent=2)
  f.write('\n')

print('    wrote ' + str(len(entries)) + ' widgets to widgets.json')
"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  Ready for Docker deployment             ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "  cd $ROOT_DIR"
echo "  docker compose up -d"
echo ""
echo "Then add a Custom Widget in Grist:"
echo "  /plugins/my-widgets/actionbutton/index.html"
