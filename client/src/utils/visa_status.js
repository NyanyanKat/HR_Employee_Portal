
const visaStatus = {

    statsMatch(status) {
        switch (status) {
            case 1:
                return "EAD"
            case 2:
                return "I-983"
            case 3:
                return "I-20"
            default:
                return;
        }
    },

    fileStatus(status, visaInfo) {
        switch (status) {
            case 1:
                return visaInfo.EAD.status
            case 2:
                return visaInfo.I983.status
            case 3:
                return visaInfo.I20.status
            default:
                return;
        }
    },

    nextStep(status, visaInfo){
        switch (status) {
            case 1:
                if(visaInfo.EAD.status === "pending"){
                    return " waiting for HR approval - EAD"
                }else if(visaInfo.EAD.status === "rejected"){
                    return " waiting for the EMP to RESUBMIT a copy of EAD card"
                }else if(visaInfo.EAD.status === "never submitted"){
                    return "waiting for a copy of EAD card "
                }
                break;
            case 2:
                if(visaInfo.I983.status === "pending"){
                    return " waiting for HR approval - I-983"
                }else if(visaInfo.I983.status === "rejected"){
                    return " waiting for the EMP to RESUBMIT a copy of I-983 Form"
                }else if(visaInfo.I983.status === "never submitted"){
                    return "waiting for a copy of I-983 Form "
                }
                break;            
            case 3:
                if(visaInfo.I20.status === "pending"){
                    return " waiting for HR approval - I-20"
                }else if(visaInfo.I20.status === "rejected"){
                    return " waiting for the EMP to RESUBMIT a copy of I-20"
                }else if(visaInfo.I20.status === "never submitted"){
                    return "waiting for a copy of I-20 "
                }
                break;
            default:
                break;
        }
    }
}




export default visaStatus