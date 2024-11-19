import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelApi';
import { setCurrentChannel } from '../../slices/channelSlice';

const RemoveChannel = (props) => {
  const { showModal, handleCloseModal, modalChannelId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();

  const currentChannelId = useSelector((state) => state.currentChannel.currentChannel.id);
  const defaultChannel = { id: '1', name: 'general', removable: false };

  const handleRemoveChannel = async (id) => {
    try {
      await removeChannel(id).unwrap();
      handleCloseModal();
      if (id === currentChannelId) {
        dispatch(setCurrentChannel(defaultChannel));
      }
      toast.success(t('toast.channelDeleted'));
    } catch (error) {
      console.log(error);
      toast.error(t('toasts.errorNetwork'));
    }
  };

  return (
    <Modal
      show={showModal === 'removing'}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat.removeChannelText')}</p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={handleCloseModal}
          >
            {t('chat.cancel')}
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => handleRemoveChannel(modalChannelId)}
          >
            {t('chat.delete')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
