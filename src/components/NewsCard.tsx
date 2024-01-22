import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { News } from '../utils/interfaces';

export default function NewsCard({address, title, validationsRequired, expireDate, valid}: News) {
    return (

        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    { valid === true ? "Valid" : "Validation required: " + {validationsRequired} }
                    </Typography>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {address}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        { valid === false ? "expire date: " + {expireDate} : "" }
                    </Typography>
                    <Typography variant="body2">
                        {"testo d'esempio con l'anteprima"}
                        <br />
                        {'della notizia'}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>

    )
}