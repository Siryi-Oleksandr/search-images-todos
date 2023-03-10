import { useState } from 'react';
import { Text } from 'components';
import {
  TodoWrapper,
  DeleteButton,
  EditButton,
  SaveButton,
} from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line, RiSave3Fill } from 'react-icons/ri';
import { InputEditTodo } from '../EditForm/EditForm.styled';

export const Todo = ({ index, text, id, onDeleteTodo, onEditTodo }) => {
  const [textTodo, setTextTodo] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onSave = () => {
    setIsEdit(false);
    onEditTodo(id, textTodo);
  };

  const handleEditTodo = evt => {
    setTextTodo(evt.target.value);
  };

  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO {index}
      </Text>
      {!isEdit ? (
        <Text>{text}</Text>
      ) : (
        <InputEditTodo
          placeholder="Create new todo"
          value={textTodo}
          onChange={handleEditTodo}
          required
          autoFocus
        />
      )}

      <DeleteButton type="button" onClick={() => onDeleteTodo(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      {!isEdit ? (
        <EditButton type="button" onClick={onEdit}>
          <RiEdit2Line size={24} />
        </EditButton>
      ) : (
        <SaveButton type="button" onClick={() => onSave()}>
          <RiSave3Fill size={24} />
        </SaveButton>
      )}
    </TodoWrapper>
  );
};
