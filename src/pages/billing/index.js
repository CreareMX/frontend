// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, esES } from '@mui/x-data-grid'
import Select from '@mui/material/Select'
import DialogAlert from 'src/views/components/dialogs/DialogBilling'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/billing/TableHeader'
import AddUserDrawer from 'src/views/apps/branch-office/AddbranchOfficeDrawer'
import SidebarEditPeople from 'src/views/apps/branch-office/EditBranchOffice'
import { getAllVentas } from 'src/api/RequestApi'
import { deleteBranchOffice } from 'src/api/RequestApi'
import toast from 'react-hot-toast'




const PersonsType = ({ apiData }) => {

  const router = useRouter()

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [typePersons, setTypePersons] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [nombre,setNombre] = useState('')
  const [currentPerson, setCurrentPerson] = useState({})
  const [id,setId] = useState(null)
  const [cotizacionesLista,setCotizacionesLista] = useState([])
  const [listaPuntoDeVenta,setlListaPuntoDeVenta] = useState([])
  const [idPedido,setIdPedido] = useState(null)
  const [informacionVenta, SetInformacionVenta] = useState(null)


   useEffect(()=>{
    llenarLista()
   },[])


 
   

   const llenarLista = ()=>{
    let listaFiltrada = JSON.parse(localStorage.getItem('recibosFac')) || []
    setCotizacionesLista(listaFiltrada)
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
  
   
  
    const handleEdit = (id) => {
      router.push('purchase-orders/[id]', `purchase-orders/${id}`);

    }

    const rechazarOC = async(id) =>{
      try {
       const response = await changeStatusReqById(id,10,1)
       if(response.status === 200){
         toast.success('Requisición rechazada correctamente')
         getVentas()
       }
       
    } catch (error) {
     console.log(error)
    }
    }
    
    const visualizar = () =>{
      router.push(`billing/view/${data.id}`);
    }
  
    // const getVentas =  async() =>{
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
       <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >      
            <MenuItem onClick={()=>{
              visualizar()
    }}
               sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='tabler:eye' fontSize={20} />
              Visualizar
            </MenuItem>
             {
              data.estatus != 'FACTURADO' && 
              <MenuItem onClick={()=>{
                setIdPedido(data.id)
                setOpenModal(true)
                SetInformacionVenta(data)
                }}
                 sx={{ '& svg': { mr: 2 } }}>
                <Icon icon='streamline:money-cash-bill-2-currency-billing-payment-finance-cash-bill-money-accounting' fontSize={20} />
                Facturar
              </MenuItem>
             }
             
            {/* <MenuItem onClick={()=>{
              setIdPedido(data.id)
              setOpenModal(true)
              }}
               sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='material-symbols:download' fontSize={20} />
              Descargar XML
            </MenuItem>
            <MenuItem onClick={()=>{
              setIdPedido(data.id)
              setOpenModal(true)
              }}
               sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='material-symbols:download' fontSize={20} />
              Descargar PDF
            </MenuItem>
            <MenuItem onClick={()=>{
              setIdPedido(data.id)
              setOpenModal(true)
              }}
               sx={{ '& svg': { mr: 2 } }}>
              <Icon icon='icon-park-outline:send-email' fontSize={20} />
              Enviar por correo
            </MenuItem>
            <MenuItem onClick={()=>{
            cancelar(data.id)
            }}
             sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:file-cancel-outline' fontSize={20} />
            Cancelar
          </MenuItem> */}
          
        </Menu>
      </>
    )
  }
  


  const columns = [
    {
      flex: 0.25,
      minWidth: 80,
      maxWidth:100,
      field: 'id',
      headerName: 'Id',
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
                {row.id}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    // {
    //   flex: 0.25,
    //   minWidth: 100,
    //   field: 'Recibo',
    //   headerName: 'recibo',
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
    //             {row.recibo}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'cliente',
      headerName: 'Cliente',
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
                {row.persona.nombre}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 100,
      field: 'Total',
      headerName: 'total',
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
                {row.total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'fecha',
      headerName: 'Fecha',
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
                {new Date(row.fecha).toLocaleDateString('es-MX')}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      maxWidth: 150,
      field: 'estado',
      headerName: 'Estado',
      renderCell: ({ row }) => {
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.estatus == 'PAGADO' ? 'Pendiente' : 'Facturado'}
          color={row.estatus == 'PAGADO' ? 'info'  : 'success'}
          sx={{ textTransform: 'uppercase' }}
        />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 200,
      sortable: false,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: ({ row }) => <RowOptions data={row} id={row.id} />
    }
  ]


  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  


  const getVentas =  async() =>{
    // try {
    //   setLoading(true)
    //     const response = await getAllVentas()
    //     if(response.status === 200){
    //       console.log(response.data)
    //       setlListaPuntoDeVenta(response.data)
    //       setCotizacionesLista(response.data)
    //       setLoading(false)

    //     }
        
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const facturar = async(data) =>{
    let lista = [...cotizacionesLista]
    
    let objWithIdIndex = lista.findIndex((obj) => obj.id == data.id);

    lista[objWithIdIndex].estatus = 'FACTURADO'

    JSON.stringify(localStorage.setItem('recibosFac', JSON.stringify(lista) ))
    setCotizacionesLista(lista)
    toast.success('Facturación con éxito')
    llenarLista()
}

const cancelar = async(id) =>{
  let lista = [...listaPuntoDeVenta]
  let objWithIdIndex = lista.findIndex((obj) => obj.id === id);
  lista[objWithIdIndex].estatus = 'FACTURADO'

  JSON.stringify(localStorage.setItem('puntoVenta', JSON.stringify(lista) ))
  setCotizacionesLista(lista)
  toast.success('Pedido cancelado con éxito')
  llenarLista()
}


  
  const handleDelete = async(data) => {
    setOpenModal(false)
    
    facturar(data)
    
  }

  // useEffect(() => {
  //   getVentas()
  // },[]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen)

  const sucessSubmit = () =>{
    getVentas()
  }

  const closeModal = () =>{
      setOpenModal(false)
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={cotizacionesLista}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
            disableRowSelectionOnClick
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} sucess={sucessSubmit} toggle={toggleAddUserDrawer} />
      <SidebarEditPeople open={editUserOpen} sucess={sucessSubmit} editPerson={currentPerson} toggle={toggleEditUserDrawer} />

      { openModal &&
       <DatePickerWrapper>
       <DialogAlert open={openModal} title={'Facturar'} content={'Esta acción no se puede revertir'} onConfirm={handleDelete} handleClose={closeModal} informacionVenta={informacionVenta}/> 
       </DatePickerWrapper>
        }
    </Grid>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData = res.data

  return {
    props: {
      apiData
    }
  }
}

export default PersonsType
