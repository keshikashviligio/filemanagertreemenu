import React, {useCallback, useEffect, useState} from "react";
import {TreeNodeType, TreeType} from "../../types/types";
import styled from "styled-components";
import {emptyNode, fileTypes, NODE_TYPE_FILE, NODE_TYPE_FOLDER} from "../../utils/constants";

const NodeTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  margin-bottom: 20px;
`;

const NameExtContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  > label {
    width: 100%;
    margin-right: 15px;
  }
`;

const ParentFolderContainer = styled.div`
  width: 100%;
  & > select{
    width: 100%;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  &[type=radio]{
    width: auto;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  > button {
    margin-left: 15px;
  }
`;

interface TreeMenuFormProps {
  node?: TreeType;
  folders: any[];
  onSubmit: (node: TreeType) => void;
  onCancel: () => void;
}

const TreeMenuForm = React.memo(({node, onSubmit, onCancel, folders}: TreeMenuFormProps) => {
  const [formData, setFormData] = useState<TreeType>(node || emptyNode);

  useEffect(() => {
    setFormData(prevState => ({...prevState, ...node}));
  }, [node])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    console.log(name, value);
    setFormData(prevState => ({...prevState, [name]: value}));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({...formData, type: Number(formData.type) as TreeNodeType});
    setFormData(emptyNode);
  }, [formData, onSubmit]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <NodeTypeContainer>
          <label htmlFor="node-type-file">
            <StyledInput defaultChecked={formData?.type === NODE_TYPE_FOLDER} onChange={handleInputChange} id="node-type-file"
                   type="radio" name="type" value={NODE_TYPE_FOLDER}/>
            Folder
          </label>
          <label htmlFor="node-type-folder">
            <StyledInput defaultChecked={formData?.type === NODE_TYPE_FILE} onChange={handleInputChange} id="node-type-folder" type="radio" name="type" value={NODE_TYPE_FILE}/>
            File
          </label>
        </NodeTypeContainer>
        <ParentFolderContainer>
          <StyledSelect defaultValue="" value={formData.parentId} name="parentId" onChange={handleInputChange}>
            <option disabled value="">Parent Folder</option>
            {folders && folders.map(f => (<option key={f.id} value={f.id}>{f.title}</option>))}
          </StyledSelect>
        </ParentFolderContainer>
        <NameExtContainer>
          <label htmlFor="node-title">
            <StyledInput required onChange={handleInputChange} id="node-title" type="text" name="title" value={formData.title} placeholder="Name"/>
          </label>
          {Number(formData.type) === NODE_TYPE_FILE && (
            <StyledSelect required value={formData.extension} name="extension" onChange={handleInputChange}>
              <option disabled value="">File Type</option>
              {fileTypes.map(ft => (<option defaultChecked={formData.extension === ft} key={ft} value={ft}>{ft}</option>))}
            </StyledSelect>
          )}
        </NameExtContainer>
        <ActionsContainer>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Close</button>
        </ActionsContainer>
      </form>
    </div>
  );
});

export default TreeMenuForm;
