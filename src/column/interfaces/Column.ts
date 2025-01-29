import type { Task } from "@/task/interfaces/Task";

export interface Column {
    id: string;
    name: string;
}

export interface ColumnCreate {
    name: string;
}
