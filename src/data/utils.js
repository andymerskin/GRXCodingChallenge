import shortid from "shortid";
import stringScore from "string-score";

// Add ids to our items
function generateIds(root) {
  const id = shortid.generate();
  root.id = id;
  if (root.children && root.children.length) {
    root.children.map(child => generateIds(child));
  }
  return root;
}

// Adds `expanded` and `selected` states to our items
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

// Filters tree of items by { prop: value }
// returns a flat Array of children to be displayed
// in our Tree component
function filterTreeBy(obj, prop, value) {
  const result = {
    children: []
  };
  function filterChildren(obj) {
    if (obj.children && obj.children.length) {
      // score items
      const scored = filterStringScore(obj.children, prop, value);

      // filter score above threshold
      const filtered = scored.filter(child => child.score > 0.5);

      // sort by score
      filtered.sort((a, b) => {
        if (a.score > b.score) {
          return 1;
        } else if (a.score < b.score) {
          return -1;
        }
        return 0;
      });

      // strip score
      const items = filtered.map(child => child.item);
      result.children = result.children.concat(items);
      obj.children.forEach(child => {
        filterChildren(child);
      });
    }
  }
  filterChildren(obj);
  return result;
}

// Filters item property (prop) by string (value)
// using fuzzy string search library: string-score
function filterStringScore(arr, prop, value) {
  return arr.map(child => {
    if (child[prop] && typeof child[prop] === "string") {
      const score = stringScore(child[prop], value, 0.5);
      return {
        item: child,
        score
      };
    }
    return false;
  });
}

function findById(obj, id) {
  if (obj.id === id) {
    return obj;
  }
  let result, p;
  for (p in obj) {
    if (obj.hasOwnProperty(p) && typeof obj[p] === "object") {
      result = findById(obj[p], id);
      if (result) {
        return result;
      }
    }
  }
}

// recursively sets the property of all items
function setAllChildren(obj, prop, value) {
  const copy = { ...obj };
  obj[prop] = value;
  if (copy.children && obj.children.length) {
    copy.children.forEach(child => {
      setAllChildren(child, prop, value);
    });
  }
  return copy;
}

export { generateIds, createTreeState, filterTreeBy, findById, setAllChildren };
