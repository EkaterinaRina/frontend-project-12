import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setModalChannel } from '../../slices/modalSlice';
import AddChannel from './addChannel';
import RemoveChannel from './removeChannel';
import RenameChannel from './renameChannel';
import { getChannelsModalId, getChannelsModalName, getCannels, getShowModal } from '../../store/getSelectors';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalChannelId = useSelector(getChannelsModalId);
  const modalChannelName = useSelector(getChannelsModalName);

  const handleCloseModal = () => {
    dispatch(setModalChannel({ id: '', name: '', modal: '' }));
  };

  const showModal = useSelector(getShowModal);

  const channels = useSelector(getCannels);

  const getValidateChannelName = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .matches(/\S/, t('errors.required'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('errors.notUniqueName'),
      ),
  });

  const ModalComponent = modals[showModal];
  if (!ModalComponent) {
    return null;
  }

  return (
    <ModalComponent
      showModal={showModal}
      modalChannelId={modalChannelId}
      modalChannelName={modalChannelName}
      handleCloseModal={handleCloseModal}
      getValidateChannelName={getValidateChannelName}
    />
  );
};

export default ModalContainer;
