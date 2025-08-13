import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, InsertTask } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "@/components/header";
import { TaskTable } from "@/components/task-table";
import { TaskModal } from "@/components/task-modal";
import { DeleteModal } from "@/components/delete-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Download } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Build query parameters
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (statusFilter) params.append("status", statusFilter);
    if (priorityFilter) params.append("priority", priorityFilter);
    return params.toString();
  }, [searchQuery, statusFilter, priorityFilter]);

  // Fetch tasks
  const { 
    data: tasks = [], 
    isLoading,
    error 
  } = useQuery<Task[]>({
    queryKey: ["/api/tasks", buildQueryParams()],
    queryFn: async () => {
      const params = buildQueryParams();
      const url = params ? `/api/tasks?${params}` : "/api/tasks";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    },
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (data: InsertTask) => {
      const response = await apiRequest("POST", "/api/tasks", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertTask }) => {
      const response = await apiRequest("PUT", `/api/tasks/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle task submission (create or update)
  const handleTaskSubmit = async (data: InsertTask) => {
    if (editingTask) {
      await updateTaskMutation.mutateAsync({ id: editingTask.id, data });
    } else {
      await createTaskMutation.mutateAsync(data);
    }
    setEditingTask(null);
  };

  // Handle task deletion
  const handleDeleteTask = async () => {
    if (taskToDelete) {
      await deleteTaskMutation.mutateAsync(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  // Handle task duplication
  const handleDuplicateTask = (task: Task) => {
    const duplicatedTask: InsertTask = {
      title: `${task.title} (Copy)`,
      description: task.description,
      status: "pending",
      priority: task.priority,
      dueDate: task.dueDate,
      assignee: task.assignee,
    };
    createTaskMutation.mutate(duplicatedTask);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle filtering
  const handleFilter = (status?: string, priority?: string) => {
    setStatusFilter(status || "");
    setPriorityFilter(priority || "");
  };

  // Handle export (placeholder)
  const handleExport = () => {
    toast({
      title: "Export",
      description: "Export functionality would be implemented here.",
    });
  };

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsCreateModalOpen(true);
  };

  // Handle delete task
  const handleDeleteTaskClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Handle create new task
  const handleCreateTask = () => {
    setEditingTask(null);
    setIsCreateModalOpen(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-12">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Failed to load tasks
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                There was an error loading your tasks. Please refresh the page or try again later.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Manage your tasks and track progress
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Download className="mr-2 w-4 h-4" />
              Export
            </Button>
            <Button
              onClick={handleCreateTask}
              className="text-white bg-primary hover:bg-indigo-700"
            >
              <Plus className="mr-2 w-4 h-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Task Table */}
        <TaskTable
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTaskClick}
          onDuplicate={handleDuplicateTask}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />

        {/* Task Modal */}
        <TaskModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
          isSubmitting={createTaskMutation.isPending || updateTaskMutation.isPending}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
          }}
          onConfirm={handleDeleteTask}
          task={taskToDelete}
          isDeleting={deleteTaskMutation.isPending}
        />
      </main>
    </div>
  );
}
