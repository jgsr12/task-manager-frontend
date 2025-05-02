// components/TaskForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { UserDTO } from '@/types/dto';

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  status: 'POR_HACER' | 'EN_PROGRESO' | 'FINALIZADA';
  assigneeId?: number | '';
};

interface TaskFormProps {
  initial?: TaskFormData;
  users?: UserDTO[];
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({
  initial,
  users = [],
  onSubmit
}: TaskFormProps) {
  const { register, handleSubmit } = useForm<TaskFormData>({
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      dueDate: initial?.dueDate ?? '',
      status: initial?.status ?? 'POR_HACER',
      assigneeId: initial?.assigneeId ?? ''
    }
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-card dark:bg-card-dark p-6 rounded-lg shadow"
    >
      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-white">
          Título
        </label>
        <input
          {...register('title', { required: true })}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-white">
          Descripción
        </label>
        <textarea
          {...register('description')}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-white">
          Fecha límite
        </label>
        <input
          type="date"
          {...register('dueDate', { required: true })}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary dark:text-white">
          Estado
        </label>
        <select
          {...register('status')}
          className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="POR_HACER">Por hacer</option>
          <option value="EN_PROGRESO">En progreso</option>
          <option value="FINALIZADA">Finalizada</option>
        </select>
      </div>

      {users.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-text-primary dark:text-white">
            Asignar a
          </label>
          <select
            {...register('assigneeId', { valueAsNumber: true })}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Sin asignar</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary text-black py-2 rounded-lg shadow hover:bg-primary/90 transition"
      >
        Guardar
      </button>
    </form>
  );
}
