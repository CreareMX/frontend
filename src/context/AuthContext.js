// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

import { postLogin } from 'src/api/AuthApi'

import axios from 'axios'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const baseUrl = process.env.NEXT_PUBLIC_API

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      // const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      // if (storedToken) {
      //   setLoading(true)
      //   await axios
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         Authorization: storedToken
      //       }
      //     })
      //     .then(async response => {
      //       setLoading(false)
      //       setUser({ ...response.data.userData })
      //     })
      //     .catch(() => {
      //       localStorage.removeItem('userData')
      //       localStorage.removeItem('refreshToken')
      //       localStorage.removeItem('accessToken')
      //       setUser(null)
      //       setLoading(false)
      //       if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      //         router.replace('/login')
      //       }
      //     })
      // } else {
      //   setLoading(false)
      // }

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {

        let dataUser = {
          id: 1,
          role: 'admin',
          fullName: 'Admin Mayoreo',
          username: 'admninMayoreo',
          email: 'admin@mayoreo.com',
        }
        setUser(dataUser)
      
        window.localStorage.setItem('userData', JSON.stringify(dataUser))

       setLoading(false)
      }else{
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        setLoading(false)
        setUser(null)
        router.replace('/login')
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleLogin = async(params, errorCallback) => {

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl
    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     router.replace(redirectURL)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     if (errorCallback) errorCallback(err)
    //   })

    try {
    const response = await postLogin(params)
    let date = new Date().toLocaleDateString('es-MX')

    let dataUser = {
      id: 1,
      role: 'admin',
      fullName: 'Admin Mayoreo',
      username: 'admninMayoreo',
      email: 'admin@mayoreo.com',
    }

    if(response.status === 200){
      let cajaChica = [
        {"id":1,"concepto":"Abono caja chica","fecha":date,"monto":500,"comentarios":"Se abono a la caja chica","tipo":"Abono"}
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

      let ajustes = [
        {
          id:11 ,
          usuario:'Administrador',
          fecha: '1/8/2023',
          estado:'Ajustado',
          comentarios: 'Prueba de ajuste',
        }
      ]

      let recibosPubGeneral =  [
        {
          id: 1,
          recibo: '0004',
          cliente: 'ADRIAN AGUILERA MORENO',
          fecha: '14/10/2023',
          estado:'Pendiente',
          tipo: 'N/A',
          total: 8000
        },
        {
          id: 2,
          recibo: '0005',
          cliente: 'ADRIAN AGUILERA MORENO',
          fecha: '10/10/2023',
          estado:'Pendiente',
          tipo: 'N/A',
          total:3000
        },
        {
          id: 3,
          recibo: '0006',
          cliente: 'ADRIAN AGUILERA MORENO',
          fecha: '09/10/2023',
          estado:'Pendiente',
          tipo: 'N/A',
          total: 4000,
        }
       ]
      

      window.localStorage.setItem('cajaChica', JSON.stringify(cajaChica))
      window.localStorage.setItem('ajustes', JSON.stringify(ajustes))
      window.localStorage.setItem('recibosFac', JSON.stringify(recibosFact))
      window.localStorage.setItem('recibosPubG', JSON.stringify(recibosPubGeneral))
      window.localStorage.setItem('dinero', '500')
      window.localStorage.setItem(authConfig.storageTokenKeyName, response.data)
          const returnUrl = router.query.returnUrl
          setUser(dataUser)
           window.localStorage.setItem('userData', JSON.stringify(dataUser))
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
    }
      
    } catch (error) {
      console.log(error)
      if (errorCallback) errorCallback(error)
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
