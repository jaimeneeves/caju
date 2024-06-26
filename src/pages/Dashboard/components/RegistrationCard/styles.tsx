import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  border-top: 1px solid #eee;
  svg {
    cursor: pointer;
  }
`;

export const ActionsContent = styled.div`
  display: flex;
  gap: 4px;
`;

export const ActionsDelete = styled.div`
  padding: .25rem;
  border-radius: 1rem;
  border: 1px solid red;
  color: red;
  height: 1rem;
  width: 1rem;
`;
