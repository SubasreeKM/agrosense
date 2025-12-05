import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, Plus, Check, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

const initialTasks: Task[] = [
  { id: '1', text: 'Water tomato plants', completed: true, date: 'Today' },
  { id: '2', text: 'Apply fertilizer to wheat field', completed: false, date: 'Today' },
  { id: '3', text: 'Check irrigation system', completed: false, date: 'Tomorrow' },
  { id: '4', text: 'Harvest ripe vegetables', completed: false, date: 'Wed' },
];

export function TodoPreview() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: newTask, completed: false, date: 'Today' }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth/10 text-earth text-sm font-medium mb-4">
            <ListTodo className="w-4 h-4" />
            Task Manager
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Stay Organized with Farm Tasks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep track of all your farming activities with our simple 
            and intuitive task manager.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <Card variant="elevated">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-accent" />
                  Today's Tasks
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{tasks.length} done
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress */}
              <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full gradient-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Add Task */}
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

              {/* Tasks List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        task.completed ? 'bg-accent/5' : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                      <span className={`flex-1 text-sm ${
                        task.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}>
                        {task.text}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.date}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
