function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var ICONS = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  'arrow-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86l-7.99 13.87A1 1 0 0 0 3.05 19h17.9a1 1 0 0 0 .75-1.27l-7.99-13.87a1 1 0 0 0-1.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'
};

var ICON_NAMES = Object.keys(ICONS);

var DEFAULTS = {
  variant: 'primary',
  size: 'medium',
  icon: '',
  layout: 'horizontal',
  gridColumns: 'auto'
};

var VALID_LAYOUTS = ['horizontal', 'vertical', 'grid'];
var VALID_GRID_COLUMNS = ['auto', '2', '3', '4'];

function validGridColumns(value) {
  return VALID_GRID_COLUMNS.indexOf(value) >= 0 ? value : DEFAULTS.gridColumns;
}

function mergeDefaults(opts) {
  opts = opts || {};
  var layout = opts.layout;
  if (VALID_LAYOUTS.indexOf(layout) < 0) {
    layout = DEFAULTS.layout;
  }
  return {
    variant: opts.variant || DEFAULTS.variant,
    size: opts.size || DEFAULTS.size,
    icon: typeof opts.icon === 'string' ? opts.icon : DEFAULTS.icon,
    layout: layout,
    gridColumns: validGridColumns(opts.gridColumns)
  };
}

var data = {
  status: 'waiting',
  message: null,
  buttonGroups: [],
  descGroup: null,
  descIdx: null,
  confirmDialog: null,
  config: false,
  options: mergeDefaults(null),
  draftOptions: mergeDefaults(null),
  ICON_NAMES: ICON_NAMES
};

function handleError(err) {
  console.error('ERROR', err);
  data.status = String(err).replace(/^Error: /, '');
}

function applyActions(actions, confirm, confirmText) {
  if (confirm) {
    data.confirmDialog = {
      actions: actions,
      confirmText: confirmText || 'Are you sure?'
    };
    return;
  }
  executeActions(actions);
}

async function executeActions(actions) {
  data.message = 'Working...';
  try {
    await grist.docApi.applyUserActions(actions);
    data.message = 'Done';
  } catch (e) {
    data.message = 'Please grant full access for writing. (' + e + ')';
  }
}

function doConfirm() {
  var actions = data.confirmDialog.actions;
  data.confirmDialog = null;
  executeActions(actions);
}

function cancelConfirm() {
  data.confirmDialog = null;
}

function onRecord(row, mappings) {
  try {
    data.status = '';
    data.message = null;
    data.buttonGroups = [];
    data.descGroup = null;
    data.descIdx = null;

    if (!mappings || !mappings.ActionButton) {
      data.status = 'Please map at least one column to "Action Buttons" in the Creator Panel.';
      return;
    }

    var mappedColumns = Array.isArray(mappings.ActionButton)
      ? mappings.ActionButton
      : [mappings.ActionButton];

    if (!mappedColumns.length) {
      data.status = 'Please map at least one column to "Action Buttons" in the Creator Panel.';
      return;
    }

    var keys = ['button', 'description', 'actions'];

    for (var ci = 0; ci < mappedColumns.length; ci++) {
      var colName = mappedColumns[ci];
      if (!row.hasOwnProperty(colName)) continue;

      var btns = row[colName];
      if (btns === null || btns === undefined) continue;
      if (!Array.isArray(btns)) btns = [btns];
      if (!btns.length) continue;

      for (var bi = 0; bi < btns.length; bi++) {
        var btn = btns[bi];
        if (!btn || keys.some(function(k) { return !btn[k]; })) {
          var allKeys = keys.map(function(k) { return JSON.stringify(k); }).join(', ');
          var missing = keys.filter(function(k) { return !btn?.[k]; }).map(function(k) { return JSON.stringify(k); }).join(', ');
          throw new Error('Column "' + colName + '" cells should contain an object with keys ' + allKeys + '. ' +
            'Missing keys: ' + missing);
        }
      }

      data.buttonGroups.push({
        label: colName,
        buttons: btns
      });
    }

    if (!data.buttonGroups.length) {
      data.status = 'No actions configured for this record.';
    }
  } catch (err) {
    handleError(err);
  }
}

function effectiveVariant(btn) {
  return btn.variant || data.options.variant;
}

function effectiveSize(btn) {
  return btn.size || data.options.size;
}

function effectiveIcon(btn) {
  return 'icon' in btn ? (btn.icon || '') : (data.options.icon || '');
}

function buttonClasses(btn) {
  return ['button', 'ab-variant-' + effectiveVariant(btn), 'ab-size-' + effectiveSize(btn)];
}

function containerClasses() {
  var cls = ['group-container'];
  var layout = data.options.layout;
  if (layout === 'horizontal') {
    cls.push('ab-layout-horizontal');
  } else if (layout === 'vertical') {
    cls.push('ab-layout-vertical');
  } else if (layout === 'grid') {
    cls.push('ab-layout-grid', 'ab-cols-' + validGridColumns(data.options.gridColumns));
  }
  return cls;
}

function iconSvg(name) {
  return ICONS[name] || '';
}

function openConfig() {
  data.draftOptions = {
    variant: data.options.variant,
    size: data.options.size,
    icon: data.options.icon,
    layout: data.options.layout,
    gridColumns: data.options.gridColumns
  };
  data.config = true;
}

function saveConfig() {
  data.options = {
    variant: data.draftOptions.variant,
    size: data.draftOptions.size,
    icon: data.draftOptions.icon,
    layout: data.draftOptions.layout,
    gridColumns: data.draftOptions.gridColumns
  };
  grist.widgetApi.setOptions(data.options);
  data.config = false;
}

function cancelConfig() {
  data.config = false;
}

ready(function() {
  grist.ready({
    columns: [{name: "ActionButton", title: "Action Buttons", allowMultiple: true}],
    onEditOptions: openConfig
  });
  grist.onRecord(onRecord);

  grist.onOptions(function(opts) {
    data.options = mergeDefaults(opts);
  });

  Vue.config.errorHandler = handleError;
  new Vue({
    el: '#app',
    data: data,
    watch: {
      'options.layout': function() {
        this.descGroup = null;
        this.descIdx = null;
      }
    },
    methods: {
      applyActions: applyActions,
      doConfirm: doConfirm,
      cancelConfirm: cancelConfirm,
      effectiveVariant: effectiveVariant,
      effectiveSize: effectiveSize,
      effectiveIcon: effectiveIcon,
      buttonClasses: buttonClasses,
      containerClasses: containerClasses,
      iconSvg: iconSvg,
      openConfig: openConfig,
      saveConfig: saveConfig,
      cancelConfig: cancelConfig
    }
  });
});
