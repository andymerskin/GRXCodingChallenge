import React from "react";
import stringScore from "string-score";
import { useImmer } from "use-immer";
import ModalOverlay from "components/ModalOverlay";
import Modal from "components/Modal";
import Tree from "components/Tree";
import FileExplorerActions from "components/FileExplorerActions";
import FilterInput from "components/FilterInput";
import { FileDataContext } from "FileDataContext";
import fileTreeData from "data/data";

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

function filterStringScore(arr, prop, value) {
  return arr.map(child => {
    if (child[prop]) {
      const score = stringScore(child[prop], value, 0.5);
      return {
        item: child,
        score
      };
    }
    return false;
  });
}

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

function App() {
  const [fileData, updateFileData] = useImmer(fileTreeData);

  function toggleItemExpanded(id) {
    updateFileData(draft => {
      const item = findById(draft, id);
      item.expanded = !item.expanded;
    });
  }

  function setItemSelected(id) {
    updateFileData(draft => {
      setAllChildren(draft, "selected", false);
      const item = findById(draft, id);
      item.selected = true;
    });
  }

  function handleFilterChange(value) {
    updateFileData(() => {
      if (value.length) {
        return filterTreeBy(fileTreeData, "name", value);
      }
      return fileTreeData;
    });
  }

  const context = {
    toggleItemExpanded,
    setItemSelected
  };

  return (
    <div id="app">
      <ModalOverlay>
        <Modal title="GRX File Explorer" actions={<FileExplorerActions></FileExplorerActions>}>
          <FileDataContext.Provider value={context}>
            <FilterInput onChange={handleFilterChange}></FilterInput>
            <div className="my-2">
              <Tree data={fileData}></Tree>
            </div>
          </FileDataContext.Provider>
        </Modal>
      </ModalOverlay>
    </div>
  );
}

export default App;
