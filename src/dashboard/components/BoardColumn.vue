<script setup lang="ts">
import type { Column } from "@/column/interfaces/Column";
import AddIcon from "@/shared/components/icons/AddIcon.vue";
import { useTasks } from "@/task/composables/useTasks";
import { ref } from "vue";
import CreateTaskModal from "@/task/components/CreateTaskModal.vue";
import draggable from "vuedraggable";
import type { Task } from "@/task/interfaces/Task";
import DeleteIcon from "@/shared/components/icons/DeleteIcon.vue";
import { useColumns } from "@/column/composables/useColumns";
import { useColumnsStore } from "@/stores/columnStore";
// Props
interface Props {
  column: Column;
  isPendingPatch: boolean;
  patchMutation: (params: {
    columnId: string;
    column: Omit<Column, "id">;
  }) => void;
}
// Emit
const emit = defineEmits(["delete-column"]);

// Composables
const { column, isPendingPatch, patchMutation } = defineProps<Props>();
const {
  tasks,
  isLoading,
  createTaskMutation,
  isCreatePending,
  moveTaskMutation,
  updateTaskMutation,
  isUpdatePending,
  deleteTaskMutation
} = useTasks(column.id);

// Reactive properties
const isEditing = ref<boolean>(false);
const editedName = ref<string>(column.name);
const isTaskModalOpen = ref(false);

const editingTaskId = ref<string | null>(null);
const editedTaskTitle = ref<string>("");
const editedTaskContent = ref<string>("");

// Methods
const enableEditing = () => {
  isEditing.value = true;
  editedName.value = column.name;
};

const saveColumn = () => {
  if (!editedName.value.trim() || editedName.value === column.name) {
    isEditing.value = false;
    return;
  }
  patchMutation({ columnId: column.id, column: { name: editedName.value } });
};

const onTaskMove = (event: any) => {
  const { item, to } = event;
  const taskId = item.getAttribute("data-id");
  const newColumnId = to
    .closest("[data-column-id]")
    ?.getAttribute("data-column-id");
  if (taskId && newColumnId && newColumnId !== column.id) {
    moveTaskMutation({ task_id: taskId, new_column_id: newColumnId });
  }
};

const enableTaskEditing = (task: Task) => {
  editingTaskId.value = task.id;
  editedTaskTitle.value = task.title;
  editedTaskContent.value = task.content;
};

const saveTask = (task_id: string) => {
  if (!editedTaskTitle.value.trim() || !editedTaskContent.value.trim()) {
    editingTaskId.value = null;
    return;
  }
  updateTaskMutation({
    task_id,
    task: { title: editedTaskTitle.value, content: editedTaskContent.value },
  });
  editingTaskId.value = null;
};
</script>

<template>
  <article
    class="w-[300px] h-screen overflow-y-auto bg-border/60 outline-1 outline-white m-3 rounded-md flex-shrink-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50 hover:scrollbar-thumb-border/70"
    :data-column-id="column.id"
  >
    <header
      class="flex flex-row justify-around items-center mt-4 gap-y-2 p-4 bg-border/60 rounded-t-md"
    >
      <input
        v-if="isEditing"
        v-model="editedName"
        class="text-text font-bold font-sans text-lg bg-transparent border-b border-text focus:outline-none text-center"
        @blur="saveColumn"
        @keyup.enter="saveColumn"
        @click.stop
      />
      <h3
        v-else
        class="text-text font-bold font-sans text-lg cursor-pointer hover:opacity-70 transition-opacity"
        @dblclick="enableEditing"
      >
        {{ column.name }}
      </h3>
      <div v-if="isPendingPatch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          class="size-6"
          height="128"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke-dasharray="16"
              stroke-dashoffset="16"
              d="M12 3c4.97 0 9 4.03 9 9"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="16;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
            <path
              stroke-dasharray="64"
              stroke-dashoffset="64"
              stroke-opacity=".3"
              d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="1.2s"
                values="64;0"
              />
            </path>
          </g>
        </svg>
      </div>
      <DeleteIcon
        class="size-5 text-red-400 hover:text-red-600 transition-all duration-300 hover:cursor-pointer"
        @click="emit('delete-column', column.id)"/>
    </header>
    <div v-if="isLoading" class="flex justify-center mt-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-10"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            stroke-dasharray="16"
            stroke-dashoffset="16"
            d="M12 3c4.97 0 9 4.03 9 9"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.3s"
              values="16;0"
            />
            <animateTransform
              attributeName="transform"
              dur="1.5s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
          <path
            stroke-dasharray="64"
            stroke-dashoffset="64"
            stroke-opacity=".3"
            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="1.2s"
              values="64;0"
            />
          </path>
        </g>
      </svg>
    </div>
    <section
      v-else
      class="p-4 space-y-4 overflow-y-auto max-h-[80vh] pr-2 scrollbar-thin scrollbar-thumb-secondary/60 scrollbar-track-transparent hover:scrollbar-thumb-secondary/80"
    >
      <div class="flex justify-center mb-2">
        <button
          class="py-2 bg-secondary font-geist text-white text-sm rounded-full mt-4 w-36 flex flex-row items-center justify-center gap-x-2 hover:bg-secondary/70"
          @click="isTaskModalOpen = true"
        >
          <AddIcon class="size-5" />
          Add a task
        </button>
      </div>
      <draggable
        v-model="tasks"
        group="tasks-group"
        item-key="id"
        animation="200"
        class="w-full"
        @end="onTaskMove"
      >
        <template #item="{ element }">
          <article
            class="relative w-full bg-white/50 rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition-all duration-300 shadow-md shadow-zinc backdrop-blur-md mt-4 max-h-32 text-ellipsis"
            :data-id="element.id"
          >
            <header class="flex items-center justify-center flex-row gap-x-3">
              <input
                v-if="editingTaskId === element.id"
                v-model="editedTaskTitle"
                class="text-text font-bold text-lg bg-transparent border-b border-text focus:outline-none text-center"
                @blur="saveTask(element.id)"
                @keyup.enter="saveTask(element.id)"
                @click.stop
              />
              <h4
                v-else
                class="font-geist font-extrabold text-lg text-gray-800 truncate cursor-pointer"
                @dblclick="enableTaskEditing(element)"
              >
                {{ element.title }}
              </h4>
              <div v-if="isUpdatePending && editingTaskId === element.id">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-6"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      dur="560ms"
                      from="0,12,12"
                      repeatCount="indefinite"
                      to="360,12,12"
                      type="rotate"
                    />
                  </path>
                </svg>
              </div>
            </header>
            <textarea
              v-if="editingTaskId === element.id"
              v-model="editedTaskContent"
              class="w-full text-sm text-gray-600 bg-transparent border border-text p-2 rounded-md focus:outline-none"
              @blur="saveTask(element.id)"
              @keyup.enter="saveTask(element.id)"
              @click.stop
            ></textarea>
            <p
              v-else
              class="text-sm text-gray-600 line-clamp-3 text-center cursor-pointer"
              @dblclick="enableTaskEditing(element)"
            >
              {{ element.content }}
            </p>

            <footer class="flex justify-end items-center gap-2 mt-2">
              <button
                class="text-red-400 hover:text-red-600 transition-all duration-300 font-sans"
                @click="deleteTaskMutation(element.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                  />
                </svg>
              </button>
            </footer>
          </article>
        </template>
      </draggable>
    </section>
  </article>
  <CreateTaskModal
    v-if="isTaskModalOpen"
    :columnId="column.id"
    :createMutation="createTaskMutation"
    :isPendingMutation="isCreatePending.value"
    @close="isTaskModalOpen = false"
  />
</template>
