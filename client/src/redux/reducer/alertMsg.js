const alertMsgState = {}

const alertMsg = (prevState= alertMsgState, action) =>{
    const {type, data} = action
    switch(type){
        case "addAlert":
            return {
                data
            }
        case "delAlert":
            return {};
        default:
            return prevState;
    }
}

export default alertMsg;