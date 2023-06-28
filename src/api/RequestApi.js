import axiosApi from "./axiosApi"

export const postPersonType = async (data, idUser) =>{
 const _URL = `/api/TiposPersonas/${idUser}`;

    return axiosApi.post(_URL, data)
}


export const putPersonType = async (data, idUser) =>{
    const _URL = `/api/TiposPersonas/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   
   export const deletePersonType = async (data, idUser) =>{
    const _URL = `api/TiposPersonas/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }
   

export const postPeople = async (data, idUser) =>{
    const _URL = `/api/contabilidad/Personas/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditPeople = async (data, idUser) =>{
    const _URL = `/api/contabilidad/Personas/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deletePerson = async (data, idUser) =>{
    const _URL = `api/contabilidad/Personas/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }

export const getAllTyperPersons = async () =>{
    const _URL = `/api/TiposPersonas/all`;

       return axiosApi.get(_URL)
   }

   export const getAllPeople = async () =>{
    const _URL = `/api/contabilidad/Personas/all`;

       return axiosApi.get(_URL)
   }

   export const getAllBranchOffice = async () =>{
    const _URL = `/api/Sucursales/all`;

       return axiosApi.get(_URL)
   }

   export const postBranchOffice = async (data, idUser) =>{
    const _URL = `/api/Sucursales/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditBranchOffice = async (data, idUser) =>{
    const _URL = `/api/Sucursales/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deleteBranchOffice = async (data, idUser) =>{
    const _URL = `api/Sucursales/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }


   
   export const getAllWarehouseType = async () =>{
    const _URL = `/api/TiposAlmacen/all`;

       return axiosApi.get(_URL)
   }


   export const postWarehouseType = async (data, idUser) =>{
    
    const _URL = `/api/TiposAlmacen/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditWarehouseType = async (data, idUser) =>{
    const _URL = `/api/TiposAlmacen/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }


   export const deleteWarehouseType = async (data, idUser) =>{
    const _URL = `api/TiposAlmacen/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }


   export const getAllWarehouse = async () =>{
    const _URL = `/api/Almacenes/all`;

       return axiosApi.get(_URL)
   }

   export const postWarehouse = async (data, idUser) =>{
    
    const _URL = `/api/Almacenes/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditWarehouse = async (data, idUser) =>{
    const _URL = `/api/Almacenes/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deleteWarehouse = async (data, idUser) =>{
    const _URL = `api/Almacenes/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }

   export const getAllProducts = async (id) =>{
    const _URL = `https://backend.administrare.com.mx/api/compras/Productos/all`;

       return axiosApi.get(_URL)
   }

   export const postRequesitions = async (data, idUser) =>{
    
    const _URL = `/api/Compras/OrdenesCompras/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const getAllRequesitions = async () =>{
    
    const _URL =`/api/Compras/OrdenesCompras/all`;
   
       return axiosApi.get(_URL)
   }


   export const postRequesitionsDetail = async (data, idUser) =>{
    
    const _URL = `/api/Compras/DetallesOrdenesCompras/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }





   


   
   
