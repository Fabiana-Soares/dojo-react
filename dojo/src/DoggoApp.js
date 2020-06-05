import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Select, MenuItem, Typography, Card, CardMedia, CardActionArea, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "0 auto",
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(-1)
  },
}));

const useTypographStyle = makeStyles({
  root: {
    width: '100%',
    // maxWidth: 500,
    fontSize: 40,
  },
});

const useCardStyles = makeStyles({
  root: {
    margin:"0 auto",
    maxWidth: 480,
    height: 440,
  },
  media: {
    height: 400,
  },
});

const baseUrl = "https://dog.ceo/api/breeds/list";
const randomDogUrl = breed => `https://dog.ceo/api/breed/${breed}/images/random`;

function DoggoApp() {
  const [breedList, setBreedList] = useState([]);
  const [currentBreedImg, setCurrentBreedImg] = useState("");
  const [currentBreed, setCurrentBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const typogrphyStyle = useTypographStyle();
  const cardStyles = useCardStyles();

  async function dogFetcher() {
    const response = await fetch(baseUrl);
    const payload = await response.json();
    if (payload.status === "success") {
      setBreedList(payload.message);
    }
  }

  async function handleChange(element) {
    setCurrentBreed(element.target.value);
    const response = await fetch(randomDogUrl(element.target.value));
    const payload = await response.json();
    if (payload.status === "success") {
      setCurrentBreedImg(payload.message);
    }
  }

  async function reloadBreed() {
    setLoading(true);
    const response = await fetch(randomDogUrl(currentBreed));
    const payload = await response.json();
    if (payload.status === "success") {
      setCurrentBreedImg(payload.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    dogFetcher();
  }, []);

  return (
    <div>
      <Typography className={typogrphyStyle.root}
        variant="h1"
        component="h2"
        align='center'
      >
        Doggo App
         </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel>Selecione uma raca</InputLabel>
        <Select 
          variant='outlined' 
          className={styles.selectEmpty} 
          onChange={handleChange}
        >
          <MenuItem value='--' />
          {breedList.map((breed, index) => (
            <MenuItem value={breed} key={index}>
              {breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!loading && (      
      <Card className={cardStyles.root}>
          <CardActionArea> 
            <CardMedia 
             className={cardStyles.media} 
             image={currentBreedImg}
             title={currentBreed}
             onClick={reloadBreed}
             />
             <CardContent>
               <Typography
                 variant="body2"
                 align="center"
                 color="primary"
                 component="p"
                 >
                   {loading ? <span>Loading...</span> : currentBreed}
                   
               </Typography>
               
             </CardContent>
          </CardActionArea>
      </Card>
      )}
      <div>{loading && (<span>Loading...</span> )}</div>
      
    </div>
  );
}

export default DoggoApp;
