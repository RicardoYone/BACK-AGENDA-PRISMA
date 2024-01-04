import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

// Obtener todos los contactos
router.get("/", async (req, res) => {
  const contacts = await prisma.contact.findMany();
  res.render("index", { contacts });
});

// Mostrar el formulario para agregar un contacto
router.get("/new", (req, res) => {
  res.render("new");   
});

// Agregar un nuevo contacto
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  await prisma.contact.create({
    data: {
      name,
      email,
      phone,
    },
  });
  res.redirect("/");
});

// Mostrar el formulario para editar un contacto
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const contact = await prisma.contact.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.render("edit", { contact });
});

// Actualizar un contacto   PUT
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  await prisma.contact.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      phone,
    },
  });
  res.redirect("/");
});

// Eliminar un contacto   DELETE
router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await prisma.contact.delete({
    where: {
      id: Number(id),
    },
  });
  res.redirect("/");
});


export default router;
