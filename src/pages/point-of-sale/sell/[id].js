// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import Form from 'src/views/apps/point-of-sale/form'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
       
        <Grid item xs={12}>
          <Form />
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export const getStaticPaths = async () => {


  let listaFiltrada = JSON.parse(localStorage.getItem('puntoVenta')) || []

  const paths = listaFiltrada.map(item => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: true
  }
}

export default FormLayouts
