import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '~/store';
import { fetchRegistrations } from '~/store/registrationSlice';
import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useDebounce } from '~/hooks/useDebounce';

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
}

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch<AppDispatch>();
  const registrations = useSelector((state: RootState) => state.registrations.registrations);
  const status = useSelector((state: RootState) => state.registrations.status);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredRegistrations = registrations.filter((registration: Registration) =>
    registration.cpf.includes(searchTerm)
  );

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchRegistrations(debouncedSearchTerm));
    } else {
      dispatch(fetchRegistrations());
    }
  }, [debouncedSearchTerm, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} />
      <Collumns registrations={filteredRegistrations} />
    </S.Container>
  );
};
export default DashboardPage;
