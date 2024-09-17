// Iniciar o grafo
const shoppings =
  "Iguatemi Parangaba NorthShopping ViaSul Benfica NorthShoppingFortaleza".split(
    " "
  );

const rotas = [
  ["Iguatemi", "Parangaba"],
  ["Parangaba", "NorthShopping"],
  ["ViaSul", "Benfica"],
  ["NorthShoppingFortaleza", "Iguatemi"],
  ["Parangaba", "NorthShopping"],
  ["ViaSul", "Iguatemi"],
  ["Benfica", "Iguatemi"],
  ["Iguatemi", "NorthShopping"],
];

// O grafo sera iniciado como uma lista de adjacencia
const listaAdjacencia = new Map();

// Vertice
function addVertice(shopping) {
  listaAdjacencia.set(shopping, []);
}

// Aresta, unidirecional
function addAresta(origem, destino) {
  listaAdjacencia.get(origem).push(destino);
  listaAdjacencia.get(destino).push(origem);
}

// Criando um grafo
shoppings.forEach(addVertice);
rotas.forEach((rota) => addAresta(...rota));

console.log(listaAdjacencia);
console.log("---------------------------------------------------------------------------");

// BFS - Breadth first Search (Todas as rotas para depois achar qual a mais eficiente)

function bfs(primeiro) {
    const visitado = new Set();
    const fila = [primeiro];

  while (fila.length > 0) {
    const shopping = fila.shift();
    const destinos = listaAdjacencia.get(shopping);

    for (const destino of destinos) {
      //Encontrar um caminho para NorthShoppingFortaleza
      if (destino === "NorthShoppingFortaleza") {
        console.log("BFS - Destino Encontrado!");

      }
      //Criar um vetor de destinos visitados para nao repetir varias vezes desnecessariamente
      if (!visitado.has(destino)) {
        visitado.add(destino);
        fila.push(destino);
        console.log(destino);
      }
    }
  }
}

bfs("Iguatemi");

console.log("---------------------------------------------------------------------------");
// DFS - Depth First Search (Inves de buscarmos cada shopping e destino, 
//nos buscamos pela child do primeiro, entao a child do atual e por ai vai)

function dfs(primeiro, visitado = new Set()){

    console.log(primeiro);
    visitado.add(primeiro);

    const destinos = listaAdjacencia.get(primeiro);

    for(const destino of destinos){
        if (destino === 'NorthShoppingFortaleza') {
            console.log(`DFS - Achou o Shopping!`)
            return;
        }

        if (!visitado.has(destino)) {
            dfs(destino, visitado);
        }
    }
}

dfs("Parangaba")
