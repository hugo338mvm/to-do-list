export interface Tarefa {
  id: string;
  title: string;
  completed: boolean;
}

export interface ICriarTarefa {
  title: string;
}

// Banco de dados em memória (reseta ao salvar o código)
const bancoDeDadosEmMemoria: Tarefa[] = [];

export class TarefaService {
  create({ title }: ICriarTarefa) {
    if (!title) {
      throw new Error("O título da tarefa é obrigatório.");
    }
    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false,
    };
    bancoDeDadosEmMemoria.push(novaTarefa);
    return novaTarefa;
  }

  list(completedFilter?: string) {
    if (completedFilter !== undefined) {
      const isCompleted = completedFilter === 'true';
      return bancoDeDadosEmMemoria.filter(tarefa => tarefa.completed === isCompleted);
    }
    return bancoDeDadosEmMemoria;
  }

  findById(id: string) {
    const tarefa = bancoDeDadosEmMemoria.find(t => t.id === id);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }
    return tarefa;
  }

  update(id: string, title?: string, completed?: boolean) {
    const tarefa = this.findById(id);
    
    if (title !== undefined) tarefa.title = title;
    if (completed !== undefined) tarefa.completed = completed;
    
    return tarefa;
  }

  delete(id: string) {
    const index = bancoDeDadosEmMemoria.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error("Tarefa não encontrada.");
    }
    bancoDeDadosEmMemoria.splice(index, 1);
  }
}