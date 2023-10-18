// ** React Imports
import { Fragment, forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DatePicker from 'react-datepicker'
import Box from '@mui/material/Box'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Grid from '@mui/material/Grid'
import es from 'date-fns/locale/es'
import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DialogAlert = ({open = false, handleClose, onConfirm, title = '', content= '', informacionVenta= null }) => {

  // ** State
  const [startDate, setStartDate] = useState(null)
  const [responsableSelected, setResponsableSelected] = useState(null)
  const [usoCFDISelected, setUsoCFDISelected]= useState(informacionVenta.persona.datosFiscales.usoCFDi || null)
  const [regimenSelected, setRegimenSelected]= useState(informacionVenta.persona.datosFiscales.regimenFiscal || null)
  const [rfc , setRfc] = useState(informacionVenta.persona.datosFiscales.rfc || null)
  const [razonSocial, setRazonSocial] = useState(informacionVenta.persona.datosFiscales.razonSocial || null)

  const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de entrega' autoComplete='off' />
  })

  
  const handleOnChange = dates => {
    console.log(dates)
    setStartDate(dates)
   }
   
   useEffect(()=>{
    console.log(informacionVenta)
   },[])
   
   const regimen = [
    {
      "id": "601",
      "descripcion": "General de Ley Personas Morales",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "603",
      "descripcion": "Personas Morales con Fines no Lucrativos",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "605",
      "descripcion": "Sueldos y Salarios e Ingresos Asimilados a Salarios",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "606",
      "descripcion": "Arrendamiento",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "607",
      "descripcion": "Régimen de Enajenación o Adquisición de Bienes",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "608",
      "descripcion": "Demás ingresos",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "609",
      "descripcion": "Consolidación",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": "31-12-2019"
    },
    {
      "id": "610",
      "descripcion": "Residentes en el Extranjero sin Establecimiento Permanente en México",
      "fisica": "Sí",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "611",
      "descripcion": "Ingresos por Dividendos (socios y accionistas)",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "612",
      "descripcion": "Personas Físicas con Actividades Empresariales y Profesionales",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "614",
      "descripcion": "Ingresos por intereses",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "615",
      "descripcion": "Régimen de los ingresos por obtención de premios",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "616",
      "descripcion": "Sin obligaciones fiscales",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "620",
      "descripcion": "Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "621",
      "descripcion": "Incorporación Fiscal",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "622",
      "descripcion": "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "623",
      "descripcion": "Opcional para Grupos de Sociedades",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "624",
      "descripcion": "Coordinados",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "12-11-2016",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "625",
      "descripcion": "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "01-06-2020",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "626",
      "descripcion": "Régimen Simplificado de Confianza",
      "fisica": "Sí",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "01-01-2022",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "628",
      "descripcion": "Hidrocarburos",
      "fisica": "No",
      "moral": "Sí",
      "fechaDeInicioDeVigencia": "01-01-2024",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "629",
      "descripcion": "De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "01-01-2024",
      "fechaDeFinDeVigencia": ""
    },
    {
      "id": "630",
      "descripcion": "Enajenación de acciones en bolsa de valores",
      "fisica": "Sí",
      "moral": "No",
      "fechaDeInicioDeVigencia": "01-01-2024",
      "fechaDeFinDeVigencia": ""
    }
  ]

  const usoCFDI = [
    {
      "id": "G01",
      "descripcion": "Adquisición de mercancías",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "G02",
      "descripcion": "Devoluciones, descuentos o bonificaciones",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "G03",
      "descripcion": "Gastos en general",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I01",
      "descripcion": "Construcciones",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I02",
      "descripcion": "Mobiliario y equipo de oficina por inversiones",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I03",
      "descripcion": "Equipo de transporte",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I04",
      "descripcion": "Equipo de computo y accesorios",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I05",
      "descripcion": "Dados, troqueles, moldes, matrices y herramental",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I06",
      "descripcion": "Comunicaciones telefónicas",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I07",
      "descripcion": "Comunicaciones satelitales",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "I08",
      "descripcion": "Otra maquinaria y equipo",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D01",
      "descripcion": "Honorarios médicos, dentales y gastos hospitalarios.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D02",
      "descripcion": "Gastos médicos por incapacidad o discapacidad",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D03",
      "descripcion": "Gastos funerales.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D04",
      "descripcion": "Donativos.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D05",
      "descripcion": "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación).",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D06",
      "descripcion": "Aportaciones voluntarias al SAR.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D07",
      "descripcion": "Primas por seguros de gastos médicos.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D08",
      "descripcion": "Gastos de transportación escolar obligatoria.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D09",
      "descripcion": "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones.",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "D10",
      "descripcion": "Pagos por servicios educativos (colegiaturas)",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "No",
      "fechaInicioDeVigencia": "01-01-2017",
      "fechaFinDeVigencia": ""
    },
    {
      "id": "P01",
      "descripcion": "Por definir",
      "aplicaParaTipoPersonaFisica": "Sí",
      "aplicaParaTipoPersonaMoral": "Sí",
      "fechaInicioDeVigencia": "31-03-2017",
      "fechaFinDeVigencia": "31-03-2023"
    }
  ]

   const handleConfirm =()=>{
    
    let data = {
      rfc,
      id: informacionVenta.id,
      razonSocial: razonSocial,
      usoCFDI: usoCFDISelected,
      regimen: regimenSelected,
    }

    // console.log(data)
    
      onConfirm(data)
   }

  return (   
    <Dialog
    maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
        <DialogContentText sx={{ mb: 4, width:380 }} >
          </DialogContentText>
        <Grid item xs={12} sm={12}>
        <Grid container spacing={5}>
        <Grid item xs={12} sm={12} sx={{mb:4}}>
        <TextField readOnly 
        onChange={(e, data) =>{
          setRfc(data)
        }}
        required value={informacionVenta.persona.datosFiscales.rfc || ''} fullWidth name='RFC'  label='RFC' InputProps={{
          }} />
        </Grid>
        {/* <Grid item xs={12} sm={4}>
            <FormControlLabel required control={<Checkbox />} label="Desbloquear" />
        </Grid> */}
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} sx={{mb:4}}>
        <Autocomplete
                value={usoCFDI.find((reg) => reg.id == informacionVenta.persona.datosFiscales.usoCFDi || '')}
                onChange={(e, data) =>{
                  setUsoCFDISelected(data.id)
                }}
                options={usoCFDI}
                id='autocomplete-outlined'
                getOptionLabel={option => {
                  return ` ${option?.id}-${option?.descripcion}` || ''
                }}
                renderInput={params => <TextField {...params}  label='Regimen' />}
            />
        </Grid>
        <Grid item xs={12} sm={12} sx={{mb:4}}>
        <Autocomplete
                value={regimen.find((reg) => reg.id == informacionVenta.persona.datosFiscales.regimenFiscal || '')}
                onChange={(e, data) =>{
                  setRegimenSelected(data.id)
                }}
                options={regimen}
                id='autocomplete-outlined'
                getOptionLabel={option => option?.descripcion || ''}
                renderInput={params => <TextField {...params}  label='Regimen' />}
            />
        </Grid>
        <Grid item xs={12} sm={12} sx={{mb:4}}>
        <TextField required fullWidth readOnly name='Razon social'
        onChange={(e, data) =>{
          setRazonSocial(data)
        }}
        value={informacionVenta.persona.datosFiscales.razonSocial || ''}  label='Razon social' InputProps={{
          }} />
        </Grid>

        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
         <Button  onClick={handleConfirm}>Facturar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>     
  )
}

export default DialogAlert
