import React, { useEffect, useState } from 'react';
import { coursesSold } from '../services/cursoService';

const CursosMasVendidos = () => {
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await coursesSold();
        setCursos(data);
      } catch (err) {
        setError('Error al cargar los cursos más vendidos.');
      }
    };
    fetchCursos();
  }, []);

  return (
    <div className="container-fluid">
      <main className="col-md-12 align-items-center justify-content-start mt-4">
        <div className="card p-4 shadow-lg">
          <h4 className="text-center mb-3">CURSOS MÁS VENDIDOS</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <p>Explora los cursos con mayor número de compras y sus respectivos instructores.</p>

          <div className="table-responsive">
            <table className="table table-striped table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '30%' }}>Nombre del Curso</th>
                  <th style={{ width: '30%' }}>Instructor</th>
                  <th style={{ width: '15%' }}>Total Ventas</th>
                </tr>
              </thead>
              <tbody>
                {cursos.length > 0 ? (
                  cursos.map((curso, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{curso.nombre_curso}</td>
                      <td>{curso.nombre_instructor} {curso.apellido_instructor}</td>
                      <td>{curso.total_ventas}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No hay cursos disponibles</td>
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

export default CursosMasVendidos;
