import { ButtonSmall } from "~/components/Buttons";
import { useDispatch } from 'react-redux';
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { updateRegistrationStatus } from '~/store/registrationSlice'
import { AppDispatch } from '~/store';

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const handleReprove = () => {
    dispatch(updateRegistrationStatus({ id: props.data.id, status: 'REPROVED' }));
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={handleReprove}>Reprovar</ButtonSmall>
        <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
        <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>

        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
