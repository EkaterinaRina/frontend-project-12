import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundLogo from '../../public/images/notFoundLogo.jpg';

const ErrorPage = () => {
    const { t } = useTranslation();
    return (
        <div className='text-center'>
            <img src={notFoundLogo} alt={t('pageNotFound.notFound')} />
            <h2>{t('pageNotFound.notFound')}</h2>
            <p>
                {t('pageNotFound.but')}
                <a href="/">{t('pageNotFound.mainPage')}</a>
            </p>
        </div>
    )
}

export default ErrorPage;