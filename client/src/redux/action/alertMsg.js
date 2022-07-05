export function addAlertMsg(data){
    return{
        type: "addAlert",
        data
    }
}

export function delAlertMsg(){
    return{
        type: "delAlert",
    }
}