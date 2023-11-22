import {DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Typography} from "@mui/joy";
import Button from "@mui/joy/Button";

export default function AlterDialog({setOpen, open = false, tipInfo = "提示", content}: {
    setOpen: Function,
    open: boolean | undefined,
    tipInfo: String;
    content: String;
}) {
    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog" size="lg"
                             sx={{display: 'flex', padding: '30px', minWidth: '400px'}}>
                    <DialogTitle>
                        <Typography level="h2">
                            {tipInfo}
                        </Typography>
                    </DialogTitle>
                    <Divider className={'my-2'}/>
                    <DialogContent>
                        <Typography fontSize={'lg'} color="neutral">
                            {content}
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