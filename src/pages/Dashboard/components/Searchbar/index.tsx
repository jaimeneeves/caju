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
import { fetchRegistrations, AppDispatch } from '~/store/registrationSlice';
import { validateCPF } from '~/helpers';

export const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [inputValue, setInputValue] = useState<string>(searchTerm);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const removeMask = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = event.target.value;
    setInputValue(maskedValue);

    const unmaskedValue = removeMask(maskedValue);

    if (validateCPF(unmaskedValue)) {
      dispatch(setSearchTerm(unmaskedValue));
    } else {
      console.log('CPF inválido'); // Log de depuração      
    }
  };

  const handleRefreshClick = () => {
    dispatch(fetchRegistrations());
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);
  
  return (
    <S.Container>
      <TextField
        mask="000.000.000-00"
        placeholder="Digite um CPF válido"
        value={inputValue}
        onChange={handleInputChange}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefreshClick}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
