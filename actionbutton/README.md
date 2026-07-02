# Action Button Widget

Build one or more buttons that send customizable Grist user actions (e.g. `UpdateRecord`, `AddRecord`, `RemoveRecord`) to the Grist data engine. Supports multiple columns for grouped action buttons, with a built-in configuration panel for styling, icons, and layout.

## Usage

1. In Grist, add a **Custom Widget** to a page and select **Action button**.
2. Map one or more columns to the **Action Buttons** field in the Creator Panel. Each mapped column becomes a button group.
3. In each cell of the mapped column(s), store a **JSON array of button objects** (or a single object).

### Button Object Format

| Key | Type | Required | Description |
|---|---|---|---|
| `button` | string | yes | Button label text |
| `description` | string | yes | Tooltip shown on hover |
| `actions` | array | yes | Array of [Grist user actions](https://support.getgrist.com/api/) to execute |
| `variant` | string | no | Per-button color override: `primary`, `success`, `warning`, `danger`, `neutral` |
| `size` | string | no | Per-button size override: `small`, `medium`, `large` |
| `icon` | string | no | Icon name from built-in set (see below), or `""` for no icon |
| `confirm` | boolean | no | If `true`, shows a confirmation dialog before executing |
| `confirmText` | string | no | Custom confirmation prompt text (default: `"Are you sure?"`) |

### Example Cell Value

```json
[
  {
    "button": "Approve",
    "description": "Approve this request",
    "actions": [
      ["UpdateRecord", "Requests", 1, {"Status": "Approved"}]
    ],
    "variant": "success",
    "icon": "check",
    "confirm": true,
    "confirmText": "Approve this request?"
  },
  {
    "button": "Reject",
    "description": "Reject this request",
    "actions": [
      ["UpdateRecord", "Requests", 1, {"Status": "Rejected"}]
    ],
    "variant": "danger",
    "icon": "x"
  }
]
```

### Available Icons

`check`, `x`, `plus`, `minus`, `edit`, `trash`, `send`, `copy`, `download`, `upload`, `search`, `refresh`, `arrow-right`, `arrow-left`, `star`, `heart`, `alert`, `info`, `save`

## Configuration Panel

Click the **gear icon** (widget options) in Grist to open the config panel:

| Option | Values | Default | Description |
|---|---|---|---|
| Button Variant | `primary`, `success`, `warning`, `danger`, `neutral` | `primary` | Default color scheme |
| Button Size | `small`, `medium`, `large` | `medium` | Default size |
| Default Icon | (none) or any icon name | (none) | Default icon for all buttons |
| Layout | `horizontal`, `vertical`, `grid` | `horizontal` | Button arrangement |
| Grid Columns | `auto`, `2`, `3`, `4` | `auto` | Columns when layout is `grid` |

Per-button `variant`, `size`, and `icon` override the defaults from the config panel.

## Status Messages

- **Waiting for data...** — Widget initializing.
- **Please map at least one column to "Action Buttons" in the Creator Panel.** — No columns mapped.
- **No actions configured for this record.** — The current record has no valid button definitions.
- **Working...** — Actions are being executed.
- **Done** — Actions completed successfully.
- **Please grant full access for writing.** — The widget lacks write permission.
- *Error message starting with `Column "..."`* — Invalid cell format, listing missing keys.
