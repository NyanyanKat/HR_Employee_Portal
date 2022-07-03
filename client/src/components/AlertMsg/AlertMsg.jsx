import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { delAlertMsg } from '../../redux/action/alertMsg';


export default function AlertMsg() {

  const alertMsg = useSelector((state) => state.alertMsg)
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(delAlertMsg())
  }

  return (
    alertMsg.data &&(
    <Alert
      message={alertMsg.data.message}
      type={alertMsg.data.type}
      showIcon
      closable
      onClose={onClose}
    />)
    
  );
};



