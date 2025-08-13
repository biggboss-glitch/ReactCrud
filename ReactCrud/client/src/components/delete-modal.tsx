import { Task } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  task: Task | null;
  isDeleting: boolean;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  task,
  isDeleting
}: DeleteModalProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-effect border border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="ml-3">
              <DialogTitle className="text-lg font-medium text-slate-900 dark:text-white">
                Delete Task
              </DialogTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
            </div>
          </div>
        </DialogHeader>

        {task && (
          <div className="bg-slate-50 dark:bg-slate-700 rounded-md p-3 mb-4">
            <div className="text-sm font-medium text-slate-900 dark:text-white">
              {task.title}
            </div>
            {task.description && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {task.description}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="text-white bg-red-600 border-transparent hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
