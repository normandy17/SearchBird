import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchQuery } from "../../Redux/Search/actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    height: "250px",
    background: "inherit",
    color: "inherit",
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: "inherit"
  },
  pos: {
    marginBottom: 12,
    color: "inherit"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typo: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
});

export function SearchResult(props) {
  const { searched } = useSelector((state) => state.search);
  console.log(searched)
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let temp = history.location.search.split("=")[1];
    dispatch(searchQuery({ query: temp }));
  }, [history.location.search]);

  const handleClick = (id) => {
    history.push(`/bird/${id}`);
  };

  return (
    
    <Grid container spacing={3} justify="space-around"  style={{marginTop:"50px", height:"600px",overflow:"visible"}}>
      {
          searched.length === 0 && <div>Sorry, we could not find what you're searching for!!</div>          
        }
        {
          searched.length > 0 && searched.map((item) => (

            <Grid item sm={12} md={8} lg={4} style={{ width: "18%" }} key={item._id}>
            <Card className={classes.root}>
              <div style={{ width: "150px", height: "150px", borderRadius: "75px", background: "blue", marginTop: "7%", marginLeft: "20px" }}>
                <img src={item.image} alt="Bird DP" width="150px" height="150px" style={{ borderRadius: "75px" }} />
              </div>
              <div>
                <CardContent style={{ height: "170px" }}>
                  <Typography variant="h5" component="h2" style={{ marginBottom: "20px", color: "inherit" }}>
                    Name: {item.common_name}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Scientific Name: {item.scientific_name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Family: {item.family}
                  </Typography>
                  <div style={{ width: "100%" }}>
                    <p style={{ display: "-webkit-box", webkitLineClamp: "3", webkitBoxOrient: "vertical", overflow: "hidden" }}>Description: {item.description}</p>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleClick(item._id)} style={{ marginLeft: "34%", marginTop: "30px", color: "inherit" }}>View More</Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
          ))
        }      
      </Grid>
  );
}
