export interface TaskDTO {
    id?: number;
    title: string;
    description: string;
    dueDate: string;
    status?: string;
    assigneeId?: number | null;
  }
  
  export interface UserDTO {
    id: number;
    username: string;
    email: string;
    roles: string[];
  }
