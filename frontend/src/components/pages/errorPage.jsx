import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundLogo from '../../public/images/notFoundLogo.svg';

const ErrorPage = () => {
    const { t } = useTranslation();

    return (
        <div className='text-center'>
            <img src={notFoundLogo} alt={t('pageNotFound.notFound')} className='w-25 img-fluid' />
            <h2 className='h4 text-muted'>{t('pageNotFound.notFound')}</h2>
            <p className='text-muted'>
                {t('pageNotFound.but')}
                {'\u00A0'}
                <a href="/">{t('pageNotFound.mainPage')}</a>
            </p>
        </div>
    )
}

export default ErrorPage;