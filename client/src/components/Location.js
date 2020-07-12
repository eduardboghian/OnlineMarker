import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { judete } from '../utils/judete.json'
import '../css/Location.css'

export default function Location(props) {
  const [valid, setValid] = useState([])
  const [list, setList] = useState([])

  const searchLocation = (input) => {
    let validList = []
    if (input.length > 2) {
      judete.map(jud => {
        if (jud.localitati !== undefined) {
          jud.localitati.map(loc => {
            if (loc.nume.toLowerCase().includes(input.toLowerCase())) {
              validList.push(jud.nume + ', ' + loc.nume)
            }
          })
        }
      })
    }
    setList(validList)
  }

  return (
    <div>
      <Grid item xs={12} style={{ position: 'relative' }}>
        <TextField
          variant="outlined"
          required
          value={valid}
          fullWidth
          id="location"
          label="Orasul sau localitatea"
          name="location"
          onChange={e => {
            setValid(e.target.value)
            searchLocation(e.target.value)
            props.setNewProduct({ ...props.newProduct, [e.target.name]: e.target.value })
          }}
          autoComplete="price"
        />
        <div className="suggestions" style={list.length < 1 ? { display: 'none' } : {}}>
          {list.map((value, i) => {
            return <div key={i} onClick={e => {
              setValid(value)
              props.setNewProduct({ ...props.newProduct, 'location': value })
              setList([])
            }}> {value} </div>
          })}
        </div>
      </Grid>

    </div>
  )
}

