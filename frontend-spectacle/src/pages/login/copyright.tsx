import { Link, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

type CopyrightProps = {
    sx: SxProps<Theme> | undefined
}

const Copyright: React.FC<CopyrightProps> = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} >
            {'Copyright © '}
            <Link color="inherit" href="#">
                espetaculos.com.br
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;