# Widget Environment Variables

## `grist.env`

Environment variables required for Grist to discover and serve custom widgets via the Plugin Discovery mechanism.

### Required

| Variable | Value | Purpose |
|---|---|---|
| `GRIST_USER_ROOT` | `/grist/user` | Tells Grist where to scan for user plugins. It looks for `$GRIST_USER_ROOT/plugins/*/manifest.yml`. |

### How to use

In docker-compose, reference this file:

```yaml
services:
  grist:
    env_file:
      - ./widget-env-vars/grist.env
```

Or pass them directly:

```yaml
environment:
  GRIST_USER_ROOT: /grist/user
```

### Volume mount

The plugin directory is mounted to match `GRIST_USER_ROOT`:

```yaml
volumes:
  - ./custom-widget-path/plugins/widgets:/grist/user/plugins/widgets:ro
```

This puts the `manifest.yml` and `widgets.json` where Grist expects them, and makes all widget HTML files accessible at plugin-relative URLs.
