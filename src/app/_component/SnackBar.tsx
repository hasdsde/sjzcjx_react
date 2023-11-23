import { Snackbar } from "@mui/joy";
import { useDispatch } from "react-redux";
import { AppDiapatch, useAppSelector } from "../_store/store";
import { closeSnackBar } from "../_store/sign-slice";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export default function SnackBar() {
    const dispatch = useDispatch<AppDiapatch>()
    let state = useAppSelector((state) => state.signReducer.value.snackBar)
    const closeDialog = () => {
        dispatch(closeSnackBar())
    }
    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            open={state.open}
            onClose={closeDialog}
            color={state.color}
            startDecorator={<InfoOutlinedIcon />}
            autoHideDuration={1000}
            variant="solid"
            size="lg"
        >
            {state.context}
        </Snackbar>
    )

}