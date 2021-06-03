import React, {useCallback, useEffect, useMemo, useState} from "react";
import {TreeType} from "../../types/types";
import firebase from "firebase";
import {flattenTree, generateUId, getNodeFromTree, insertNodeIntoTree, updateNodeInTree} from "../../utils/utils";
import {NODE_TYPE_FOLDER} from "../../utils/constants";
import styled from "styled-components";
import Modal from "../modal/Modal";
import TreeMenuForm from "../treeMenuForm/TreeMenuForm";
import {appConfig} from "../../utils/config";
import TreeView from "../treeView/TreeView";

const Container = styled.div`
  text-align: left;
`;

const TreeMenu = React.memo(({tree}: {tree: TreeType | undefined}) => {
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeType>();

  const toggleAdd = useCallback(() => {
    setIsOpenAddDialog(prevState => !prevState);
  }, []);

  const handleEdit = useCallback((node: TreeType) => {
    setSelectedNode(node);
    toggleAdd()
  }, [toggleAdd]);

  const handleNodeSave = useCallback((node: TreeType) => {
    if(!node.id){
      insertNodeIntoTree(tree!, node.parentId || appConfig.rootNodeId, node)
    }else {
      updateNodeInTree(tree!, node.id, node);
    }
    console.log(tree?.children);
    firebase.database().ref(`tree/${appConfig.rootNodeId}/children`).set(tree?.children).then(r => {
      setSelectedNode(undefined);
      toggleAdd();
    });
  }, [toggleAdd, tree]);

  const folders = useMemo(() => {
    if(!tree){
      return [];
    }
    return flattenTree(tree!).filter(node => node.type === NODE_TYPE_FOLDER);
  }, [tree])

  return (<Container>
    {tree && <TreeView tree={tree!} onEdit={handleEdit} />}
    <button type="button" onClick={toggleAdd}>Add File/Folder</button>
    <Modal isOpen={isOpenAddDialog} onClose={toggleAdd} title="Add File/Folder">
      <TreeMenuForm node={selectedNode} folders={folders} onSubmit={handleNodeSave} onCancel={toggleAdd} />
    </Modal>
  </Container>)
});

export default TreeMenu;
