import React from 'react';
import { Toast } from 'react-bootstrap';
import useNotification from '../hooks/useNotifications';

const NotificationDisplay = () => {
    const { notifications, removeNotification, reset } = useNotification();

    return (
        <div className="NotificationDisplay">
            <header>
                <h5>Notifications ({notifications.length})</h5>
                <button className="clear-button" onClick={() => reset()}>Clear Notifications</button>
            </header>
            <hr />
            <div className="notifications">
                {notifications.map((notif, i) => {
                    return (
                        <Toast className="animated fadeInRight" show={true} onClose={() => removeNotification(i)}>
                            <Toast.Header>
                                <strong className="mr-auto">{notif.title}</strong>
                            </Toast.Header>
                            <Toast.Body>{notif.message}</Toast.Body>
                        </Toast>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationDisplay;