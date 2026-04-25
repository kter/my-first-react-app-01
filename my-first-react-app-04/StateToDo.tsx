type Todo = {
  id: number;
  title: string;
  created: Date;
  isDone: boolean;
};

export default function StateTodo() {
  ...
  // State (todo)はTodo型の配列
  const [todo, setTodo] = useState<Todo[]>([]);
}
