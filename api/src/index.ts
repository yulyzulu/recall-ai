import express, { type Request, type Response } from "express";

type Nota = { id: number; titulo: string };

const notas: Nota[] = [                      // por ahora en memoria; en noviembre, PostgreSQL
  { id: 1, titulo: "Closures" },
  { id: 2, titulo: "Cliente, servidor y API" },
  { id: 3, titulo: "RAG paso a paso" }
];

const app = express();
app.use(express.json());                     // middleware: lee cuerpos JSON

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

app.get("/notas", (req: Request, res: Response) => {
  res.json(notas);                           // sin status: Express usa 200
});

app.get("/notas/:id", (req: Request, res: Response) => {
  const nota = notas.find(n => n.id === Number(req.params.id));
  if (!nota) {
    res.status(404).json({ error: "Nota no encontrada" });
    return;
  }
  res.json(nota);
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));