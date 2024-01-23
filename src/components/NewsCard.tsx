import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { News } from '../utils/interfaces';

export default function NewsCard({address, title, validationsRequired, expireDate, valid}: News) {

    function formattedExpireDate(){
        return new Date(Number(expireDate)).toLocaleDateString('sv');
    }
    
    function validations() {
        return Number(validationsRequired);
    }

    return (

        <Box sx={{ maxWidth:"100%", marginBottom: "1rem" }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color={ valid === true? "success.main" : "text.secondary"} gutterBottom>
                    { valid === true ? "Valid" : "Validation required: " + validations() }
                    </Typography>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5, mr: 10}} color="text.secondary">
                        {address}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        { valid === false ? "Expire date: " + formattedExpireDate() : "" }
                    </Typography>
                    <Typography variant="body2">
                        {"testo d'esempio con l'anteprima"}
                        <br />
                        {'della notizia'}
                    </Typography>
                </CardContent>
                <CardActions>
                    { valid === false ? 
                    <>
                        <Button size="small" color='success'>Send</Button> 
                        <Button size="small" color='error'>Skip</Button>  
                    </> :
                    <>
                        <Button size="small" color='success'>Vote</Button>  
                        <Button size="small" color='error'>Skip</Button>  
                    </>
                    }
                </CardActions>
            </Card>
        </Box>

    )
}