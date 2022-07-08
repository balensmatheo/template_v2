import {Box, Chip} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {Divider} from "@mui/material";


export default function Infos() {
  return (
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Box sx={{mb: "1em"}}>
              <Typography fontSize={"22pt"}>Informations sur le développement</Typography>
              <Divider/>
          </Box>
          <Box display={'flex'} sx={{flexDirection: 'row'}}>
              <Chip size={"sm"} variant={"plain"}>07.07.2022</Chip>
              <Typography>Début du développement de la maquette</Typography>
          </Box>
      </Box>
  );
}

