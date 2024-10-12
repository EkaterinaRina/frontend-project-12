import React from "react";
import { Formik, Form, Field } from 'formik';
import { useTranslation } from "react-i18next";
import loginLogo from '../../public/images/loginLogo.jpeg';

const handleSubmit = () => {
    console.log('pururu');
}

const LoginPage = () => {
    const { t } = useTranslation();
    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="card shadow-sm">
                    <div className="card-body row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={loginLogo} className="rounded-circle" alt="Войти" />
                        </div>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className="col-12 col-md-6 mt-3 mt-md-0">
                                    <h1 className="text-center mb-4">{t('form.loginHeader')}</h1>
                                    <div className="form-floating mb-3">
                                        <label htmlFor="username">{t('form.username')}</label>
                                        <Field
                                            type='username'
                                            name='username'
                                            className='form-control'
                                            id="username"
                                            placeholder={t('form.yourname')}
                                        />
                                    </div>
                                    <div className="form-floating mb-4">
                                        <label htmlFor="password">{t('form.password')}</label>
                                        <Field
                                            type='password'
                                            name='password'
                                            className='form-control'
                                            id='password'
                                            placeholder={t('form.password')}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('form.enter')}</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="card-footer p-4">
                        <div className="text-center">
                            <span>{t('form.withoutAccount')}</span>
                            <a href="/signup">{t('form.registration')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;
