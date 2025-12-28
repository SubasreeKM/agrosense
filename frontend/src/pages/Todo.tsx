import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { AppFooter } from '@/components/layout/AppFooter';
import { api } from '@/lib/api';

interface Task {
  id: string;
  task: string;
  completed: boolean;
  created_at?: string;
}

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH TODOS ---------------- */
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.getTodos();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ---------------- ADD TODO ---------------- */
  const addTask = async () => {
    if (!newTask.trim()) return;

    await api.addTodo(newTask);
    setNewTask('');
    fetchTodos();
  };

  /* ---------------- TOGGLE TODO ---------------- */
  const toggleTask = async (id: string, completed: boolean) => {
    await api.updateTodo(id, !completed);

    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  /* ---------------- DELETE TODO ---------------- */
  const deleteTask = async (id: string) => {
    await api.deleteTodo(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth/10 text-earth text-sm font-medium mb-4">
              <ListTodo className="w-4 h-4" />
              Task Manager
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Farm Task Manager
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your daily farming activities efficiently.
            </p>
          </motion.div>

          {/* CARD */}
          <div className="max-w-2xl mx-auto">
            <Card variant="elevated">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-accent" />
                    Your Tasks
                  </CardTitle>

                  <span className="text-sm text-muted-foreground">
                    {completedCount}/{tasks.length} done
                  </span>
                </div>
              </CardHeader>

              <CardContent>

                {/* PROGRESS BAR */}
                <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full gradient-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${tasks.length
                        ? (completedCount / tasks.length) * 100
                        : 0}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* ADD TASK */}
                <div className="flex gap-2 mb-6">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask} variant="hero" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* TASK LIST */}
                {loading ? (
                  <p className="text-center text-muted-foreground">
                    Loading tasks...
                  </p>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                            task.completed
                              ? 'bg-accent/5'
                              : 'bg-muted/50 hover:bg-muted'
                          }`}
                        >
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() =>
                              toggleTask(task.id, task.completed)
                            }
                          />

                          <span
                            className={`flex-1 text-sm ${
                              task.completed
                                ? 'line-through text-muted-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {task.task}
                          </span>

                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Today
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
