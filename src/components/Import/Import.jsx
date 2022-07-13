import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import InsertLink from '@mui/icons-material/InsertLink';
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Divider, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import "./Import.css"
import History from "./History";
import {InsertDriveFileRounded} from "@mui/icons-material";


function DropComponent(props){
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);



    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        accept: 'text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.oasis.opendocument.spreadsheet',
    });

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    function deleteFile(file){
        setFiles(files.filter(f => f !== file));
    }

    const thumbs = files.map(file => (
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: 'center', width: '100%'}}
             key={file.name}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                borderBottom: "1px solid ",
                borderColor: 'background.level3',
                width: "100%",
            }}>
                <Typography flex={"1 1 auto"} p={1}>{file.name}</Typography>
                <IconButton  onClick={() => deleteFile(file)} sx={{mr: 1, p: 1}} size={"sm"} color={"neutral"}>
                    <Close fontSize={"small"} sx={{color: "red"}}/>
                </IconButton>
            </Box>
            </Box>
        ));

    if(props.delete===true){
        files.length=0;
    }

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    if(files.length === 0){
        return(
            <Box className={"input-box"} {...getRootProps()}>
                <input {...getInputProps()} />
                <IconButton sx={{mb:1}} variant={"plain"} color={"neutral"} size={"lg"}>
                    <InsertDriveFileRounded color={"disabled"} />
                </IconButton>
                <Typography fontWeight={400} sx={{color: "#666666"}}>Déposez vos fichiers ici (csv, ods, xls, xlsx)</Typography>
            </Box>
        )
    } else {
        return(
            <Box>
                {thumbs}
            </Box>
        )
    }

}

export default function Import() {

    return (
        <Box sx={{p: 0.5}}>
            <Box>
                <Typography fontSize={"calc(10px + 3.3vmin)"} fontWeight={500}>Module d'import de fichiers</Typography>
                <Divider></Divider>
            </Box>
            <InputBox/>
            <History/>
        </Box>
    )
}



function InputBox() {
    const [deleted, setDeleted] = useState(false);
    const [table, setTable] = React.useState('');

    const handleChange = (event) => {
        setTable(event.target.value);
    };
    return (
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    py: 2,
                    mt: 2,
                    borderRadius: 'xs',
                }}
            >
                <Box
                    sx={{
                        border: '1px solid',
                        borderColor: 'background.level2',
                        alignSelf: 'center',
                        maxWidth: '100%',
                        minWidth: {xs: 220, sm: 360},
                        mx: 'auto',
                        boxShadow: 'sm',
                        borderRadius: 'md',
                        overflow: 'auto',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <FormControl fullWidth sx={{minWidth: "100px", mt: 3}}>
                            <InputLabel size={"small"}>Sélectionnez la table correspondante</InputLabel>
                            <Select
                                sx={{p:1}}
                                size={"small"}
                                required={true}
                                variant={"standard"}
                                color={"secondary"}
                                value={table}
                                label="Table"
                                onChange={handleChange}
                            >
                                    <MenuItem value={10}>Achats</MenuItem>
                                    <MenuItem value={20}>Factures</MenuItem>
                                    <MenuItem value={30}>Clients</MenuItem>
                                    <MenuItem value={40}>Fournisseurs</MenuItem>
                                    <MenuItem value={50}>Transactions bancaires</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Sheet
                        sx={{
                            borderWidth: '0 0 1px 0',
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid',
                            borderColor: 'background.level2',
                        }}
                    >
                    </Sheet>
                    <Sheet sx={{p: 2}}>
                        <Sheet
                            variant="outlined"
                            sx={{
                                borderRadius: 'md',
                                borderColor: 'background.level2',
                                bgcolor: 'background.level1',
                            }}
                        >
                            <AspectRatio className={"ratio"}>
                                <DropComponent delete={deleted}/>
                            </AspectRatio>
                            <Box
                                sx={{
                                    display: 'flex',
                                    p: 1.5,
                                    gap: 1.5,
                                    '& > button': {bgcolor: 'background.body'},
                                }}
                            >
                                <IconButton
                                    color="danger"
                                    variant="plain"
                                    size="sm"
                                    sx={{mr: 'auto'}}
                                    onClick={() => setDeleted(!deleted)}
                                >
                                    <Tooltip title={"Tout Supprimer"}>
                                        <Delete/>
                                    </Tooltip>
                                </IconButton>
                                <IconButton color="neutral" variant="outlined" size="sm">
                                    <InsertLink/>
                                </IconButton>
                            </Box>
                        </Sheet>
                    </Sheet>
                    <Sheet
                        sx={{
                            display: 'flex',
                            p: 2,
                            borderTop: '1px solid',
                            borderColor: 'background.level2',
                            gap: 1,
                        }}
                    >
                        <Button size="md">Importer</Button>
                    </Sheet>
                </Box>
            </Box>
    );
}
