let array = [];
document.getElementById("agregar").addEventListener("click", agregarTarea);
document.getElementById("borrar_todo").addEventListener("click", borrarTodo);
document
  .getElementById("borrar_completadas")
  .addEventListener("click", borrarTareasCompletadas);

// 5. Añadimos un <SELECT> para poder filtrar tareas.
// (Ver index.html linea 20 e index.css linea 86)

let filtroEstado = "todas";

document
  .getElementById("filtro_estado")
  .addEventListener("change", cambiarFiltroEstado);

function cambiarFiltroEstado(event) {
  filtroEstado = event.target.value;

  // 7. Pintamos la lista cuando el filtro cambia.
  pintarLista();
}

//

function borrarTodo() {
  array.splice(0, array.length);

  localStorage.setItem('tareas', JSON.stringify(array));

  pintarLista();
}

function borrarTareasCompletadas() {
  for (var i = array.length - 1; i >= 0; i--) {
    const tarea = array[i];
    if (tarea.estado === "completada") {
      array.splice(i, 1);
    }
  }

  localStorage.setItem('tareas', JSON.stringify(array));

  pintarLista();
}

function agregarTarea() {
  if (array.length >= 5) {
    alert("Tienes demasiadas tareas, ¡termina una antes!");
    return;
  }

  const confirmarTareaNueva = window.confirm(
    "¿Estás seguro de qué quieres agregar la tarea?"
  );

  const inputNombreTarea = document.querySelector("#nombre_tarea");

  if (confirmarTareaNueva) {
    // 1. Guardamos las tareas como objetos en lugar de cadenas de texto.
    agregarTareaALista({
      texto: inputNombreTarea.value,
      estado: "pendiente"
    });
  }

  inputNombreTarea.value = "";
  inputNombreTarea.setAttribute("placeholder", "Más tareas, ñam, ñam!");
}

function agregarTareaALista(tarea) {
  array.push(tarea);

  localStorage.setItem('tareas', JSON.stringify(array));

  pintarLista();
}

function pintarLista() {
  const ul = document.getElementsByTagName("ul")[0];
  ul.innerHTML = "";

  for (const tarea of array) {
    // 6. Solo pintamos las tareas con el estado correcto.
    if (filtroEstado === "todas" || filtroEstado === tarea.estado) {
      const li = document.createElement("li");

      // 2. Guardamos el texto de la tarea en un SPAN para poder hacer click después.
      const spanTexto = document.createElement("span");
      spanTexto.appendChild(document.createTextNode(tarea.texto));
      spanTexto.classList.add("content");
      li.appendChild(spanTexto);

      // 3. Cambiamos el estado de la tarea al hacer click.
      spanTexto.onclick = function () {
        if (tarea.estado === "pendiente") {
          tarea.estado = "completada";
        } else {
          tarea.estado = "pendiente";
        }

        localStorage.setItem("tareas", JSON.stringify(array));

        pintarLista();
      };

      // 4. Añadimos una clase CSS a las tareas completadas.
      // (Ver index.css linea 47)
      if (tarea.estado === "completada") {
        li.classList.add("completed");
      }

      const span = document.createElement("span");

      span.onclick = function () {
        const nuevoArray = [];

        for (let i = 0; i < array.length; i++) {
          if (array[i] !== tarea) {
            nuevoArray.push(tarea);
          }
        }

        array = nuevoArray;

        localStorage.setItem('tareas', JSON.stringify(array));

        pintarLista();
      };

      span.className = "close";

      span.appendChild(document.createTextNode("\u00D7"));

      li.append(span);
      ul.appendChild(li);
    }
  }
}

pintarLista();
