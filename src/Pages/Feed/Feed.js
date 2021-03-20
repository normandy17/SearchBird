import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import Loading from "../../Components/Loading/loading"
import { getBirds } from "../../Redux/birdRedux/actions"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

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

export const Feed = () => {
  const isLoading = useSelector((state) => state.birds.isLoading)
  const birds = useSelector((state) => state.birds.birds)
  const max = useSelector((state) => state.birds.max)
  const limit = useSelector((state) => state.birds.limit)
  const page = useSelector((state) => state.birds.page)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBirds(page, limit))
  }, [])

  const history = useHistory()
  const classes = useStyles();

  const onChange = (a, b) => {
    dispatch(getBirds(a, b))
  }

  const handleClick = (id) => {
    history.push(`/bird/${id}`)
  }

  if (isLoading) return <Loading></Loading>
  else return (
    <div style={{ padding: "20px" }}>

      <Grid container spacing={3} justify="space-around"  >
        {
          birds.length > 0 && birds.map((item) => (
            <Grid item sm={12} md={8} lg={4} style={{ width: "18%" }} key={item._id}>
              <Card className={classes.root}>
                <div style={{ width: "150px", height: "150px", borderRadius: "75px", background: "blue", marginTop: "7%", marginLeft: "20px"}}>
                  <img src={item.image} alt="Bird DP" width="150px" height="150px" style={{ borderRadius: "75px" }} />
                  <Button size="small" onClick={() => handleClick(item._id)} style={{ marginLeft: "30px", marginTop: "10px", color: "inherit" }}>View More</Button>
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
                    
                  </CardActions>
                </div>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <div style={{ marginLeft: "10px", display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Pagination defaultCurrent={page} defaultPageSize={limit} total={max} showSizeChanger={true} pageSizeOptions={[1, 2, 3, 4, 5, 6]} onChange={onChange} />
      </div>
    </div>
  )
}

