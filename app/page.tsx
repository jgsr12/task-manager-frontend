'use client';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type Form = { username: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<Form>();
  const auth = useContext(AuthContext)!;

  const onSubmit = async(data: Form) => {
    try { await auth.login(data.username, data.password); }
    catch { alert('Credenciales inválidas'); }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-sm mx-auto mt-20 bg-card dark:bg-card-dark p-8 rounded shadow"
    >
      <h1 className="text-2xl text-center text-text-primary dark:text-white">
        Iniciar Sesión
      </h1>
      <div>
        <label className="block text-sm text-text-primary dark:text-white">Usuario</label>
        <input
          {...register('username', { required: true })}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm text-text-primary dark:text-white">Contraseña</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-black py-2 rounded hover:bg-primary/90 transition"
      >
        Ingresar
      </button>
    </form>
  );
}
