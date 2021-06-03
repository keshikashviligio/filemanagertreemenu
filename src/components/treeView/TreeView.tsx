import React, {useCallback, useState} from "react";
import {TreeType} from "../../types/types";
import styled from "styled-components";
import { ContextMenuTrigger } from "react-contextmenu";
import TreeViewActions from "../treeViewActions/TreeViewActions";

const Container = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ChildContainer = styled.ul<{expanded: boolean}>`
  display: ${(props: any) => props.expanded ? 'block': 'none'};
  list-style-type: none;
`;

const Caret = styled.span`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:before{
    content: "\\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
  }
  &.caret-down{
    -ms-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);  
  }
`;

export const RenderChild = React.memo(({ child, onEdit }: { onEdit: (node: TreeType) => void, child: TreeType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = useCallback(() => {
      setIsExpanded(prevState => !prevState);
  }, [])
  if(child.children && !!child.children.length){
    return <li>
      <ContextMenuTrigger id={`ctx-${child.id}`}>
        <Caret onClick={toggleExpand}>{child.title}</Caret>
        <ChildContainer expanded={isExpanded} >
          {child.children.map(ch => (<RenderChild onEdit={onEdit} key={ch.id} child={ch} />))}
        </ChildContainer>
      </ContextMenuTrigger>
      <TreeViewActions node={child} onEdit={onEdit} />
    </li>
  }
  return (
    <li>
      <ContextMenuTrigger id={`ctx-${child.id}`}>
        {child.title}
      </ContextMenuTrigger>
      <TreeViewActions node={child} onEdit={onEdit} />
    </li>
  );
})

interface TreeViewProps {
  tree: TreeType;
  onEdit: (node: TreeType) => void;
}

const TreeView = React.memo(({tree, onEdit}: TreeViewProps) => {
  return (
    <Container>
        {(tree.children && !!tree.children.length) && tree.children.map(child => (<RenderChild onEdit={onEdit} key={child.id} child={child} />))}
    </Container>
  );
});

export default TreeView;
