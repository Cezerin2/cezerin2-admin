import React, { useState, useEffect } from "react";
import { findDOMNode } from "react-dom";
import isEqual from "lodash/isEqual";
import clone from "lodash/clone";
import uuid from "../helpers/uuid";
import ucFirst from "../helpers/ucFirst";

const EVENTS = [
  "focusin",
  "focusout",
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseover",
  "beforepaste",
  "paste",
  "cut",
  "copy",
  "selectionchange",
  "mouseout",
  "mouseenter",
  "mouseleave",
  "keydown",
  "keypress",
  "keyup",
  "contextmenu",
  "dragend",
  "dragover",
  "draggesture",
  "dragdrop",
  "drop",
  "drag",
  "BeforeRenderUI",
  "SetAttrib",
  "PreInit",
  "PostRender",
  "init",
  "deactivate",
  "activate",
  "NodeChange",
  "BeforeExecCommand",
  "ExecCommand",
  "show",
  "hide",
  "ProgressState",
  "LoadContent",
  "SaveContent",
  "BeforeSetContent",
  "SetContent",
  "BeforeGetContent",
  "GetContent",
  "VisualAid",
  "remove",
  "submit",
  "reset",
  "BeforeAddUndo",
  "AddUndo",
  "change",
  "undo",
  "redo",
  "ClearUndos",
  "ObjectSelected",
  "ObjectResizeStart",
  "ObjectResized",
  "PreProcess",
  "PostProcess",
  "focus",
  "blur",
  "dirty"
];

const HANDLER_NAMES = EVENTS.map(event => `on${ucFirst(event)}`);

const TinyMCE = props => {
  const config = useState({});
  const content = useState(props.content);

  function componentWillMount() {
    this.id = this.id || this.props.id || uuid();
  }

  useEffect(() => {
    const config = clone(this.props.config);
    this._init(config, this.props.content);
  });

  function componentWillReceiveProps(nextProps) {
    if (
      !isEqual(this.props.config, nextProps.config) ||
      !isEqual(this.props.id, nextProps.id)
    ) {
      this.id = nextProps.id;
      this._init(clone(nextProps.config), nextProps.content);
    }
  }

  function shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.config, nextProps.config) ||
      !isEqual(this.props.entityId, nextProps.entityId)
    );
  }

  function componentWillUnmount() {
    this._remove();
  }

  return this.props.config.inline ? (
    <div
      id={this.id}
      className={this.props.className}
      dangerouslySetInnerHTML={{ __html: this.props.content }}
    />
  ) : (
    <textarea
      id={this.id}
      className={this.props.className}
      name={this.props.name}
      defaultValue={this.props.content}
    />
  );
};

function _init(config, content) {
  if (this._isInit) {
    this._remove();
  }

  // hide the textarea that is me so that no one sees it
  findDOMNode(this).style.hidden = "hidden";

  const setupCallback = config.setup;
  const hasSetupCallback = typeof setupCallback === "function";

  config.selector = `#${this.id}`;
  config.setup = editor => {
    EVENTS.forEach((eventType, index) => {
      editor.on(eventType, e => {
        const handler = this.props[HANDLER_NAMES[index]];
        if (typeof handler === "function") {
          // native DOM events don't have access to the editor so we pass it here
          handler(e, editor);
        }
      });
    });
    // need to set content here because the textarea will still have the
    // old `this.props.content`
    if (typeof content !== "undefined") {
      editor.on("init", () => {
        editor.setContent(content);
      });
    }
    if (hasSetupCallback) {
      setupCallback(editor);
    }
  };

  // function tinymce.init(config);

  findDOMNode(this).style.hidden = "";

  this._isInit = true;
}

function _remove() {
  // function  tinymce.EditorManager.execCommand("mceRemoveEditor", true, this.id);
  this._isInit = false;
}

export default TinyMCE;
