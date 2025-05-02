'use client';
import TaskCard from '@/components/TaskCard';
import api from '@/lib/api';
import { TaskDTO } from '@/types/dto';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    api.get('/tasks').then(r => setTasks(r.data));
  }, [pathname]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis Tareas</h1>
      <button
        onClick={() => location.href = '/tasks/new'}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Nueva Tarea
      </button>
      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}
