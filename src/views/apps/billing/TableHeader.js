// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, InputLabel, Autocomplete } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  const router = useRouter()

  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* <Button color='secondary' variant='outlined' startIcon={<Icon icon='tabler:upload' />}>
        Export
      </Button> */}
      <Typography
                noWrap
                sx={{
                  fontSize:'22px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Facturar
              </Typography>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* <FormControl size='small' sx={{ mr: 4, width:'auto' }}>
                  <InputLabel id='role-select'>Estado</InputLabel>
                  <Select

                    id='select-role'
                    label='Estado'
                    labelId='role-select'
                    inputProps={{ placeholder: 'Estado' }}
                  >
                    <MenuItem value='1'>Pendiente</MenuItem>
                    <MenuItem value='2'>Facturado</MenuItem>
                    <MenuItem value='3'>Cancelado</MenuItem>
                  </Select>
                </FormControl> */}
                {/* <Autocomplete
                size='small'
                sx={{minWidth:170, mr:4}}
                options={['Pendiente','Facturado', 'Cancelado']}
                id='autocomplete-outlined'
                getOptionLabel={option => option }
                renderInput={params => <TextField {...params}  label='Estado' />}
            /> */}
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4 }}
          placeholder='Buscar'
          onChange={e => handleFilter(e.target.value)}
        />

      
      </Box>
    </Box>
  )
}

export default TableHeader
