import React from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import ThemeSwitcher from "react-theme-switcher";
import { NavLink } from "react-router-dom";
import { Search } from "../Search/Search";
import AddBird from "../addBird"
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxHeight: "100px",
    backgroundImage: "url(mount4.jpg)",
    backgroundSize: "100% 100%",
    backgroundBlendMode: "soft-light",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "fixed",
    top: 0
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

  },
  homeIcon: {
    color: "white",
  },
  avatar: {
    margin: "10px",
  },
  subnav_links: {
    textDecoration: "none",
    color: "white",
  },
  root: {
    marginBottom: "10px"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: "auto",
  },
}));

export function Nav() {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const queryHandler = (e) => {
    history.push(`/search?q=${query}`);
    setQuery("");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar id="appbar1" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={styles.navlink_wrapper_left}>
            <NavLink to="/">
              <div class={styles.container}>
                <div class={styles.icon1}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.456 228.455">
                    <path d="M69.559,116.331c13.25-2.661,29.385,0.719,29.385,0.719s-9.153-25.537-29.385-47.087
  C49.326,48.425,25.483,38.769,5.256,12.035C-1.003,32.034-5.342,59.241,14.487,80.75
  C34.324,102.269,66.914,107.167,69.559,116.331z"/>
                    <path d="M225.604,18.168c0,0-67.433,22.145-87.895,48.893c-20.47,26.744-13.97,43.342-28.178,52.982
  c-5.889,3.998-19.232-0.966-30.106-0.487c-8.728,0.398-19.021,2.376-24.714,9.975c-2.869,3.827-2.494,6.388-2.741,9.305
  c-4.577,8.757-1.451,13.726-1.451,13.726s2.475-5.062,6.508-4.801c4.036,0.232,6.478,0.505,9.061,0.2
  c2.581-0.32,4.24-3.13,8.76-2.789c4.963,0.353,11.108,4.14,11.311,11.269c0.331,11.129-9.269,19.349-8.518,24.041
  c0.817,5.062-0.369,6.685-1.112,8.692c-1.054,2.853-17.855-6.528-21.92,0.601c1.382-0.292,5.12-0.063,7.318,0.718
  c-2.443,1.09-3.619,2.641-3.611,4.692c2.26-2.437,6.769-1.547,8.313-1.347c-2.614,0.718-3.767,3.419-4.336,4.412
  c6.502-2.974,16.353,0.108,18.606,5.146c2.531-4.071,0.818-9.169,0.818-9.169s1.805-2.3,5.416-2.412
  c-1.082,3.639,0.336,4.652,0.487,6.5c0.142,1.84-2.016,6.424-4.018,7.643c-2.012,1.189-12.179-0.129-14.711,5.843
  c1.521-0.982,6.953-2.353,8.313-1.804c-1.625,0.722-3.07,2.088-3.25,5.069c2.885-3.258,8.666-3.49,9.842-2.89
  c-0.719,0.81-2.344,1.271-2.889,4.244c3.526-1.992,10.473-5.778,18.975-2.252c-0.549-5.154-6.69-6.5-6.69-6.5
  s-0.815-7.959,5.977-9.033c4.009-0.645,11.093-15.071,14.523-15.938c3.433-0.85,4.332,3.034,3.739,5.037
  c-0.6,1.992-7.893,13.024-7.893,13.024s12.53,11.068,31.548,11.806c19.04,0.762,32.269-11.293,32.269-11.293
  s-14.904-11.821-27.66-21.94c-12.755-10.135-9.89-25.667-9.89-25.667s17.328,0.031,23.583-12.896
  c15.409-31.795,54.906-25.75,66.239-72.963C232.004,41.077,225.604,18.168,225.604,18.168z M60.029,136.291
  c-1.495,0-2.711-1.21-2.711-2.729c0-1.486,1.208-2.697,2.711-2.697c1.499,0,2.705,1.202,2.705,2.697
  C62.734,135.065,61.528,136.291,60.029,136.291z"/></svg>  </div>
              </div>
            </NavLink>
            <Button style={{ background: "cyan", fontWeight:"800"}} onClick={handleOpen}>Add New Bird</Button>
          </div>
          <div>
            <img src="main.png" alt="logo" />
          </div>
          <div className={styles.navlink_wrapper_right}>
            <Search
              setQuery={setQuery}
              query={query}
              queryHandler={queryHandler}
            />
            <ThemeSwitcher />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Toolbar></Toolbar>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <div >
            <AddBird
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
