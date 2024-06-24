import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useEffect, useState  } from 'react';

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '~/store/searchSlice';
import { RootState } from '~/store';

export const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [inputValue, setInputValue] = useState<string>(searchTerm);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    dispatch(setSearchTerm(value));
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);
  
  return (
    <S.Container>
      <TextField  placeholder="Digite um CPF válido" value={inputValue} onChange={handleInputChange} />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
