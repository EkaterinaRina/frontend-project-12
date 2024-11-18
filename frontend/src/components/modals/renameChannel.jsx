import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRenameChannelMutation } from "../../api/channelApi";
import { setCurrentChannel } from "../../slices/channelSlice";
import filter from 'leo-profanity';

const RenameChannel = (props) => {
    const { t } = useTranslation();
    const {
        showModal,
        handleCloseModal,
        getValidatedChannelName,
        modalChannelId,
        modalChannelName,
    } = props;

    const dispatch = useDispatch();

    const [renameChannel] = useRenameChannelMutation();

    const refInput = useRef(null);

    useEffect(() => {
        if (refInput.current) {
            refInput.current.focus();
        }
    }, []);

    const handleRenameChannel = async (values) => {
        try {
            const { name, channelId } = values;
            const cleanName = filter.clean(name);
            const data = {
                id: channelId,
                name: cleanName,
                removable: true,
            };

            const response = await renameChannel(data).unwrap();
            handleCloseModal();
            dispatch(setCurrentChannel(response));
            toast.success(t('toast.channelRename'));
        } catch (error) {
            console.log(error);
            toast.error(t('toast.errorNetwork'));
        }
    };

    const formik = useFormik({
        initialValues: {
            name: modalChannelName,
            channelId: modalChannelId,
        },
        validationSchema: getValidatedChannelName,
        onSubmit: handleRenameChannel,
        enableReinitialize: true,
    });

    return (
        <Modal show={showModal === 'renaming'} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('chat.renameChannel')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            onChange={formik.handleChange}
                            ref={refInput}
                            value={formik.values.name}
                            name="name"
                            className="mb-2"
                            disabled={formik.isSubmitting}
                            isInvalid={formik.touched.name && formik.errors.name}
                        />
                        <Form.Label visuallyHidden>{t('chat.nameChannel')}</Form.Label>
                        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                        <div className="d-flex justifu-content-end">
                            <button
                                type="button"
                                className="me-2 btn btn-secondary"
                                onClick={handleCloseModal}
                            >
                                {t('chat.cancel')}
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={formik.isSubmitting}
                            >
                                {t('chat.send')}
                            </button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default RenameChannel;