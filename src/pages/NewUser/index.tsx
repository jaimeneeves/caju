import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { validateCPF } from '~/helpers';
import { createUserRegistration } from '~/store/registrationSlice';

const NewUserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.registrations);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [formError, setFormError] = useState("");

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorMessage = emailRegex.test(value) ? "" : "Email inválido";
    setEmailError(errorMessage);
  };

  const validateFullName = (value: string) => {
    const fullNameRegex = /^(?![0-9])[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)+$/;
    const errorMessage = fullNameRegex.test(value) ? "" : "Nome inválido";
    setFullNameError(errorMessage);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    validateFullName(e.target.value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(value);

    const unmaskedValue = value.replace(/\D/g, '');

    if (!validateCPF(unmaskedValue)) {
      setCpfError("CPF inválido");
    } else {
      setCpfError("");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmissionDate(e.target.value);
  };

  const handleSubmit = async () => {
    // Verifique todos os campos
    if (emailError || fullNameError || cpfError) {
      setFormError("Por favor, corrija os erros antes de enviar.");
      return;
    }

    if (!email || !fullName || !cpf || !admissionDate) {
      setFormError("Todos os campos são obrigatórios.");
      return;
    }

    const payload = {
      employeeName: fullName,
      email,
      cpf,
      admissionDate,
      status: 'REVIEW',
    };

    dispatch(createUserRegistration(payload));

    // Sucesso
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          value={fullName}
          setValue={setFullName}
          error={fullNameError}
          onChange={handleFullNameChange}
        />
        <TextField
          placeholder="Email" label="Email" type="email" value={email}
          setValue={setEmail}
          error={emailError}
          onChange={handleEmailChange}
        />
        <TextField
          mask="000.000.000-00"
          placeholder="CPF"
          label="CPF"
          value={cpf}
          setValue={setCpf}
          error={cpfError}
          onChange={handleCpfChange}
        />
        <TextField
          label="Data de admissão"
          type="date"
          value={admissionDate}
          onChange={handleDateChange}
        />
        {formError && <span style={{ fontSize: 12, color: 'red' }}>{formError}</span>}
        {status === 'loading' && <span>Enviando...</span>}
        {error && <span style={{ fontSize: 12, color: 'red' }}>{error}</span>}
        <Button id='submit' onClick={handleSubmit}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
