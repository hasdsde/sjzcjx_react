import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useDispatch } from "react-redux";
import { AppDiapatch, useAppSelector } from "../_store/store";
import { closeConfirmDialog } from "../_store/sign-slice";
import { Api, BaseApi } from "../_config/api";
import { useRouter } from 'next/navigation';
export default function ConfirmDialog() {
    const dispatch = useDispatch<AppDiapatch>()
    let alterState = useAppSelector((state) => state.signReducer.value.confirmDialog)
    const closeDialog = () => {
        dispatch(closeConfirmDialog())
    }
    const handleDelete = () => {
        Api(alterState.url + "?id=" + alterState.id, { method: "DELETE", }).then((res: BaseApi) => {
            location.reload()
        })
    }
    return (
        <div>
            <Modal open={alterState.open} >
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        {alterState.title}
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {alterState.context}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => { closeDialog(); handleDelete() }}>
                            确定
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => closeDialog()}>
                            取消
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </div>
    )
}