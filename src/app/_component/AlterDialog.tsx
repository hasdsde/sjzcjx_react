import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { AppDiapatch, useAppSelector } from "../_store/store";
import { useDispatch } from "react-redux";
import { closeAlterDialog } from "../_store/sign-slice";


export default function AlterDialog() {
    const dispatch = useDispatch<AppDiapatch>()
    let alterState = useAppSelector((state) => state.signReducer.value.alterDialog)
    const closeDialog = () => {
        dispatch(closeAlterDialog())
    }
    return (
        <div>
            <Modal open={alterState.open} onClose={() => closeDialog()}>
                <ModalDialog variant="outlined" role="alertdialog" size="lg"
                    sx={{ display: 'flex', padding: '30px', minWidth: '400px' }}>
                    <DialogTitle >
                        <Typography level="h2">
                            {alterState.title}
                        </Typography>
                    </DialogTitle>
                    <Divider className={'my-2'} />
                    <DialogContent>
                        <Typography fontSize={'lg'} color="neutral">
                            {alterState.context}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="plain" color="neutral" size={'lg'} onClick={() => closeDialog()}>
                            关闭
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </div>
    )
}