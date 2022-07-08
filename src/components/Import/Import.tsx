import {styled} from "@mui/joy/styles";
import {Divider, IconButton, Stack, Box} from "@mui/material";
import {Button} from "@mui/joy";
import {PhotoCamera, UploadFileRounded} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import {minWidth} from "@mui/system";

const Input = styled('input')({
    display: 'none',
});

export default function Import() {
    return (
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'column', p: ".5rem"}}>
                <Typography variant={"plain"} fontSize={"18pt"}>
                    Module d'import
                </Typography>
                <Divider/>
            </Box>
            <Box sx={{display: 'flex', width: "110px", minWidth: "110px", flexDirection: 'column', p: ".5rem"}}>
                <label htmlFor="contained-button-file">
                    <Input id="contained-button-file" multiple type="file" />
                    <Button startIcon={<UploadFileRounded />} color={"primary"} variant="soft" size={"md"} component="span">
                        Importer
                    </Button>
                </label>
            </Box>
        </Box>
    );
}
