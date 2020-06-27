import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { judete } from '../utils/judete.json'

export default function Location() {
  const [valid, setValid] = useState([])
  const [list, setList] = useState([])

  const searchLocation = (input) => {
    setValid(input)

    let newList = judete.filter(judet => judet.localitati.includes(input))
    setList(newList)
    console.log(list)
  }

  return (
    <div>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="location"
          label="Orasul sau localitatea"
          name="location"
          onChange={e => { searchLocation(e.target.value) }}
          autoComplete="price"
        />
        <div className="suggestions">
          {list.map(judet => {
            judet.localitati.map(localitate => {
              return <div> {judet.nume}, {localitate.nume} </div>
            })
          })}
        </div>
      </Grid>

    </div>
  )
}

