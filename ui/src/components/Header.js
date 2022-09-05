import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AGREEMENT_ROUTE } from '../routes.const';

const Header = () => {
    return (
        <div className={'container-xl header'}>
            <img className={'logo'} src={'/img/logo.png'} alt={''}/>
            <Box display={'flex'} alignItems={'center'} padding={'8px 32px'}>
                <Link to={AGREEMENT_ROUTE} className={'header-options inactive'}>Agreements</Link>
            </Box>
            <div className={'clear'}/>
        </div>
    );
};

export default Header;
