// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

import { useRouter } from 'next/router'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


// ** Next Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { DataGrid, esES } from '@mui/x-data-grid'

import DialogAlert from 'src/views/components/dialogs/DialogAlert'

// ** Icon Imports

// ** Store Imports

import { Provider, useDispatch, useSelector } from 'react-redux'

import { getAllBranchOffice, getAllPeople, getAllWarehouse, getAllProducts, postRequesitions, postRequesitionsDetail, getAllProductsbyIdProvider, changeStatusReqById } from 'src/api/RequestApi'
import { deleteBranchOffice } from 'src/api/RequestApi'
import toast from 'react-hot-toast'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm, Controller } from 'react-hook-form'



// ** Data
import { top100Films } from 'src/@fake-db/autocomplete'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const router = useRouter()

  // ** States
  const [date, setDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [language, setLanguage] = useState([])
  const [productList, setProductList] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [warehouse, setWarehouse] = useState([])
  const [providerId, setProviderId] = useState('')
  const [count,setCount] = useState('')
  const [comments, setComments] = useState('')
  const [clienteSelected, setClienteSelected] = useState(null)
  const [tipoPagoSelected, setTipoPagoSelected] = useState(null)
  const [monto, setmonto] = useState(null)
  const [productSelected, setProductSelected] = useState('')
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [dataSell,setDataSell] = useState(null)
  const [cliente ,setCliente] = useState('')
  const [montoRecibido, setMontoRecibido] = useState(0)
  const [cambio, setCambio] = useState('')
  const [idVenta, setIdVenta] = useState(null)
  const [productos, setProductos] = useState([])
  const [recibo, setRecibo] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const clientes = [
    {
      id:1,
      nombre:'Alejandro Ortegón'
    },
    {
      id:2,
      nombre:'Luis Ramirez'
    },
  ]

  const tipoPago = [
    {
      id:1,
      nombre:'Efectivo'
    },
    {
      id:2,
      nombre:'Tarjeta'
    }, 
    {
      id:3,
      nombre:'Trasferencia'
    },
  ]

  let recibosFact = [
    {
      "id": 1,
      "idCliente": 15,
      "idSucursal": 1,
      "vendedor": "Ventas 1",
      "moneda": "MXN",
      "tipoCambio": null,
      "formaPago": "01",
      "metodopago": "PUE",
      "serie": "A",
      "folio": 1,
      "subtotal": 1000,
      "descuento": null,
      "total": 1160,
      "fecha": "2023-10-14T18:35:59",
      "estatus": "PAGADO",
      "idEstatus": null,
      "persona": {
        "nombre": "ADRIAN AGUILERA MORENO",
        "email": "proveedordeprueba2@gmail.com",
        "telefono": "9999222222",
        "sitioWeb": "proveedor2.com.mx",
        "idTipoPersona": 4,
        "tipoPersona": null,
        "idDatosFiscales": 4,
        "datosFiscales": {
          "razonSocial": "RAUL GUILLERMO CANTON",
          "rfc": "GUCR810827M40",
          "nombres": null,
          "apellidoPaterno": null,
          "apellidoMaterno": null,
          "calle": null,
          "numeroExterior": null,
          "numeroInterior": null,
          "cruzamientos": null,
          "domicilio": null,
          "colonia": null,
          "codigoPostal": 97137,
          "idEntidadFederativa": null,
          "regimenFiscal": "612",
          "usoCFDi": "G03",
          "email": "raulgmo@gmail.com",
          "entidadFederativa": null,
          "id": 4,
          "activo": true,
          "fechaCreacion": "2023-07-04T04:31:14",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        },
        "id": 15,
        "activo": true,
        "fechaCreacion": "2023-06-21T18:48:41",
        "fechaUltimaActualizacion": null,
        "usuarioCreaId": 1,
        "usuarioActualizaId": null,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "sucursal": {
        "nombre": "Mérida",
        "domicilio": "C57 # 343 x70 y 72 Centro",
        "telefono": "9994335363",
        "id": 1,
        "activo": true,
        "fechaCreacion": "2023-06-19T18:36:04",
        "fechaUltimaActualizacion": "2023-06-30T21:48:40",
        "usuarioCreaId": 1,
        "usuarioActualizaId": 1,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "conceptosVenta": [
        {
          "idVenta": 1,
          "idProducto": 1,
          "descripcion": "TURIN GRANILLO BCO CUBETA 6kg",
          "codigoInterno": "PP01",
          "unidadInterna": "PZA",
          "unidadSAT": "H87",
          "prodServCode": "12164501",
          "objImpuesto": "02",
          "cantidad": 1,
          "precioUnitario": 1000,
          "descuento": null,
          "total": 1000,
          "totalDescuento": null,
          "informacionAdicional": null,
          "idLote": null,
          "producto": null,
          "impuestos": [
            {
              "idConceptoVenta": 1,
              "tipoTasaCuota": "Fijo",
              "impuestoCode": "002",
              "tipoFactor": "Tasa",
              "tipoImpuesto": "T",
              "base": 1000,
              "tasaCuota": 0.16,
              "importe": 160,
              "id": 1,
              "activo": true,
              "fechaCreacion": "2023-10-17T21:56:37",
              "fechaUltimaActualizacion": null,
              "usuarioCreaId": 1,
              "usuarioActualizaId": null,
              "usuarioCrea": null,
              "usuarioActualiza": null
            }
          ],
          "id": 1,
          "activo": true,
          "fechaCreacion": "2023-10-17T21:48:37",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        }
      ]
    },
    {
      "id": 2,
      "idCliente": 15,
      "idSucursal": 1,
      "vendedor": "Ventas 1",
      "moneda": "MXN",
      "tipoCambio": null,
      "formaPago": "01",
      "metodopago": "PUE",
      "serie": "A",
      "folio": 2,
      "subtotal": 5000,
      "descuento": null,
      "total": 5800,
      "fecha": "2023-10-14T18:35:59",
      "estatus": "PAGADO",
      "idEstatus": null,
      "persona": {
        "nombre": "ADRIAN AGUILERA MORENO",
        "email": "proveedordeprueba2@gmail.com",
        "telefono": "9999222222",
        "sitioWeb": "proveedor2.com.mx",
        "idTipoPersona": 4,
        "tipoPersona": null,
        "idDatosFiscales": 4,
        "datosFiscales": {
          "razonSocial": "RAUL GUILLERMO CANTON",
          "rfc": "GUCR810827M40",
          "nombres": null,
          "apellidoPaterno": null,
          "apellidoMaterno": null,
          "calle": null,
          "numeroExterior": null,
          "numeroInterior": null,
          "cruzamientos": null,
          "domicilio": null,
          "colonia": null,
          "codigoPostal": 97137,
          "idEntidadFederativa": null,
          "regimenFiscal": "612",
          "usoCFDi": "G03",
          "email": "raulgmo@gmail.com",
          "entidadFederativa": null,
          "id": 4,
          "activo": true,
          "fechaCreacion": "2023-07-04T04:31:14",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        },
        "id": 15,
        "activo": true,
        "fechaCreacion": "2023-06-21T18:48:41",
        "fechaUltimaActualizacion": null,
        "usuarioCreaId": 1,
        "usuarioActualizaId": null,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "sucursal": {
        "nombre": "Mérida",
        "domicilio": "C57 # 343 x70 y 72 Centro",
        "telefono": "9994335363",
        "id": 1,
        "activo": true,
        "fechaCreacion": "2023-06-19T18:36:04",
        "fechaUltimaActualizacion": "2023-06-30T21:48:40",
        "usuarioCreaId": 1,
        "usuarioActualizaId": 1,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "conceptosVenta": [
        {
          "idVenta": 2,
          "idProducto": 1,
          "descripcion": "TURIN GRANILLO BCO CUBETA 6kg",
          "codigoInterno": "PP01",
          "unidadInterna": "PZA",
          "unidadSAT": "H87",
          "prodServCode": "12164501",
          "objImpuesto": "02",
          "cantidad": 5,
          "precioUnitario": 1000,
          "descuento": null,
          "total": 5000,
          "totalDescuento": null,
          "informacionAdicional": null,
          "idLote": null,
          "producto": null,
          "impuestos": [
            {
              "idConceptoVenta": 2,
              "tipoTasaCuota": "Fijo",
              "impuestoCode": "002",
              "tipoFactor": "Tasa",
              "tipoImpuesto": "T",
              "base": 5000,
              "tasaCuota": 0.16,
              "importe": 800,
              "id": 2,
              "activo": true,
              "fechaCreacion": "2023-10-17T21:56:37",
              "fechaUltimaActualizacion": null,
              "usuarioCreaId": 1,
              "usuarioActualizaId": null,
              "usuarioCrea": null,
              "usuarioActualiza": null
            }
          ],
          "id": 2,
          "activo": true,
          "fechaCreacion": "2023-10-17T21:48:37",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        }
      ]
    },
    {
      "id": 3,
      "idCliente": 15,
      "idSucursal": 1,
      "vendedor": "Ventas 1",
      "moneda": "MXN",
      "tipoCambio": null,
      "formaPago": "01",
      "metodopago": "PUE",
      "serie": "A",
      "folio": 2,
      "subtotal": 10000,
      "descuento": null,
      "total": 11600,
      "fecha": "2023-10-14T18:35:59",
      "estatus": "PAGADO",
      "idEstatus": null,
      "persona": {
        "nombre": "ADRIAN AGUILERA MORENO",
        "email": "proveedordeprueba2@gmail.com",
        "telefono": "9999222222",
        "sitioWeb": "proveedor2.com.mx",
        "idTipoPersona": 4,
        "tipoPersona": null,
        "idDatosFiscales": 4,
        "datosFiscales": {
          "razonSocial": "RAUL GUILLERMO CANTON",
          "rfc": "GUCR810827M40",
          "nombres": null,
          "apellidoPaterno": null,
          "apellidoMaterno": null,
          "calle": null,
          "numeroExterior": null,
          "numeroInterior": null,
          "cruzamientos": null,
          "domicilio": null,
          "colonia": null,
          "codigoPostal": 97137,
          "idEntidadFederativa": null,
          "regimenFiscal": "612",
          "usoCFDi": "G03",
          "email": "raulgmo@gmail.com",
          "entidadFederativa": null,
          "id": 4,
          "activo": true,
          "fechaCreacion": "2023-07-04T04:31:14",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        },
        "id": 15,
        "activo": true,
        "fechaCreacion": "2023-06-21T18:48:41",
        "fechaUltimaActualizacion": null,
        "usuarioCreaId": 1,
        "usuarioActualizaId": null,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "sucursal": {
        "nombre": "Mérida",
        "domicilio": "C57 # 343 x70 y 72 Centro",
        "telefono": "9994335363",
        "id": 1,
        "activo": true,
        "fechaCreacion": "2023-06-19T18:36:04",
        "fechaUltimaActualizacion": "2023-06-30T21:48:40",
        "usuarioCreaId": 1,
        "usuarioActualizaId": 1,
        "usuarioCrea": null,
        "usuarioActualiza": null
      },
      "conceptosVenta": [
        {
          "idVenta": 3,
          "idProducto": 1,
          "descripcion": "AZÚCAR ESTANDAR SACO 25Kg",
          "codigoInterno": "PP02",
          "unidadInterna": "PZA",
          "unidadSAT": "H87",
          "prodServCode": "50161509",
          "objImpuesto": "02",
          "cantidad": 3,
          "precioUnitario": 2000,
          "descuento": null,
          "total": 6000,
          "totalDescuento": null,
          "informacionAdicional": null,
          "idLote": null,
          "producto": null,
          "impuestos": [
            {
              "idConceptoVenta": 3,
              "tipoTasaCuota": "Fijo",
              "impuestoCode": "002",
              "tipoFactor": "Tasa",
              "tipoImpuesto": "T",
              "base": 6000,
              "tasaCuota": 0.16,
              "importe": 960,
              "id": 3,
              "activo": true,
              "fechaCreacion": "2023-10-17T21:56:37",
              "fechaUltimaActualizacion": null,
              "usuarioCreaId": 1,
              "usuarioActualizaId": null,
              "usuarioCrea": null,
              "usuarioActualiza": null
            }
          ],
          "id": 3,
          "activo": true,
          "fechaCreacion": "2023-10-17T21:48:37",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        },
        {
          "idVenta": 3,
          "idProducto": 1,
          "descripcion": "BATIDORA ARTISAN AGUAMA 4.7Lt KSM150PSAQ",
          "codigoInterno": "PP03",
          "unidadInterna": "PZA",
          "unidadSAT": "H87",
          "prodServCode": "50161509",
          "objImpuesto": "02",
          "cantidad": 1,
          "precioUnitario": 4000,
          "descuento": null,
          "total": 4000,
          "totalDescuento": null,
          "informacionAdicional": null,
          "idLote": null,
          "producto": null,
          "impuestos": [
            {
              "idConceptoVenta": 4,
              "tipoTasaCuota": "Fijo",
              "impuestoCode": "002",
              "tipoFactor": "Tasa",
              "tipoImpuesto": "T",
              "base": 4000,
              "tasaCuota": 0.16,
              "importe": 640,
              "id": 4,
              "activo": true,
              "fechaCreacion": "2023-10-17T21:56:37",
              "fechaUltimaActualizacion": null,
              "usuarioCreaId": 1,
              "usuarioActualizaId": null,
              "usuarioCrea": null,
              "usuarioActualiza": null
            }
          ],
          "id": 4,
          "activo": true,
          "fechaCreacion": "2023-10-17T21:48:37",
          "fechaUltimaActualizacion": null,
          "usuarioCreaId": 1,
          "usuarioActualizaId": null,
          "usuarioCrea": null,
          "usuarioActualiza": null
        }
      ]
    }
  ]

  useEffect(()=>{
    if(router.query.id){
        getRecibo(parseInt(router.query.id))
    }

  },[router.query.id])


  const getRecibo = (id) => {
    let registro = recibosFact.find(reg => reg.id == id)
    console.log("🚀 ~ file: formView.js:551 ~ getRecibo ~ registro:", registro.conceptosVenta)
    setRecibo(registro)

    setProductos(registro.conceptosVenta)
    
    // setProductList(dataSell.conceptosVenta)
  }
  

  const getPeople =  async() =>{
    try {
      setLoading(true)
        const response = await getAllPeople()
        if(response.status === 200){
          
          const proveedores = response.data.filter(e=>e.tipoPersona.nombre ==='PROVEEDOR')
          
          setProviders(proveedores)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = dates => {
   console.log(dates)
   setStartDate(dates)
  }

  const getWarehouse =  async() =>{
    try {
      setLoading(true)
        const response = await getAllWarehouse()
        if(response.status === 200){
          setWarehouse(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getbranchOffices =  async() =>{

  }

  const columns = [
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 450,
      field: 'descripcion',
      headerName: 'Nombre',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.descripcion}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    // {
    //   flex: 0.25,
    //   width: 300,
    //   minWidth: 300,
    //   maxWidth: 450,
    //   field: 'proveedor',
    //   headerName: 'Proveedor',
    //   renderCell: ({ row }) => {
  
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
    //           <Typography
    //             noWrap
    //             sx={{
    //               fontWeight: 500,
    //               textDecoration: 'none',
    //               color: 'text.secondary',
    //               '&:hover': { color: 'primary.main' }
    //             }}
    //           >
    //             {row.proveedor}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.25,
      width: 300,
      minWidth: 300,
      maxWidth: 300,
      field: 'cantidad',
      headerName: 'Cantidad',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.cantidad}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
    {
      flex: 0.25,
      width: 200,
      minWidth: 200,
      maxWidth: 200,
      field: 'precio',
      headerName: 'Precio',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row.precioUnitario}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, 
    {
        flex: 0.25,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        field: 'total',
        headerName: 'Total',
        renderCell: ({ row }) => {
    
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {row.total}
                </Typography>
              </Box>
            </Box>
          )
        }
      }, 

    

  ]

  const getProductsbyProvider =  async(id) =>{
    try {
      setLoading(true)
        const response = await getAllProductsbyIdProvider(id)
        if(response.status === 200){
          console.log(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProductsProvider =  async() =>{
    try {
      setLoading(true)
        const response = await getAllProducts()
        if(response.status === 200){
          setProducts(response.data)
          setLoading(false)

        }
        
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllProductsProvider()
  },[])

//   useEffect(()=>{
//     totalProductos(productList)
//   },[productList])

//   const totalProductos = (productList)=>{
//     let totaIndividual = 0

//   let total = productList.forEach(element => {
//     totaIndividual+= (element.precio*element.cantidad)
//     });
//     setTotal(0)
//   }


  useEffect(()=>{
    if(router.query.id){
      getSellData(router.query.id)
      setIdVenta(router.query.id)
    }
  },[router.query])

  useEffect(()=>{
    if(montoRecibido > total){
      requiereCambio()
    }else{
      setCambio('N/A')
    }
  },[total])

  const requiereCambio = () =>{
    
    setCambio((montoRecibido - total).toFixed(2))
  }

  const addProductsToList = (data)=>{


    const product = {
      id: data?.idProducto,
      nombre: data?.producto?.nombre,
      cantidad: parseInt(count),
      precio:data?.producto?.precios[0]?.monto,
      idProveedor:data?.idProveedor,
      proveedor:data?.proveedor?.nombre
    }
    const found = productList.some(el => el.id === data.id);

    if(found){
      setCount('')
      setProductSelected('')
      setProviderId('')
      let products = [...productList]
      let index = products.findIndex( el => el.id === data.producto.id )
      products[index].cantidad+= parseInt(count)
      setProductList(products)  
    }else{
      setProductList((old)=> [...old, product])
      setCount('')
      setProductSelected('')
      setProviderId('')
    }
  }


  const getSellData = (id)=>{
    let listaFiltrada = JSON.parse(localStorage.getItem('puntoVenta')) || []
    let listaF = listaFiltrada.find(e => e.id == id)
    setDataSell(listaF)

   let cliente= clientes.find(e=> e.nombre == listaF.cliente)
   setProductList(listaF.productos)
   setClienteSelected(listaF.cliente)
   setMontoRecibido(listaF.montoRecibido)
  }

  const RowOptions = ({ id, data }) => {
    // ** Hooks
    const dispatch = useDispatch()
  
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)
  
  
  
    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
  
   
  
    const handleDelete = () => {

      const objWithIdIndex = productList.findIndex((obj) => obj.id === data.id);
      const newArry = [...productList]
      newArry.splice(objWithIdIndex, 1);
      setProductList(newArry)
        }

     
  
    // const getTyperPersons =  async() =>{
    //   try {
    //       const response = await getAllTyperPersons()
    //       if(response.status === 200){
    //         console.log(response.data)
    //         setTypePersons(response.data)
  
    //       }
          
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    
  
    return (
      <>
       <Button size='medium' sx={{ mr: 2}} onClick={handleDelete}>
       <Icon icon='tabler:trash' fontSize={20} />
            Eliminar
          </Button>
     
      </>
    )
  }
  




  const handleChangeSucursal = (event, newValue) => {
  }

  const onSubmit = async(data) =>{

    let number= Math.floor(Math.random() *200)

    let arrayJson = []

    let dataJson = {
      id:number ,
      fecha: new Date().toLocaleDateString('es-MX'),
      cliente: clienteSelected,
      vendedor: 'Administrador',
      monto: (total.toFixed(2)),
      montoRecibido: montoRecibido,
      cambio:cambio,
      tipoPago: tipoPagoSelected.nombre,
      fechaCobro: new Date().toLocaleDateString('es-MX'),
      estado:'cobrado',
      productos:productList,
    }



    let listaPorCobrar = localStorage.getItem("puntoVenta");
   
      let actualizarDatos = JSON.parse(listaPorCobrar)
      let listaActulizar = actualizarDatos.findIndex(e => e.id == idVenta)     
      actualizarDatos[listaActulizar] = dataJson
      localStorage.setItem('puntoVenta',JSON.stringify(actualizarDatos) )


    toast.success('Cobro realizado con éxito')
    router.push('/point-of-sale')

  }





  const defaultValues = {
    cometnarios: '',

  }

  const {
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })


  return (
    <>
    <Card>
      <CardHeader title='Visualizar recibo de venta' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
         
         
           
           
            <Grid item xs={12} sm={6}>
            <TextField fullWidth name='cliente'  value={'ADRIAN AGUILERA MORENO'}  label='Cliente' InputProps={{
          readOnly:true
          }} />
            </Grid>
         
          <Grid item xs={12} sm={6}>
              <TextField required fullWidth name='rfc'  value={'GUCR810827M40'}  label='RFC' InputProps={{
          readOnly:true
          }} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField value={'Efectivo'} fullWidth name='tipo' InputProps={{readOnly: true,}} label='Tipo de pago' />

            </Grid>
    
            <Grid item xs={12} sm={12}>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={productos}
              columns={columns}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
            </Grid>
            <Grid item xs={12} sm={12} sx={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end', flexDirection:'column', mt:'-30px'}}>
              <h2>Total:</h2>
              <h2 style={{marginTop:'-15px'}} >$ {recibo?.subtotal.toFixed(2)}</h2>
            </Grid>
          </Grid>
        
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions style={{display:'flex', justifyContent:'flex-end'}}>
          <Button onClick={()=> router.push('/billing')} size='large' variant='outlined'>
            Regresar
          </Button>
      
        </CardActions>
      </form>
    </Card>
        </>
  )
  
}

export default FormLayoutsSeparator
