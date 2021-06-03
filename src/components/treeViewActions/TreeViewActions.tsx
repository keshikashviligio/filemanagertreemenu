import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import {TreeType} from "../../types/types";

const TreeViewActions = React.memo(({ onEdit, node }: { onEdit: (node: TreeType) => void, node: TreeType}) => {
  return (<div>
    <ContextMenu id={`ctx-${node.id}`}>
      <MenuItem data={{foo: 'bar'}} onClick={() => onEdit(node)}>
        Edit
      </MenuItem>
    </ContextMenu>
  </div>);
});

export default TreeViewActions;
