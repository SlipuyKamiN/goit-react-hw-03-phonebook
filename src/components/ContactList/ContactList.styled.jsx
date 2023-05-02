import styled from '@emotion/styled';

export const ContactsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ConctactListItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 20px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 15px;
  border: 1px solid red;
  background-color: transparent;
  &:hover,
  &:focus {
    color: #fff;
    background-color: grey;
  }
`;
