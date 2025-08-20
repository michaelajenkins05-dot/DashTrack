import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMusicEntrySchema,
  insertTodoItemSchema, 
  insertProjectSchema,
  insertHabitSchema,
  insertWorkoutSchema,
  insertScheduleItemSchema,
  insertMealSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const userId = "default-user-id"; // Using default user for simplicity

  // Music routes
  app.get("/api/music", async (req, res) => {
    try {
      const entries = await storage.getMusicEntries(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch music entries" });
    }
  });

  app.post("/api/music", async (req, res) => {
    try {
      const validatedData = insertMusicEntrySchema.parse(req.body);
      const entry = await storage.createMusicEntry({ ...validatedData, userId });
      res.json(entry);
    } catch (error) {
      res.status(400).json({ message: "Invalid music entry data" });
    }
  });

  app.delete("/api/music/:id", async (req, res) => {
    try {
      const success = await storage.deleteMusicEntry(req.params.id, userId);
      if (success) {
        res.json({ message: "Music entry deleted" });
      } else {
        res.status(404).json({ message: "Music entry not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete music entry" });
    }
  });

  // Todo routes
  app.get("/api/todos", async (req, res) => {
    try {
      const items = await storage.getTodoItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch todo items" });
    }
  });

  app.post("/api/todos", async (req, res) => {
    try {
      const validatedData = insertTodoItemSchema.parse(req.body);
      const item = await storage.createTodoItem({ ...validatedData, userId });
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid todo item data" });
    }
  });

  app.patch("/api/todos/:id", async (req, res) => {
    try {
      const updates = insertTodoItemSchema.partial().parse(req.body);
      const item = await storage.updateTodoItem(req.params.id, updates, userId);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Todo item not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const success = await storage.deleteTodoItem(req.params.id, userId);
      if (success) {
        res.json({ message: "Todo item deleted" });
      } else {
        res.status(404).json({ message: "Todo item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete todo item" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject({ ...validatedData, userId });
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const updates = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, updates, userId);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id, userId);
      if (success) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Habit routes
  app.get("/api/habits", async (req, res) => {
    try {
      const habits = await storage.getHabits(userId);
      res.json(habits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch habits" });
    }
  });

  app.post("/api/habits", async (req, res) => {
    try {
      const validatedData = insertHabitSchema.parse(req.body);
      const habit = await storage.createHabit({ ...validatedData, userId });
      res.json(habit);
    } catch (error) {
      res.status(400).json({ message: "Invalid habit data" });
    }
  });

  app.patch("/api/habits/:id", async (req, res) => {
    try {
      const updates = insertHabitSchema.partial().parse(req.body);
      const habit = await storage.updateHabit(req.params.id, updates, userId);
      if (habit) {
        res.json(habit);
      } else {
        res.status(404).json({ message: "Habit not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete("/api/habits/:id", async (req, res) => {
    try {
      const success = await storage.deleteHabit(req.params.id, userId);
      if (success) {
        res.json({ message: "Habit deleted" });
      } else {
        res.status(404).json({ message: "Habit not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete habit" });
    }
  });

  // Workout routes
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await storage.getWorkouts(userId);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workouts" });
    }
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      const validatedData = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout({ ...validatedData, userId });
      res.json(workout);
    } catch (error) {
      res.status(400).json({ message: "Invalid workout data" });
    }
  });

  app.delete("/api/workouts/:id", async (req, res) => {
    try {
      const success = await storage.deleteWorkout(req.params.id, userId);
      if (success) {
        res.json({ message: "Workout deleted" });
      } else {
        res.status(404).json({ message: "Workout not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete workout" });
    }
  });

  // Schedule routes
  app.get("/api/schedule", async (req, res) => {
    try {
      const date = req.query.date as string || new Date().toISOString().split('T')[0];
      const items = await storage.getScheduleItems(userId, date);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedule items" });
    }
  });

  app.post("/api/schedule", async (req, res) => {
    try {
      const validatedData = insertScheduleItemSchema.parse(req.body);
      const item = await storage.createScheduleItem({ ...validatedData, userId });
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid schedule item data" });
    }
  });

  app.delete("/api/schedule/:id", async (req, res) => {
    try {
      const success = await storage.deleteScheduleItem(req.params.id, userId);
      if (success) {
        res.json({ message: "Schedule item deleted" });
      } else {
        res.status(404).json({ message: "Schedule item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete schedule item" });
    }
  });

  // Meal routes
  app.get("/api/meals", async (req, res) => {
    try {
      const meals = await storage.getMeals(userId);
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  app.post("/api/meals", async (req, res) => {
    try {
      const validatedData = insertMealSchema.parse(req.body);
      const meal = await storage.createMeal({ ...validatedData, userId });
      res.json(meal);
    } catch (error) {
      res.status(400).json({ message: "Invalid meal data" });
    }
  });

  app.delete("/api/meals/:id", async (req, res) => {
    try {
      const success = await storage.deleteMeal(req.params.id, userId);
      if (success) {
        res.json({ message: "Meal deleted" });
      } else {
        res.status(404).json({ message: "Meal not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete meal" });
    }
  });

  return httpServer;
}
