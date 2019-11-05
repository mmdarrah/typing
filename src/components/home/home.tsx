import React, { useRef, useEffect } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Grid, Typography, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import enterImage from '../../static/images/enter_button.svg';
import whiteImage from '../../static/images/vita_illustrationer.svg';
import logo from '../../static/images/logo.png';
import { IRootState } from '../../shared/reducers';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    link: {
      outline: '0',
      '&:focus img': {
        borderRadius: 3,
        border: '2px solid white'
      }
    },
    illustration: {
      position: 'absolute',
      right: '7em',
      top: '10em',
      [theme.breakpoints.down('lg')]: {
        position: 'relative',
        top: '0',
        right: '0'
      }
    },
    logo: {
      position: 'absolute',
      top: '1em',
      left: '2em',
      height: '70px',
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        display: 'block',
        top: '0',
        left: '0'
      }
    }
  })
);

const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const mapStateToProps = (state: IRootState) => ({
  gameCharacters: state.game.gameCharacters
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps;

const Home = (props: IProps) => {
  const linkElement = useRef<HTMLAnchorElement | null>(null);
  const {
    gameCharacters
  } = props;

  useEffect(() => {
    if (linkElement.current) {
      linkElement.current.focus();
    }
  }, []);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}spacing={2}>
      <img src={logo} alt="Logotyp for projektet" className={classes.logo} />
      <Grid item xs={10}>
        <Typography variant="h1">Välkommen till Typing in the dark</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">I det här spelet kommer du att få göra olika uppdrag med hjälp av tangentbordet och
          du spelar med en ninja. Du kommer få olika uppdrag att klara av och efter varje avklarat uppdrag få olika bälten från vit till svart.
          Uppdragen består av allt ifrån att hitta saker i mörka grottor till att göra så många kombos av ninja moves som möjligt.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">Målet är att klara alla uppdrag i spelet och att lära sig att skriva på tangentbordet,
          utan att se det. När du har klarat alla uppdrag i spelet får du svart bälte i tangentbord.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1" align="left">
          För att starta spelet tryck Enter, den knappen ligger till höger på tangentbordet format som ett upp och nedvänt L.
        </Typography>
      </Grid>
      <Grid item container justify="center" >
        <Grid item xs={12} md={2}>
          <img src={gameCharacters[0].image} alt={gameCharacters[0].name} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Link to="/explore" className={classes.link} ref={linkElement} component={Link1}>
            <img src={enterImage} alt="Enter knapp" />
          </Link>
        </Grid>
        <Grid item xs={12} md={2}>
          <img src={gameCharacters[1].image} alt={gameCharacters[1].name} />
        </Grid>
      </Grid>
      <img src={whiteImage} alt="Vita illustrationer" className={classes.illustration}/>
    </Grid>
  );
};

export default connect(mapStateToProps)(Home);
