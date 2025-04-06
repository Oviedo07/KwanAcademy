import React, { useState } from 'react';
 
 const FormularioCurso = () => {
   const [formulario, setFormulario] = useState({
     nombreInstructor: '',
     apellidoInstructor: '',
     nombreCurso: '',
     descripcionCurso: '',
     objetivosCurso: '',
     precioCurso: '',
     fotoCurso: null
   });
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormulario(prevState => ({
       ...prevState,
       [name]: value
     }));
   };
 
   const handleImageChange = (e) => {
     setFormulario(prevState => ({
       ...prevState,
       fotoCurso: e.target.files[0]
     }));
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     // Aquí iría la lógica para publicar el curso
     console.log("Curso publicado:", formulario);
   };
 
   const handleEdit = () => {
     // Lógica para editar
     console.log("Editando curso");
   };
 
   const handleDelete = () => {
     // Lógica para eliminar
     console.log("Eliminando curso");
     setFormulario({
       nombreInstructor: '',
       apellidoInstructor: '',
       nombreCurso: '',
       descripcionCurso: '',
       objetivosCurso: '',
       precioCurso: '',
       fotoCurso: null
     });
   };
 
   return (
     <div className="flex justify-center items-center min-h-screen bg-[#FEF3E2] p-4">
       <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white">
         <h1 className="text-3xl font-bold text-[#FA4032] mb-6 text-center">Crear Nuevo Curso</h1>
         
         <form onSubmit={handleSubmit}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Columna izquierda */}
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Nombre Instructor</label>
                   <input
                     type="text"
                     name="nombreInstructor"
                     value={formulario.nombreInstructor}
                     onChange={handleChange}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Apellido Instructor</label>
                   <input
                     type="text"
                     name="apellidoInstructor"
                     value={formulario.apellidoInstructor}
                     onChange={handleChange}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                     required
                   />
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Nombre Curso</label>
                 <input
                   type="text"
                   name="nombreCurso"
                   value={formulario.nombreCurso}
                   onChange={handleChange}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                   required
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Precio Curso</label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-gray-500 sm:text-sm">$</span>
                   </div>
                   <input
                     type="number"
                     name="precioCurso"
                     value={formulario.precioCurso}
                     onChange={handleChange}
                     className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                     placeholder="0.00"
                     required
                   />
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Foto Curso</label>
                 <div className="mt-1 flex items-center">
                   <span className="inline-block h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                     {formulario.fotoCurso ? (
                       <img 
                         src={URL.createObjectURL(formulario.fotoCurso)} 
                         alt="Preview" 
                         className="h-full w-full object-cover"
                       />
                     ) : (
                       <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                       </svg>
                     )}
                   </span>
                   <input
                     type="file"
                     name="fotoCurso"
                     onChange={handleImageChange}
                     className="ml-4 py-2"
                     accept="image/*"
                   />
                 </div>
               </div>
             </div>
             
             {/* Columna derecha */}
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700">Descripción Curso</label>
                 <textarea
                   name="descripcionCurso"
                   value={formulario.descripcionCurso}
                   onChange={handleChange}
                   rows="4"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                   required
                 ></textarea>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Objetivos Curso</label>
                 <textarea
                   name="objetivosCurso"
                   value={formulario.objetivosCurso}
                   onChange={handleChange}
                   rows="4"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAB12F]"
                   required
                 ></textarea>
               </div>
             </div>
           </div>
           
           <div className="flex justify-between mt-6">
             <button
               type="button"
               onClick={handleDelete}
               className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FA4032] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
               Eliminar
             </button>
             
             <div className="space-x-3">
               <button
                 type="button"
                 onClick={handleEdit}
                 className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FA812F] hover:bg-[#e67429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FA812F]"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                 </svg>
                 Editar
               </button>
               
               <button
                 type="submit"
                 className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FAB12F] hover:bg-[#e59d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FAB12F]"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
                 Publicar
               </button>
             </div>
           </div>
         </form>
       </div>
     </div>
   );
 };
 
 export default FormularioCurso;