import { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import loginLogo from '../../public/images/loginLogo.jpeg';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import routes, { apiPaths } from "../../utils/routes";
import axios from 'axios';
import { toast } from 'react-toastify';
import { setToken, setUserName } from "../../slices/authSlice";

const LoginPage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logIn } = useAuth();

    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (error) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [error]);

    const handleSubmit = async (values, { setSumbitting }) => {
        try {
            const { data } = await axios.post(apiPaths.loginPath(), values);
            if (data.token) {
                setToken(data.token);
                setUserName(data.username);
                logIn(data.token, data.username);

                dispatch(setToken(data.token));
                dispatch(setUserName(data.username));
                navigate(routes.chat);
            } else {
                setError(true);
            }
        } catch (err) {
            if (err.isAxiosError && err.response.status === 401) {
                setError(true);
            } else {
                console.error(err);
                toast.error(t('toask.errorNetwork'))
            }
            setSumbitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: handleSubmit,
    });

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="card shadow-sm">
                    <div className="card-body row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={loginLogo} className="rounded-circle" alt="Войти" />
                        </div>
                        <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                            <h1 className="text-center mb-4">{t('form.loginHeader')}</h1>
                            <Form.Group className='form-group form-floating mb-3'>
                                <Form.Control
                                    type='username'
                                    name='username'
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    id="username"
                                    value={formik.values.username}
                                    autoComplete='username'
                                    onChange={formik.handleChange}
                                    placeholder={t('form.yourName')}
                                    required
                                    ref={inputRef}
                                    autoFocus
                                />
                                <Form.Label className="form-label" htmlFor="username">{t('form.yourName')}</Form.Label>
                            </Form.Group>
                            <Form.Group className="form-group form-floating mb-4">
                                <Form.Control
                                    type='password'
                                    name='password'
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    id='password'
                                    placeholder={t('form.password')}
                                    required=""
                                    onChange={formik.handleChange}
                                    autoComplete='current-password'
                                    value={formik.values.password}
                                />
                                <Form.Label htmlFor="password">{t('form.password')}</Form.Label>
                                {error && (
                                    <Form.Control.Feedback className="invalid-tooltip">
                                        {t('form.loginError')}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <div className="text-center">
                                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('form.loginHeader')}</button>
                            </div>
                        </Form>
                    </div>
                    <div className="card-footer p-4">
                        <div className="text-center">
                            <span>{t('form.withoutAccount')}</span>
                            {' '}
                            <a href="/signup">{t('form.registration')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;
