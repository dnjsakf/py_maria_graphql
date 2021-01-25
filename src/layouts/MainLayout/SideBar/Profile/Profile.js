/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link as RouterLink } from 'react-router-dom';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* Styled */
import styled from 'styled-components';

/* Material Hook */
const useStyles = makeStyles( theme => ({
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

/* Styled Components */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: fit-content;
`;

/* Main Component */
const Profile = props => {
  /* Props */
  const {
    className,
    user,
    ...rest
  } = props;
  
  /* Styles Hook */
  const classes = useStyles();

  /* Renderer */
  return (
    <Container
      className={ className }
    >
      <Avatar
        alt="Person"
        className={ classes.avatar }
        src={ user.avatar }
        component={ RouterLink }
        to="/"
      />
      <Typography
        className={ classes.name }
        variant="h4"
      >
        { user.name }
      </Typography>
      <Typography variant="body2">
        { user.bio }
      </Typography>
    </Container>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

Profile.defaultProps = {
  user: {
    name: 'Dochi',
    avatar: '/public/images/avatars/dochi.jpeg',
    bio: 'Developer'
  },
};

export default Profile;