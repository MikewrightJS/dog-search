import {Container} from '@mui/material';
import Styles from './styles.module.css'

function Images({images}) {
  return (
    <Container sx={{paddingTop:3}} maxWidth="md">
        <div className={Styles.row}>
            <div className={Styles.column}>
                {images ? images.map((image, key) =>{
                    return <img key={key} alt={`Pupper pics ${key}`} src={image}/>
                }) : <h3 style={{textAlign:'center'}}>Please select the options above to generate images</h3> }
            </div>
        </div>

    </Container>
  );
}

export default Images;
