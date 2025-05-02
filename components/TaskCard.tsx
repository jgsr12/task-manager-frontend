'use client';

import { TaskDTO } from '@/types/dto';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function TaskCard({ task }: { task: TaskDTO }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    try {
      await api.delete(`/tasks/${task.id}`);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar la tarea');
    }
  };

  return (
    <div className="bg-card dark:bg-card-dark rounded shadow p-4 flex flex-col">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-text-primary dark:text-white">
          {task.title}
        </h2>
        <span className="px-2 py-1 bg-secondary text-white rounded-full text-xs">
          {task.status}
        </span>
      </div>
      <time className="text-sm text-gray-500 dark:text-gray-400">
        {task.dueDate}
      </time>
      <p className="mt-2 text-gray-700 dark:text-gray-300 flex-1">
        {task.description}
      </p>
      <div className="mt-4 flex justify-end space-x-4">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="text-blue-500 hover:underline"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
