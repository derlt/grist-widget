function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

let data = {
  status: 'waiting',
  message: null,
  buttonGroups: [],
  descGroup: null,
  descIdx: null
}

function handleError(err) {
  console.error('ERROR', err);
  data.status = String(err).replace(/^Error: /, '');
}

async function applyActions(actions) {
  data.message = 'Working...';
  try {
    await grist.docApi.applyUserActions(actions);
    data.message = 'Done';
  } catch (e) {
    data.message = `Please grant full access for writing. (${e})`;
  }
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

    const mappedColumns = Array.isArray(mappings.ActionButton)
      ? mappings.ActionButton
      : [mappings.ActionButton];

    if (!mappedColumns.length) {
      data.status = 'Please map at least one column to "Action Buttons" in the Creator Panel.';
      return;
    }

    const keys = ['button', 'description', 'actions'];

    for (const colName of mappedColumns) {
      if (!row.hasOwnProperty(colName)) continue;

      let btns = row[colName];
      if (btns === null || btns === undefined) continue;
      if (!Array.isArray(btns)) btns = [btns];
      if (!btns.length) continue;

      for (const btn of btns) {
        if (!btn || keys.some(k => !btn[k])) {
          const allKeys = keys.map(k => JSON.stringify(k)).join(", ");
          const missing = keys.filter(k => !btn?.[k]).map(k => JSON.stringify(k)).join(", ");
          throw new Error(`Column "${colName}" cells should contain an object with keys ${allKeys}. ` +
            `Missing keys: ${missing}`);
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

ready(function() {
  grist.ready({columns: [{name: "ActionButton", title: "Action Buttons", allowMultiple: true}]});
  grist.onRecord(onRecord);

  Vue.config.errorHandler = handleError;
  new Vue({
    el: '#app',
    data: data,
    methods: {applyActions}
  });
});
