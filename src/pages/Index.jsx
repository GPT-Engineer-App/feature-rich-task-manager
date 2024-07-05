import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, description: "", dueDate: "", priority: "" }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Add a task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask} className="ml-2">Add</Button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Checkbox className="mr-2" />
                  <span>{task.name}</span>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Task Name"
                          value={selectedTask?.name || ""}
                          onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                        />
                        <Textarea
                          placeholder="Description"
                          value={selectedTask?.description || ""}
                          onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                        />
                        <Input
                          type="date"
                          placeholder="Due Date"
                          value={selectedTask?.dueDate || ""}
                          onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                        />
                        <Input
                          placeholder="Priority"
                          value={selectedTask?.priority || ""}
                          onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                        />
                        <Button
                          onClick={() => {
                            updateTask(index, selectedTask);
                            setSelectedTask(null);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;