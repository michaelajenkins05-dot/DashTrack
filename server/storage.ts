import { 
  type User, 
  type InsertUser, 
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
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Music operations
  getMusicEntries(userId: string): Promise<MusicEntry[]>;
  createMusicEntry(entry: InsertMusicEntry & { userId: string }): Promise<MusicEntry>;
  deleteMusicEntry(id: string, userId: string): Promise<boolean>;

  // Todo operations
  getTodoItems(userId: string): Promise<TodoItem[]>;
  createTodoItem(item: InsertTodoItem & { userId: string }): Promise<TodoItem>;
  updateTodoItem(id: string, updates: Partial<InsertTodoItem>, userId: string): Promise<TodoItem | undefined>;
  deleteTodoItem(id: string, userId: string): Promise<boolean>;

  // Project operations
  getProjects(userId: string): Promise<Project[]>;
  createProject(project: InsertProject & { userId: string }): Promise<Project>;
  updateProject(id: string, updates: Partial<InsertProject>, userId: string): Promise<Project | undefined>;
  deleteProject(id: string, userId: string): Promise<boolean>;

  // Habit operations
  getHabits(userId: string): Promise<Habit[]>;
  createHabit(habit: InsertHabit & { userId: string }): Promise<Habit>;
  updateHabit(id: string, updates: Partial<InsertHabit>, userId: string): Promise<Habit | undefined>;
  deleteHabit(id: string, userId: string): Promise<boolean>;

  // Workout operations
  getWorkouts(userId: string): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout & { userId: string }): Promise<Workout>;
  deleteWorkout(id: string, userId: string): Promise<boolean>;

  // Schedule operations
  getScheduleItems(userId: string, date: string): Promise<ScheduleItem[]>;
  createScheduleItem(item: InsertScheduleItem & { userId: string }): Promise<ScheduleItem>;
  deleteScheduleItem(id: string, userId: string): Promise<boolean>;

  // Meal operations
  getMeals(userId: string): Promise<Meal[]>;
  createMeal(meal: InsertMeal & { userId: string }): Promise<Meal>;
  deleteMeal(id: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private musicEntries: Map<string, MusicEntry>;
  private todoItems: Map<string, TodoItem>;
  private projects: Map<string, Project>;
  private habits: Map<string, Habit>;
  private workouts: Map<string, Workout>;
  private scheduleItems: Map<string, ScheduleItem>;
  private meals: Map<string, Meal>;

  constructor() {
    this.users = new Map();
    this.musicEntries = new Map();
    this.todoItems = new Map();
    this.projects = new Map();
    this.habits = new Map();
    this.workouts = new Map();
    this.scheduleItems = new Map();
    this.meals = new Map();

    // Create a default user for demo purposes
    const defaultUser: User = {
      id: "default-user-id",
      username: "Alex",
      password: "password"
    };
    this.users.set(defaultUser.id, defaultUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Music operations
  async getMusicEntries(userId: string): Promise<MusicEntry[]> {
    return Array.from(this.musicEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createMusicEntry(entry: InsertMusicEntry & { userId: string }): Promise<MusicEntry> {
    const id = randomUUID();
    const musicEntry: MusicEntry = {
      ...entry,
      id,
      createdAt: new Date(),
    };
    this.musicEntries.set(id, musicEntry);
    return musicEntry;
  }

  async deleteMusicEntry(id: string, userId: string): Promise<boolean> {
    const entry = this.musicEntries.get(id);
    if (entry && entry.userId === userId) {
      return this.musicEntries.delete(id);
    }
    return false;
  }

  // Todo operations
  async getTodoItems(userId: string): Promise<TodoItem[]> {
    return Array.from(this.todoItems.values())
      .filter(item => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createTodoItem(item: InsertTodoItem & { userId: string }): Promise<TodoItem> {
    const id = randomUUID();
    const todoItem: TodoItem = {
      ...item,
      id,
      createdAt: new Date(),
    };
    this.todoItems.set(id, todoItem);
    return todoItem;
  }

  async updateTodoItem(id: string, updates: Partial<InsertTodoItem>, userId: string): Promise<TodoItem | undefined> {
    const item = this.todoItems.get(id);
    if (item && item.userId === userId) {
      const updatedItem = { ...item, ...updates };
      this.todoItems.set(id, updatedItem);
      return updatedItem;
    }
    return undefined;
  }

  async deleteTodoItem(id: string, userId: string): Promise<boolean> {
    const item = this.todoItems.get(id);
    if (item && item.userId === userId) {
      return this.todoItems.delete(id);
    }
    return false;
  }

  // Project operations
  async getProjects(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createProject(project: InsertProject & { userId: string }): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = {
      ...project,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, updates: Partial<InsertProject>, userId: string): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project && project.userId === userId) {
      const updatedProject = { ...project, ...updates };
      this.projects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  async deleteProject(id: string, userId: string): Promise<boolean> {
    const project = this.projects.get(id);
    if (project && project.userId === userId) {
      return this.projects.delete(id);
    }
    return false;
  }

  // Habit operations
  async getHabits(userId: string): Promise<Habit[]> {
    return Array.from(this.habits.values())
      .filter(habit => habit.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createHabit(habit: InsertHabit & { userId: string }): Promise<Habit> {
    const id = randomUUID();
    const newHabit: Habit = {
      ...habit,
      id,
      createdAt: new Date(),
    };
    this.habits.set(id, newHabit);
    return newHabit;
  }

  async updateHabit(id: string, updates: Partial<InsertHabit>, userId: string): Promise<Habit | undefined> {
    const habit = this.habits.get(id);
    if (habit && habit.userId === userId) {
      const updatedHabit = { ...habit, ...updates };
      this.habits.set(id, updatedHabit);
      return updatedHabit;
    }
    return undefined;
  }

  async deleteHabit(id: string, userId: string): Promise<boolean> {
    const habit = this.habits.get(id);
    if (habit && habit.userId === userId) {
      return this.habits.delete(id);
    }
    return false;
  }

  // Workout operations
  async getWorkouts(userId: string): Promise<Workout[]> {
    return Array.from(this.workouts.values())
      .filter(workout => workout.userId === userId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createWorkout(workout: InsertWorkout & { userId: string }): Promise<Workout> {
    const id = randomUUID();
    const newWorkout: Workout = {
      ...workout,
      id,
      createdAt: new Date(),
    };
    this.workouts.set(id, newWorkout);
    return newWorkout;
  }

  async deleteWorkout(id: string, userId: string): Promise<boolean> {
    const workout = this.workouts.get(id);
    if (workout && workout.userId === userId) {
      return this.workouts.delete(id);
    }
    return false;
  }

  // Schedule operations
  async getScheduleItems(userId: string, date: string): Promise<ScheduleItem[]> {
    return Array.from(this.scheduleItems.values())
      .filter(item => item.userId === userId && item.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  async createScheduleItem(item: InsertScheduleItem & { userId: string }): Promise<ScheduleItem> {
    const id = randomUUID();
    const scheduleItem: ScheduleItem = {
      ...item,
      id,
      createdAt: new Date(),
    };
    this.scheduleItems.set(id, scheduleItem);
    return scheduleItem;
  }

  async deleteScheduleItem(id: string, userId: string): Promise<boolean> {
    const item = this.scheduleItems.get(id);
    if (item && item.userId === userId) {
      return this.scheduleItems.delete(id);
    }
    return false;
  }

  // Meal operations
  async getMeals(userId: string): Promise<Meal[]> {
    return Array.from(this.meals.values())
      .filter(meal => meal.userId === userId)
      .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  }

  async createMeal(meal: InsertMeal & { userId: string }): Promise<Meal> {
    const id = randomUUID();
    const newMeal: Meal = {
      ...meal,
      id,
      createdAt: new Date(),
    };
    this.meals.set(id, newMeal);
    return newMeal;
  }

  async deleteMeal(id: string, userId: string): Promise<boolean> {
    const meal = this.meals.get(id);
    if (meal && meal.userId === userId) {
      return this.meals.delete(id);
    }
    return false;
  }
}

export const storage = new MemStorage();
