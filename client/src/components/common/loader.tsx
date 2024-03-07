import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
    return (
        <Backdrop
            className='bg-mainColor'
            sx={{ color: '#4694f9', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}