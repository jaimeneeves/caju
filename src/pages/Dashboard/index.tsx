import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '~/store';
import { fetchRegistrations } from '~/store/registrationSlice';
import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useDebounce } from '~/hooks/useDebounce';
import LoadingOverlay from '~/components/LoadingOverlay';

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
}

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const registrations = useSelector((state: RootState) => state.registrations.registrations);
  const status = useSelector((state: RootState) => state.registrations.status);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredRegistrations = registrations.filter((registration: Registration) =>
    registration.cpf.includes(debouncedSearchTerm)
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

  return (
    <S.Container>
      {status === 'loading' && <LoadingOverlay />}
      <SearchBar />
      <Collumns registrations={filteredRegistrations} />
    </S.Container>
  );
};
export default DashboardPage;
