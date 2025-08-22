import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { clientStorage } from "./clientStorage";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  // Handle client-side mutations
  switch (method) {
    case 'POST':
      if (url === "/api/music") {
        return clientStorage.createMusicEntry(data as any);
      } else if (url === "/api/todos") {
        return clientStorage.createTodoItem(data as any);
      } else if (url === "/api/projects") {
        return clientStorage.createProject(data as any);
      } else if (url === "/api/habits") {
        return clientStorage.createHabit(data as any);
      } else if (url === "/api/workouts") {
        return clientStorage.createWorkout(data as any);
      } else if (url === "/api/schedule") {
        return clientStorage.createScheduleItem(data as any);
      } else if (url === "/api/meals") {
        return clientStorage.createMeal(data as any);
      }
      break;
      
    case 'PATCH':
      const idFromUrl = url.split('/').pop();
      if (url.includes('/api/todos/')) {
        return clientStorage.updateTodoItem(idFromUrl!, data as any);
      } else if (url.includes('/api/projects/')) {
        return clientStorage.updateProject(idFromUrl!, data as any);
      } else if (url.includes('/api/habits/')) {
        return clientStorage.updateHabit(idFromUrl!, data as any);
      }
      break;
      
    case 'DELETE':
      const deleteId = url.split('/').pop();
      if (url.includes('/api/music/')) {
        clientStorage.deleteMusicEntry(deleteId!);
      } else if (url.includes('/api/todos/')) {
        clientStorage.deleteTodoItem(deleteId!);
      } else if (url.includes('/api/projects/')) {
        clientStorage.deleteProject(deleteId!);
      } else if (url.includes('/api/habits/')) {
        clientStorage.deleteHabit(deleteId!);
      } else if (url.includes('/api/workouts/')) {
        clientStorage.deleteWorkout(deleteId!);
      } else if (url.includes('/api/schedule/')) {
        clientStorage.deleteScheduleItem(deleteId!);
      } else if (url.includes('/api/meals/')) {
        clientStorage.deleteMeal(deleteId!);
      }
      return { message: "Deleted successfully" };
      
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  throw new Error(`Unknown endpoint: ${url}`);
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    
    // Handle client-side data fetching
    switch (url) {
      case "/api/music":
        return clientStorage.getMusicEntries();
      case "/api/todos":
        return clientStorage.getTodoItems();
      case "/api/projects":
        return clientStorage.getProjects();
      case "/api/habits":
        return clientStorage.getHabits();
      case "/api/workouts":
        return clientStorage.getWorkouts();
      case "/api/meals":
        return clientStorage.getMeals();
      default:
        if (url.startsWith("/api/schedule")) {
          const urlParts = url.split('?');
          const urlParams = urlParts[1] ? new URLSearchParams(urlParts[1]) : new URLSearchParams();
          const date = urlParams.get('date') || new Date().toISOString().split('T')[0];
          return clientStorage.getScheduleItems(date);
        }
        throw new Error(`Unknown endpoint: ${url}`);
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});