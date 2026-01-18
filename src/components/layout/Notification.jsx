const Notification = ({ message, type }) => {
  if (!message) return null;

  const style = {
    padding: '10px',
    margin: '10px 0',
    border: type === 'error' ? '1px solid red' : '1px solid green',
    color: type === 'error' ? 'red' : 'green'
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
