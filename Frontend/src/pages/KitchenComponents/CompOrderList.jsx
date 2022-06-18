import { styled } from '@mui/material/styles';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import CompButtonsKitchen from './CompButtonsKitchen';
import CompButtonsService from './CompButtonsService';
import { useState } from 'react';
import trueCooked from './trueCooked';
import falseCooked from './falseCooked';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 'bold' 
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      fontWeight: 'bold' 
    },
  }));

  export default function CompOrderList() {

    const [cooked,SetCooked]=useState(false)
    const [served,SetServed]=useState(false)


    const handleKitchen = () =>{
        console.log("Kitchen completed this dish")
        SetCooked(!cooked)
    }

    const handleService = () =>{
        console.log("Dish has been served to table")
        SetServed(!served)
    }
    return(
        <>
<h1> Receipt </h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, maxWidth: 900 }} align="center" aria-label="spanning table">
        <TableHead>
          <TableRow>
           
          </TableRow>
          <TableRow>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Table No.</StyledTableCell>
            <StyledTableCell align="right">Kitchen Send</StyledTableCell>
            <StyledTableCell align="right">Table Receive</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
            <TableRow >
              <TableCell>Yummy Pizza</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">Table 34 </TableCell>
              <TableCell align="right" handleKitchen={handleKitchen} cooked={cooked}>{cooked=== true? <trueCooked/> : <falseCooked />}</TableCell>
              <TableCell align="right" handleService={handleService} served={served}> <CompButtonsService/> </TableCell>

            </TableRow>
</TableBody>
</Table>
</TableContainer>
        </>
    )}