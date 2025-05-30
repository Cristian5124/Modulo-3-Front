import React, { useState } from 'react';
import ApiService from '../service/api';

export default function CreateRoutine() {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [frequency, setFrequency] = useState('');
  const [exercises, setExercises] = useState([{ name: '', description: '', sets: '', repetitions: '', instructions: '' }]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleExerciseChange = (idx, field, value) => {
    setExercises(prev => prev.map((ex, i) => i === idx ? { ...ex, [field]: value } : ex));
  };

  const addExercise = () => {
    setExercises(prev => [...prev, { name: '', description: '', sets: '', repetitions: '', instructions: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const routineDTO = {
        name,
        objective,
        description,
        duration,
        frequency,
        assignedTrainer: null,
        exercises: exercises.map(ex => ({
          name: ex.name,
          description: ex.description,
          sets: Number(ex.sets),
          repetitions: Number(ex.repetitions),
          instructions: ex.instructions
        })),
      };
      await ApiService.createRoutine(routineDTO);
      setSuccess('Rutina creada exitosamente');
    } catch (err) {
      setError(err.message || 'Error al crear la rutina');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Crear Rutina</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Objetivo" value={objective} onChange={e => setObjective(e.target.value)} required />
        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required />
        <input placeholder="Duración" value={duration} onChange={e => setDuration(e.target.value)} required />
        <input placeholder="Frecuencia" value={frequency} onChange={e => setFrequency(e.target.value)} required />
        <div>
          <b>Ejercicios:</b>
          {exercises.map((ex, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <input placeholder="Nombre" value={ex.name} onChange={e => handleExerciseChange(idx, 'name', e.target.value)} required style={{ width: 120 }} />
              <input placeholder="Descripción" value={ex.description} onChange={e => handleExerciseChange(idx, 'description', e.target.value)} style={{ width: 120 }} />
              <input placeholder="Sets" value={ex.sets} onChange={e => handleExerciseChange(idx, 'sets', e.target.value)} required style={{ width: 60 }} />
              <input placeholder="Repeticiones" value={ex.repetitions} onChange={e => handleExerciseChange(idx, 'repetitions', e.target.value)} required style={{ width: 90 }} />
              <input placeholder="Instrucciones" value={ex.instructions} onChange={e => handleExerciseChange(idx, 'instructions', e.target.value)} style={{ width: 140 }} />
            </div>
          ))}
          <button type="button" onClick={addExercise} style={{ marginTop: 6, background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600 }}>Agregar ejercicio</button>
        </div>
        {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
        <button type="submit" style={{ background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, marginTop: 12 }}>Crear rutina</button>
      </form>
    </div>
  );
}
