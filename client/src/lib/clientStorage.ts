import { 
  type MusicEntry, 
  type InsertMusicEntry,
  type TodoItem,
  type InsertTodoItem,
  type Project,
  type InsertProject,
  type Habit,
  type InsertHabit,
  type Workout,
  type InsertWorkout,
  type ScheduleItem,
  type InsertScheduleItem,
  type Meal,
  type InsertMeal
} from "@shared/schema";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

class ClientStorage {
  private readonly userId = "default-user-id";

  // Music operations
  getMusicEntries(): MusicEntry[] {
    const stored = localStorage.getItem('music-entries');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createMusicEntry(entry: InsertMusicEntry): MusicEntry {
    const entries = this.getMusicEntries();
    const newEntry: MusicEntry = {
      ...entry,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
    };
    entries.push(newEntry);
    localStorage.setItem('music-entries', JSON.stringify(entries));
    return newEntry;
  }

  deleteMusicEntry(id: string): boolean {
    const entries = this.getMusicEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    localStorage.setItem('music-entries', JSON.stringify(filtered));
    return filtered.length < entries.length;
  }

  // Todo operations
  getTodoItems(): TodoItem[] {
    const stored = localStorage.getItem('todo-items');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createTodoItem(item: InsertTodoItem): TodoItem {
    const items = this.getTodoItems();
    const newItem: TodoItem = {
      ...item,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
      completed: item.completed ?? null,
    };
    items.push(newItem);
    localStorage.setItem('todo-items', JSON.stringify(items));
    return newItem;
  }

  updateTodoItem(id: string, updates: Partial<InsertTodoItem>): TodoItem | null {
    const items = this.getTodoItems();
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) return null;
    
    items[itemIndex] = { ...items[itemIndex], ...updates };
    localStorage.setItem('todo-items', JSON.stringify(items));
    return items[itemIndex];
  }

  deleteTodoItem(id: string): boolean {
    const items = this.getTodoItems();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem('todo-items', JSON.stringify(filtered));
    return filtered.length < items.length;
  }

  // Project operations
  getProjects(): Project[] {
    const stored = localStorage.getItem('projects');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createProject(project: InsertProject): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
      progress: project.progress ?? null,
      status: project.status ?? 'active',
      description: project.description ?? null,
      deadline: project.deadline ?? null,
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    return newProject;
  }

  updateProject(id: string, updates: Partial<InsertProject>): Project | null {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex === -1) return null;
    
    projects[projectIndex] = { ...projects[projectIndex], ...updates };
    localStorage.setItem('projects', JSON.stringify(projects));
    return projects[projectIndex];
  }

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(project => project.id !== id);
    localStorage.setItem('projects', JSON.stringify(filtered));
    return filtered.length < projects.length;
  }

  // Habit operations
  getHabits(): Habit[] {
    const stored = localStorage.getItem('habits');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createHabit(habit: InsertHabit): Habit {
    const habits = this.getHabits();
    const newHabit: Habit = {
      ...habit,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
      streak: habit.streak ?? null,
      weekProgress: habit.weekProgress ? Array.from(habit.weekProgress) as boolean[] : null,
    };
    habits.push(newHabit);
    localStorage.setItem('habits', JSON.stringify(habits));
    return newHabit;
  }

  updateHabit(id: string, updates: Partial<InsertHabit>): Habit | null {
    const habits = this.getHabits();
    const habitIndex = habits.findIndex(habit => habit.id === id);
    if (habitIndex === -1) return null;
    
    habits[habitIndex] = { 
      ...habits[habitIndex], 
      ...updates,
      weekProgress: updates.weekProgress ? Array.from(updates.weekProgress) as boolean[] : habits[habitIndex].weekProgress
    };
    localStorage.setItem('habits', JSON.stringify(habits));
    return habits[habitIndex];
  }

  deleteHabit(id: string): boolean {
    const habits = this.getHabits();
    const filtered = habits.filter(habit => habit.id !== id);
    localStorage.setItem('habits', JSON.stringify(filtered));
    return filtered.length < habits.length;
  }

  // Workout operations
  getWorkouts(): Workout[] {
    const stored = localStorage.getItem('workouts');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createWorkout(workout: InsertWorkout): Workout {
    const workouts = this.getWorkouts();
    const newWorkout: Workout = {
      ...workout,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
      calories: workout.calories ?? null,
    };
    workouts.push(newWorkout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    return newWorkout;
  }

  deleteWorkout(id: string): boolean {
    const workouts = this.getWorkouts();
    const filtered = workouts.filter(workout => workout.id !== id);
    localStorage.setItem('workouts', JSON.stringify(filtered));
    return filtered.length < workouts.length;
  }

  // Schedule operations
  getScheduleItems(date: string): ScheduleItem[] {
    const stored = localStorage.getItem('schedule-items');
    if (!stored) return [];
    const items = JSON.parse(stored);
    return items.filter((item: ScheduleItem) => item.date === date);
  }

  createScheduleItem(item: InsertScheduleItem): ScheduleItem {
    const stored = localStorage.getItem('schedule-items');
    const items = stored ? JSON.parse(stored) : [];
    const newItem: ScheduleItem = {
      ...item,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
    };
    items.push(newItem);
    localStorage.setItem('schedule-items', JSON.stringify(items));
    return newItem;
  }

  deleteScheduleItem(id: string): boolean {
    const stored = localStorage.getItem('schedule-items');
    if (!stored) return false;
    const items = JSON.parse(stored);
    const filtered = items.filter((item: ScheduleItem) => item.id !== id);
    localStorage.setItem('schedule-items', JSON.stringify(filtered));
    return filtered.length < items.length;
  }

  // Meal operations
  getMeals(): Meal[] {
    const stored = localStorage.getItem('meals');
    if (!stored) return [];
    return JSON.parse(stored);
  }

  createMeal(meal: InsertMeal): Meal {
    const meals = this.getMeals();
    const newMeal: Meal = {
      ...meal,
      id: generateId(),
      userId: this.userId,
      createdAt: new Date(),
    };
    meals.push(newMeal);
    localStorage.setItem('meals', JSON.stringify(meals));
    return newMeal;
  }

  deleteMeal(id: string): boolean {
    const meals = this.getMeals();
    const filtered = meals.filter(meal => meal.id !== id);
    localStorage.setItem('meals', JSON.stringify(filtered));
    return filtered.length < meals.length;
  }
}

export const clientStorage = new ClientStorage();