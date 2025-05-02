'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm, { TaskFormData } from '@/components/TaskForm';
import api from '@/lib/api';
import { UserDTO, TaskDTO } from '@/types/dto';

export default function NewTaskPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    api.get<UserDTO[]>('/users')
      .then((res) => setUsers(res.data))
      .catch(() => alert('No se pudieron cargar los usuarios'));
  }, []);

  const handleCreate = async (data: TaskFormData) => {
    try {
      await api.post<TaskDTO>('/tasks', data);
      router.push('/tasks');
    } catch {
      alert('Error al crear la tarea');
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Nueva Tarea</h1>
      <TaskForm users={users} onSubmit={handleCreate} />
      <button
        onClick={() => router.push('/tasks')}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 transition"
      >
        Cancelar
      </button>
    </div>
  );
}
