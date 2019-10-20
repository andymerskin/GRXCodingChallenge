import React, { useContext } from "react";
import classNames from "classnames";
import { FileDataContext } from "FileDataContext";
import "./Tree.scss";

// Renders Tree of TreeItems, where TreeItems render
// Tree recursively for nested items
function Tree({ data }) {
  if (data.children && data.children.length > 0) {
    return data.children.map(item => {
      return (
        <ul className="Tree" key={item.id}>
          <TreeItem item={item}></TreeItem>
        </ul>
      );
    });
  } else {
    return <div className="text-body px-3 py-2">No items found</div>;
  }
}

function TreeItem({ item }) {
  const { setItemSelected, toggleItemExpanded } = useContext(FileDataContext);

  function toggleExpand(id, event) {
    event.stopPropagation();
    toggleItemExpanded(id);
  }

  const treeItemClassName = classNames("TreeItem", {
    selected: item.selected,
    expanded: item.expanded,
    private: item.private,
    [item.type]: true // .folder, .file
  });

  return (
    <li className={treeItemClassName}>
      {item.name && (
        <div
          className="TreeItem-content"
          onClick={() => setItemSelected(item.id)}
          onDoubleClick={e => toggleExpand(item.id, e)}
        >
          {item.type === "folder" && (
            <TreeItemExpander
              item={item}
              onClick={e => toggleExpand(item.id, e)}
            ></TreeItemExpander>
          )}
          <TreeItemIcon item={item}></TreeItemIcon>
          <span className="TreeItem-name">{item.name}</span>
        </div>
      )}
      {/* recurse <Tree> component */}
      {item.children && item.children.length > 0 && item.expanded && <Tree data={item}></Tree>}
    </li>
  );
}

function TreeItemIcon({ item }) {
  let icon;
  switch (item.type) {
    case "folder":
      icon = item.private ? "i-folder-private" : "i-folder";
      break;
    case "file":
    default:
      icon = "i-file";
      break;
  }
  const iconClassName = classNames("TreeItemIcon icon mr-2", icon);
  return <i className={iconClassName}></i>;
}

function TreeItemExpander({ item, onClick }) {
  const expanded = item.expanded ? "minus" : "plus";
  const color = item.selected ? "white" : "black";
  const expanderIconClassName = classNames([
    "TreeItemExpander",
    "icon",
    "mr-2",
    `i-${expanded}-box-${color}`
  ]);

  return <i className={expanderIconClassName} onClick={onClick}></i>;
}

export default Tree;
