import { AppContext } from '@/lib/contexts/AppContext';
import { GT_America } from '@/lib/fonts';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import styles from './AlertDialog.module.scss';

export default function AlertDialog({ emitOk }) {
    const { setIsAlertOpen, isAlertOpen, recordPageStaticData } =
        useContext(AppContext);

    const handleClose = () => {
        setIsAlertOpen(false);
    };

    return (
        <Dialog
            className={GT_America.className}
            open={isAlertOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {recordPageStaticData.error_text_1}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {recordPageStaticData.error_text_2}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <a className={styles.back} onClick={handleClose}>
                    {recordPageStaticData.error_back}
                </a>
                <button onClick={emitOk} className={`red ${styles.button}`}>
                    {recordPageStaticData.error_forward}
                </button>
            </DialogActions>
        </Dialog>
    );
}
