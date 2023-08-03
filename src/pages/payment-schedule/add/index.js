// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormRequisition from 'src/views/apps/payment-schedule/form'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
       
        <Grid item xs={12}>
          <FormRequisition />
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
