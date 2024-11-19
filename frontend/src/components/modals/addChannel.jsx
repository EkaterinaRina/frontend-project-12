import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import filter from 'leo-profanity';
import { useAddChannelMutation } from '../../api/channelApi';
import { setCurrentChannel } from '../../slices/channelSlice';

const AddChannel = (props) => {
  const { t } = useTranslation();
  const { showModal, handleCloseModal, getValidateChannelName } = props;
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const [addChannel] = useAddChannelMutation();
  const refInput = useRef(null);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidateChannelName,
    onSubmit: async (values) => {
      try {
        const cleanName = filter.clean(values.name);
        const data = {
          name: cleanName,
          removable: true,
        };

        const response = await addChannel(data).unwrap();

        dispatch(setCurrentChannel(response));
        toast.success(t('toast.channelCreated'));
        handleCloseModal();
      } catch (error) {
        console.log(error);
        toast.error(t('toast.errorNetwork'));
        if (error.response.status >= 400 && error.response.status < 500) {
          rollbar.error('AddChannel error', error);
        }
      }
    },
  });

  return (
    <Modal
      show={showModal === 'adding'}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              name="name"
              className="mb-2"
              ref={refInput}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden>{t('chat.nameChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                {t('chat.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('chat.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
