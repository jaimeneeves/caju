import { useEffect, useState } from 'react';
import axios from '~/api/axios-config';
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
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchRegistrations = async (cpf?: string) => {
    try {
      const response = await axios.get('/registrations', {
        params: cpf ? { cpf } : {} });
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredRegistrations = registrations.filter(registration =>
    registration.cpf.includes(searchTerm)
  );

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchRegistrations(debouncedSearchTerm);
    } else {
      fetchRegistrations();
    }
  }, [debouncedSearchTerm]);

  return (
    <S.Container>
      <SearchBar handleSearch={handleSearch} />
      <Collumns registrations={filteredRegistrations} />
    </S.Container>
  );
};
export default DashboardPage;
