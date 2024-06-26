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
import { RootState, AppDispatch } from '~/store';
import { fetchRegistrations } from '~/store/registrationSlice';
import { validateCPF, removeMask } from '~/helpers';

export const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const [cpfError, setCpfError] = useState("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = event.target.value;
    setInputValue(maskedValue);

    if (maskedValue === '') {
      dispatch(setSearchTerm(''));
      return;
    }

    const unmaskedValue = removeMask(maskedValue);

    if (unmaskedValue.length === 11) {
      if (validateCPF(unmaskedValue)) {
        dispatch(setSearchTerm(unmaskedValue));
        setCpfError("");
      } else {
        setCpfError("CPF inválido");
      }
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
        error={cpfError}
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
