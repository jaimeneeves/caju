import { useState } from "react";
import { toast } from 'react-toastify'
import { ButtonSmall } from "~/components/Buttons";
import Modal from "~/components/Modal";
import { useDispatch } from 'react-redux';
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { updateRegistrationStatus, deleteRegistration } from '~/store/registrationSlice'
import { AppDispatch } from '~/store';

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isReproveModalOpen, setIsReproveModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleConfirmReprove = () => {
    dispatch(updateRegistrationStatus({ ...props.data, status: 'REPROVED' })).then(() => {
      setIsReproveModalOpen(false);
      toast.success('Registro reprovado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error('Erro ao reprovar registro', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleConfirmApprove = () => {
    dispatch(updateRegistrationStatus({ ...props.data, status: 'APPROVED' })).then(() => {
      setIsApproveModalOpen(false);
      toast.success('Registro aprovado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error('Erro ao aprovar registro', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleConfirmReview = () => {
    dispatch(updateRegistrationStatus({ ...props.data, status: 'REVIEW' })).then(() => {
      setIsReviewModalOpen(false);
      toast.success('Registro enviado para revisão novamente', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error('Erro ao enviar registro para revisão novamente', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleReprove = () => {
    setIsReproveModalOpen(true);
  };

  const handleApprove = () => {
    setIsApproveModalOpen(true);
  };

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteRegistration(props.data.id));
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
        <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={handleApprove}>Aprovar</ButtonSmall>
        <ButtonSmall bgcolor="#ff8858" onClick={handleReview}>Revisar novamente</ButtonSmall>

        <HiOutlineTrash onClick={handleDelete} />
      </S.Actions>

      {isReproveModalOpen && (
        <Modal
          title="Confirmar reprovação"
          onConfirm={handleConfirmReprove}
          onClose={() => setIsReproveModalOpen(false)}
        >
          <p>Tem certeza que deseja reprovar este registro?</p>
        </Modal>
      )}

      {isApproveModalOpen && (
        <Modal
          title="Confirmar aprovação"
          onConfirm={handleConfirmApprove}
          onClose={() => setIsApproveModalOpen(false)}
        >
          <p>Tem certeza que deseja aprovar este registro?</p>
        </Modal>
      )}

      {isReviewModalOpen && (
        <Modal
          title="Confirmar revisão"
          onConfirm={handleConfirmReview}
          onClose={() => setIsReviewModalOpen(false)}
        >
          <p>Tem certeza que deseja revisar novamente este registro?</p>
        </Modal>
      )}
    </S.Card>
  );
};

export default RegistrationCard;
