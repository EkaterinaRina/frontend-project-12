import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import messagesApi, { useGetMessagesQuery } from '../../api/messageApi.js';
import Message from './Message.jsx';
import Channels from './Channels.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const messageRef = useRef();

  const {
    data: messagesData = [],
  } = useGetMessagesQuery();

  const { currentChannel } = useSelector((state) => state.currentChannel);
  const filterMessages = messagesData.filter((message) =>
    message.channelId === currentChannel.id
  );
  const endRefMessage = useRef(null);

  const scrollToBottom = () => {
    endRefMessage.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filterMessages]);

  useEffect(() => {
    const socket = io();
    const handleMessage = (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMessage);
      }));
    };
    socket.on('newMessage', handleMessage);
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {currentChannel.name}
                </b>
              </p>
              <span className="text-muted">
                {t('chat.message', { count: filterMessages.length })}
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messageRef}>
              {filterMessages.map((message) => (
                <div className="text-break mb-2" key={message.id}>
                  <b>{message.username}</b>
                  {': '}
                  {message.message}
                </div>
              ))}
              <div ref={endRefMessage} />
            </div>
            <Message />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
