import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import channelsApi, { useGetChannelsQuery } from "../../api/channelApi.js";
import { setCurrentChannel } from "../../slices/channelSlice.js";
import routes from "../../utils/routes.js";
import useAuth from '../../hooks/useAuth.js';

const Channels = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const channelsEndRef = useRef(null);

    const { currentChannel } = useSelector((state) => state.currentChannel);

    const {
        data: channelsData,
        error: channelsError,
        isLoading: isLoadingChannels,
    } = useGetChannelsQuery();

    const handleModalShow = () => {
        console.log('modal');
    }

    const handleClickChannel = (channelId) => {
        dispatch(setCurrentChannel(channelId));
    };

    useEffect(() => {
        if (channelsError) {
            const { status } = channelsError;
            if (status === 401) {
                logOut();
                navigate(routes.login);
            } else {
                console.error(channelsError);
                toast.error(t('toast.errorNetwork'));
            }
        }
    }, [channelsError, t, navigate, logOut]);

    useEffect(() => {
        if (channelsEndRef.current) {
            channelsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [channelsData]);

    return isLoadingChannels ? (
        <div>{t('chat.loading')}</div>
    ) : (<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('chat.channels')}</b>
            <button
                type='button'
                className="'btn btn-outline-primary btn-sm"
                onClick={() => handleModalShow()}
            >
                {t('chat.plus')}
            </button>
        </div>
        <ul
            id="channels-box"
            className="nav felx-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
            {channelsData.map((channel) => (
                <li key={channel.id} className="nav-item w-100">
                    <div role='group' className="d-flex dropdown dnt-group">
                        <button
                            type="button"
                            className={classNames(
                                'w-100 rounded-0 text-start text-truncate btn',
                                { 'btn-secondary': channel.id === currentChannel.id },
                            )}
                            onClick={() => handleClickChannel(channel)}
                        >
                            <span className="me-1">#</span>
                            {channel.name}
                        </button>
                        {channel.removable && (
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle
                                    split
                                    variant={channel.id === currentChannel.id ? 'secondary' : 'light'}
                                >
                                    <span className="vusually-hidden">{t('chat.channelActions')}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => handleModalShow()}
                                    >
                                        {t('chat.remove')}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handleModalShow()}
                                    >
                                        {t('chat.rename')}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                </li>
            ))}
            <div ref={channelsEndRef} />
        </ul>
    </div>
    )
}

export default Channels;