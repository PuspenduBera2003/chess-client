import { setShowPromotionDialog } from "./ActionType/PassPlayTypes";

const updateShowPromotionDialog = (data) => {
    return {
        type: setShowPromotionDialog,
        payload: data
    }
}

export default updateShowPromotionDialog