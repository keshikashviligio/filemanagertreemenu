import React, {useCallback, useEffect, useState} from "react";
import firebase from "firebase";
import TreeMenu from "../../components/treeMenu/TreeMenu";
import {TreeType} from "../../types/types";
import {appConfig} from "../../utils/config";
import {NODE_TYPE_FOLDER} from "../../utils/constants";

const TreeMenuContainer = React.memo(() => {
  const [tree, setTree] = useState<TreeType>();

  const setRoot = useCallback(() => {
    firebase.database().ref(`tree/${appConfig.rootNodeId}`).set({
      id: appConfig.rootNodeId,
      title: 'Root',
      type: NODE_TYPE_FOLDER,
      isRoot: true,
      children: [],
    } as TreeType);
  }, []);

  useEffect(() => {
    const db = firebase.database().ref(`tree/${appConfig.rootNodeId}`);
    db.on('value', (snapshot) => {
      const data = snapshot.val();
      setTree(data);
      if(!data){
        setRoot();
      }
    });
  }, [setRoot]);

  return (<TreeMenu tree={tree} />);
});

export default TreeMenuContainer;
