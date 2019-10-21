import React from "react";
import "./Modal.scss";

function Modal({ title, children, actions }) {
  return (
    <div className="Modal">
      <header className="Modal-header h-12 pl-3">
        <h1 className="Modal-header-title">{title}</h1>
        <button className="Modal-close ml-auto p-3" title={"Close " + title}>
          <i className="icon i-times"></i>
        </button>
      </header>
      <main className="Modal-content">{children}</main>
      <footer className="Modal-footer px-3 py-2">{actions}</footer>
    </div>
  );
}

export default Modal;
