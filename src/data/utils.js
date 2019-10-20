import shortid from "shortid";

function generateIds(root) {
  const id = shortid.generate();
  root.id = id;
  if (root.children && root.children.length) {
    root.children.map(child => generateIds(child));
  }
  return root;
}

// function generateIds(arr) {
//   return arr.map(item => {
//     return {
//       ...item,
//       id: shortid.generate()
//     };
//   });
// }

function createTreeState(root) {
  Object.keys(root).forEach(key => {
    const children = root[key].children || [];
    if (children.length) {
      root[key].expanded = false;
      root[key].selected = false;
    }
  });
  return root;
}

// function createTreeState(arr) {
//   return arr.map(item => {
//     if (item.children && item.children.length) {
//       return {
//         ...item,
//         expanded: false
//       };
//     }
//     return item;
//   });
// }

// [
//   { id: 'xyz', name: 'abc', parent: parentId, etc. },
//   { id: 'xyz', name: 'abc', parent: parentId, etc. },
//   { id: 'xyz', name: 'abc', parent: parentId, etc. }
// ]
function flattenObjectBy(root, key) {
  const result = [];
  function pushItems(obj) {
    result.push(obj);
    if (obj[key] && obj[key].length) {
      obj[key].forEach(child => pushItems(child));
    }
  }
  pushItems(root);
  return result;
}

function normalizeObjectBy(root, key) {
  const result = {};
  function addItems(obj) {
    result[obj.id] = obj;
    if (obj[key] && obj[key].length) {
      obj[key].forEach(child => {
        child.parentId = obj.id;
        addItems(child);
      });
    }
  }
  addItems(root);
  Object.keys(result).forEach(key => delete result[key].children);
  return result;
}

export { flattenObjectBy, normalizeObjectBy, generateIds, createTreeState };
