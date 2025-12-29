import { useState } from 'react';

const initialForm = {
  title: '',
  description: '',
  category: '',
  type: '',
  level: '',
  link: '',
  tags: '',
};

function ResourceCreate() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const resource = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch('http://localhost:5242/api/Resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resource),
      });
      if (res.ok) {
        setMessage('¡Recurso agregado exitosamente!');
        setForm(initialForm);
      } else {
        setMessage('Error al agregar el recurso.');
      }
    } catch {
      setMessage('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-0 text-gray-800">Agregar nuevo recurso</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[80px]" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Tipo (libro, curso, herramienta)" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="level" value={form.level} onChange={handleChange} placeholder="Nivel (básico, intermedio, avanzado)" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Enlace" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Etiquetas (separadas por coma)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">Agregar recurso</button>
      </form>
      {message && <p className={`mt-4 text-center font-medium ${message.includes('exitosamente') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
}

export default ResourceCreate;
