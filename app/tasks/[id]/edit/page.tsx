// app/tasks/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskForm, { TaskFormData } from '@/components/TaskForm';
import api from '@/lib/api';
import { TaskDTO, UserDTO } from '@/types/dto';

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [initial, setInitial] = useState<TaskFormData | null>(null);

  useEffect(() => {
    api.get<TaskDTO>(`/tasks/${id}`)
      .then((res) => {
        const { title, description, dueDate, status, assigneeId } = res.data;
        setInitial({
          title,
          description,
          dueDate,
          status,
          assigneeId: assigneeId ?? ''
        });
      })
      .catch(() => {
        alert('No se pudo cargar la tarea');
        router.push('/tasks');
      });

    api.get<UserDTO[]>('/users')
      .then((res) => setUsers(res.data))
      .catch(() => alert('No se pudieron cargar los usuarios'));
  }, [id, router]);

  const handleUpdate = async (data: TaskFormData) => {
    try {
      await api.put<TaskDTO>(`/tasks/${id}`, data);
      router.push('/tasks');
    } catch {
      alert('Error al actualizar la tarea');
    }
  };

  if (!initial) {
    return <p className="text-center mt-10">Cargando…</p>;
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Editar Tarea</h1>
      <TaskForm initial={initial} users={users} onSubmit={handleUpdate} />
      <button
        onClick={() => router.push('/tasks')}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 transition"
      >
        Cancelar
      </button>
    </div>
  );
}
