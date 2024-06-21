import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { ChangeEvent } from 'react';

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

type SearchBarProps = {
  handleSearch: (term: string) => void;
}

export const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };
  
  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" onChange={handleInputChange} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
