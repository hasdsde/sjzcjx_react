import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { AppDiapatch, useAppSelector } from "../_store/store";
import { useDispatch } from "react-redux";
import { setAlterDialog } from "../_store/sign-slice";

export default function AlterDialog() {
    const dispatch = useDispatch<AppDiapatch>()
    let open = useAppSelector((state) => state.signReducer.value.alterDialog)
    const setOpen = (openSign: boolean) => {
        dispatch(setAlterDialog(openSign))
    }
    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog" size="lg"
                    sx={{ display: 'flex', padding: '30px', minWidth: '400px' }}>
                    <DialogTitle>
                        <Typography >
                            提示
                        </Typography>
                    </DialogTitle>
                    <Divider className={'my-2'} />
                    <DialogContent>
                        <Typography fontSize={'lg'} color="neutral">
                            提示内容
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="plain" color="neutral" size={'lg'} onClick={() => setOpen(false)}>
                            关闭
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </div>
    )
}