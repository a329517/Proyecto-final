<template>
  <div>

    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()">
      <p>
        <input type="text" v-model="titulo">

        <button type="submit">{{estatusEditar ? "Editar": "Agregar"}}</button>
        <button v-if="estatusEditar" @click="estatusEditar= false, titulo=''">Cancelar</button>
      </p>
    </form>

    <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
    
    Lista de libros

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.titulo}} - 
        <button @click="deleteTodo(todo)">Eliminar</button> - 
        <button @click="selectTodo(todo)">Editar</button>

      </li>
    </ul>

  </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',

  data() {
    return {
      todos: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false 
    }
  },

  created(){
    this.listarTodos();
  },

  methods: { 
    async listarTodos(){

          this.cargando = true;
          const data = await db.collection("todos").get();
          this.todos = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
         this.cargando = false;
    console.log(this.todos);

    },
    async addTodo() {
        await db.collection('todos').add(
          {
            titulo: this.titulo
          }
        )
        this.titulo = "";
        this.listarTodos();
    },

    async deleteTodo(todo){
      if(confirm(`Esta seguro de querer eliminar ${todo.titulo}`)){
      await db.collection('todos').doc(todo.id).delete();
      this.listarTodos();
      }
    },

    selectTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.titulo = todo.titulo;
    },

    async updateTodo(){
      await db.collection('todos').doc(this.id).set({
        titulo: this.titulo
      })
      this.estatusEditar = false;
      this.id= "";
      this.titulo= "";
      this.listarTodos();
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>
