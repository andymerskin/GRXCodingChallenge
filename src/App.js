import React from "react";
import { useImmer } from "use-immer";
import ModalOverlay from "components/ModalOverlay";
import Modal from "components/Modal";
import Tree from "components/Tree";
import FileExplorerActions from "components/FileExplorerActions";
import FilterInput from "components/FilterInput";
import { FileDataContext } from "FileDataContext";
import fileTreeData from "data/data";
import { filterTreeBy, findById, setAllChildren } from "data/utils";

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
