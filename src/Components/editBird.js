import React from "react"
import { useDispatch } from "react-redux"
import Loading from "../Components/Loading/loading"
import { editBird } from "../Redux/birdRedux/actions";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const UseStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "max-content",
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        TextField: {
            width: "500px"
        }
    },
    root: {
        justifyContent:"center",
        width:"100%",
        margin:"auto",
    },
    input: {
        display: 'none',
    },
    button:{
        width:"100%",
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditBird = (props) => {
    console.log(props.bird)
    const dispatch = useDispatch()
    const classes = UseStyles();
    const [common_name, setCommon_name] = React.useState(props.bird.common_name)
    const [scientific_name, setScientific_name] = React.useState(props.bird.scientific_name)
    const [family, setFamily] = React.useState(props.bird.family)
    const [image, setImage] = React.useState(props.bird.image)
    const [description, setDescription] = React.useState(props.bird.description)
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    

    const handleUpdate = async() => {
        console.log("editing bird", common_name,scientific_name,family,description,image)
        const data = {
            common_name,
            scientific_name,
            family,
            description,
            image
        }        
        const reply = await dispatch(editBird(props.bird._id, data))
        if (reply) {            
            props.setToggle(!props.toggle)
            props.handleClose()
        }
        else
        setOpen(true)
    }    

    const uploadImage=async(e)=>{
        const files=e.target.files
        const data=new FormData()
        data.append("file",files[0])
        data.append('upload_preset','birdsImages')
        setLoading(true)
        const res=await fetch("	https://api.cloudinary.com/v1_1/normandy/image/upload",
        {
            method:"POST",
            body:data
        })

        const file=await res.json()
        console.log(file)
        setImage(file.secure_url)
        setLoading(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={{display:'flex', flexDirection:"row"}}>
        <div className={classes.paper}>
            <TextField id="outlined-basic" label="Common Name" variant="outlined" value={common_name} onChange={(e) => setCommon_name(e.target.value)} /><br />
            <TextField id="outlined-basic" label="Scientific name" variant="outlined" value={scientific_name} onChange={(e) => setScientific_name(e.target.value)} /><br />
            <TextField id="outlined-basic" label="Family" variant="outlined" value={family} onChange={(e) => setFamily(e.target.value)} /><br />
            <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} /><br />
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={uploadImage}
                />
                
                <label htmlFor="contained-button-file">
                    <Button className={classes.button} variant="contained" color="secondary" component="span">
                     <CloudUploadIcon style={{marginRight:"10px"}} />   Upload Image
        </Button>
                </label>
            </div><br/>
            
            <Button  variant="contained" color="primary" onClick={handleUpdate}>Update Bird</Button>
        </div>
{loading &&  <Loading></Loading>}
{image && <div className={classes.paper} style={{border:"1px solid black"}}>
    <img src={image}  style={{maxHeight:"400px",maxWidth:"500px"}} alt="Upload"></img>
        </div>}    
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">There was an error while updating Bird Details</Alert>
            </Snackbar>    
</div>
    )
}


export default EditBird