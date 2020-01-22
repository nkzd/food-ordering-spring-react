import React,{useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";

const BasketItem = () => {
    return(
        <div>
        <Divider light/>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {/*First row */}
                <Grid 
                    item 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Typography>
                            Ime artikla
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            X
                        </Typography>
                    </Grid>
                    
                </Grid>
                {/*Second row */}
                <Grid 
                    item 
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Typography>
                            Broj
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Cijena: 50
                        </Typography>
                    </Grid>

                </Grid>

            </Grid>
            <Divider light/>
         </div>
    )
}

export default BasketItem;