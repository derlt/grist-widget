# Widget Settings — Configuration Guide

## `widgets.config.json`

Controls which widgets appear in Grist and holds per-widget settings.

| Field | Type | Description |
|---|---|---|
| `dir` | string | Subdirectory under the plugins mount (must match the folder name in the repo) |
| `enabled` | boolean | Set `false` to remove the widget from the Grist dropdown |

### To add a new widget

1. Add an entry to `widgets.config.json` with its directory name
2. Add a corresponding entry in `custom-widget-path/plugins/widgets/widgets.json`

### How widgets.json is generated

`widgets.json` in the `custom-widget-path/plugins/widgets/` directory is the file Grist actually reads. Edit it directly if you don't want to use the config file.

### Widget IDs

Each widget needs a unique `widgetId` in `widgets.json`. These are of the form `@author/widget-name`. The existing `manifest.json` at the repo root has the full list with IDs.
