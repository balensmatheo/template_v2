import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import InsertLink from '@mui/icons-material/InsertLink';
import Crop from '@mui/icons-material/Crop';
import {Input} from "@mui/joy";
import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Divider} from "@mui/material";
import {HistoryRounded} from "@mui/icons-material";
import "./Import.css"

function DropComponent(){
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        accept: "application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-excel, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);



    const thumbs = files.map(file => (
        <div key={file.name}>
            <img
                src={file.preview}
                alt={file.name}
            />
        </div>
    ));
    return (
        <Box className={"input-box"} {...getRootProps()}>
            <input {...getInputProps()} />
                <Typography className={"input-box"}>Déposez vos fichiers ici</Typography>
            <aside>
                {thumbs}
            </aside>
        </Box>
    )
}

export default function Import() {
    return (
        <Box sx={{p: 0.5}}>
            <Box>
                <Typography fontSize={"22pt"} fontWeight={700}>Module d'import de fichiers</Typography>
                <Divider></Divider>
            </Box>
            <InputBox/>
            <History/>
        </Box>
    )
}

function History(){
    return (
        <Box sx={{
            display: 'flex',
            width: "100%",
            mt: 2,
            borderRadius: 'xs'
        }}>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'background.level2',
                    boxShadow: 'sm',
                    width: "100%",
                    borderRadius: 'md',
                    overflow: 'auto',
                }}
            >
                <Sheet sx={{
                    borderWidth: '0 0 1px 0',
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'background.level2',
                }}>
                    <Typography startDecorator={<HistoryRounded sx={{mb:.5, mr: .5, color:"rgba(97,97,97,0.85)"}}/>} sx={{color: "rgba(97,97,97,0.85)"}} fontWeight={600} level={"h5"} variant={"plain"} >
                        Historique
                    </Typography>
                </Sheet>
                <Sheet sx={{
                    display: 'flex',
                    p: 2,
                }}>
                    <Typography sx={{color:"rgba(95,95,95,0.8)"}} >Documents importés précédemment : </Typography>
                </Sheet>
            </Box>

        </Box>
    )
}

function InputBox() {
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
                        <Typography level="h2" fontSize="md">
                            Importez les documents (csv, excel)
                        </Typography>
                    </Sheet>
                    <Sheet sx={{p: 2}}>
                        <Sheet
                            variant="outlined"
                            sx={{
                                borderRadius: 'md',
                                overflow: 'auto',
                                borderColor: 'background.level2',
                                bgcolor: 'background.level1',
                            }}
                        >
                            <AspectRatio className={"ratio"}>
                                <DropComponent/>
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
                                >
                                    <Delete/>
                                </IconButton>
                                <IconButton color="neutral" variant="outlined" size="sm">
                                    <Download/>
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
                        <Button size="md">Upload</Button>
                    </Sheet>
                </Box>
            </Box>
    );
}
