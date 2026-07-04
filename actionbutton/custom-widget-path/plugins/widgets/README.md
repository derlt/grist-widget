# Custom Widget Path — Grist Plugin Directory

This directory mirrors the layout Grist expects inside the container at `$GRIST_USER_ROOT/plugins/`.

## Directory tree

```
custom-widget-path/
  plugins/
    widget/              ← this whole directory gets mounted into the container
      manifest.yml       ← tells Grist this is a plugin with widgets
      widgets.json       ← widget definitions (name, widgetId, url)
      actionbutton/      ← one subdirectory per widget
      calendar/
      chart/
      ...
```

## How it works

1. Grist scans `$GRIST_USER_ROOT/plugins/` for directories containing `manifest.yml`
2. `manifest.yml` declares a `widgets.json` component
3. `widgets.json` lists each widget with a plugin-relative `url`
4. Grist serves the static files from the plugin directory

## Setting the path

Set `GRIST_USER_ROOT=/grist/user` in the container. The volume mount maps:

```
./custom-widget-path/plugins/widgets  →  /grist/user/plugins/widgets
```

So Grist finds the plugin at `$GRIST_USER_ROOT/plugins/widgets/` and serves widget files from `$GRIST_USER_ROOT/plugins/widgets/actionbutton/index.html` etc.
