import React, { useState, useEffect } from 'react';
import { getSummaryInstructor } from '../services/instructorService.js';
import "bootstrap/dist/css/bootstrap.min.css";

const InstructorManagement = () => {
  const [instructores, setInstructores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarInstructores();
  }, []);

const cargarInstructores = async () => {
  const data = await getSummaryInstructor();
  setInstructores(data);
};


  return (
    <div className="container-fluid">
      <main className="col-md-12 align-items-center justify-content-start mt-4">
        <div className="card p-4 shadow-lg">
          <h4 className="text-center mb-3">RESUMEN DE INSTRUCTORES</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <p>Visualiza cuántos cursos y ventas tiene cada instructor registrados en la plataforma.</p>

          <div className="table-responsive">
            <table className="table table-striped table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '15%' }}>Nombre Instructor</th>
                  <th style={{ width: '15%' }}>Apellido Instructor</th>
                  <th style={{ width: '10%' }}>Cursos Publicados</th>
                  <th style={{ width: '10%' }}>Cantiddad Ventas</th>
                </tr>
              </thead>
              <tbody>
                {instructores.length > 0 ? (
                  instructores.map((inst, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{inst.primer_nombre}</td>
                      <td>{inst.primer_apellido}</td>
                      <td>{inst.cantidad_cursos}</td>
                      <td>{inst.total_ventas}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay instructores disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorManagement;
