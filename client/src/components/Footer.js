import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import '../css/footer.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        OnlineMarket
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function StickyFooter() {
  return (
    <div className='footer-wr'>
      <footer>
        <Container>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}