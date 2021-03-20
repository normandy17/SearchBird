import React, { useEffect } from "react"
import { useParams,useHistory,Link } from "react-router-dom"
import { useSelector,useDispatch} from "react-redux"
import { deleteBird, getBird } from "../../Redux/birdRedux/actions"
import Loading from "../../Components/Loading/loading.js"
import EditBird from "../../Components/editBird"
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    root: {
        width: "50%",
        height: "max-content",
        display: "flex",
        margin:"auto",
        background: "inherit",
        color: "inherit",            
    },
    
    title: {
        fontSize: 16,
        color: "inherit",  
    },
    pos: {
        marginBottom: 12,
        color: "inherit",  
    },
    paper: {
        width: 400,
        border: '2px solid #000',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        width:"50%",
        textAlign:"left"
    }
});

export const ViewBird = () => {
    const classes = useStyles()
    const history = useHistory()
    const isLoading = useSelector((state) => state.birds.isLoading)
    const { id } = useParams()
    const dispatch = useDispatch()
    const item = useSelector((state) => state.birds.bird)
    const [open, setOpen] = React.useState(false)
    const [toggle, setToggle] = React.useState(0)

    useEffect(() => {
        dispatch(getBird(id))
    }, [toggle])


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };   

    const handleDelete = async (id) => {
        console.log("vehicle", id)
        const reply = await dispatch(deleteBird(id))
        if (reply) {
            setToggle(!toggle)
            history.goBack()
            alert("Deletion Success")
        }
        else
            alert("Deletion Failed")
    }


    if (isLoading) return <Loading></Loading>
    else if (!item) {
        return (
            <div>
                {" "}
                <h2>Item not found</h2>
                <Link to="/">HOME PAGE</Link>{" "}
            </div>
        )
    }

    else return (
        <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "100%", justifyContent: "space-evenly", marginTop: "100px", textAlign: "center",  }}>
            <Card className={classes.root} key={item._id} >
                <div style={{ width: "50%", height: "50%", borderRadius: "20px", padding:"2%", boxSizing:"border-box" }}>
                    <img src={item.image} alt="" srcset="" width="98%" height="98%" style={{ borderRadius: "20px" }} />
                </div>
                <CardContent className={classes.content} >
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
                     Description: {item.description}
                    </div>
                </CardContent>

            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
            >
                <Fade in={open}>
                    <div >
                        <EditBird
                            handleClose={handleClose}
                            bird={item}
                            toggle={toggle}
                            setToggle={setToggle}
                        />
                    </div>
                </Fade>
            </Modal>
            <div style={{ margin:"auto"}}>
                <CardActions style={{ }}>
                    <Button style={{ background: "cyan" }} size="small" onClick={handleOpen}>Edit</Button>
                    <Button style={{ background: "red" }} size="small" onClick={() => handleDelete(item._id)}>DELETE</Button>
                </CardActions></div>
                
                <Link style={{ margin:"auto", textAlign:"center"}} to="/">HOME PAGE</Link>
        </div>
    )
}


