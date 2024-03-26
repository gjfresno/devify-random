console.log("Comenzando la generación del diagrama de flujo...");

var nodes = [];
var edges = [];
var nodeIds = {}; // Almacenar IDs de nodos para garantizar unicidad
var network = null;

var dataInit = {
    DEVIFY: {
        SEGURIDAD: {},
        BACKEND: {},
        FRONTEND: {},
        DEVOPS: {},
        MOBILE: {},
        OBSERVABILIDAD: {},
        CLOUDS: {},
        FUTURE: {}
    }
};

displayJSON(dataInit);

var dataFrontend = {
  Frontend: {
    Frameworks: {
      React: ["SantiJr", "JuanMa", "Lucas", "Juli"],
      Next: ["SantiJr", "Lucas", "Juli"],
      Angular: [],
      Vue: ["Lucas"],
      ReactNative: ["?? CAPACITAR ??"]
    },
    Testing: {
      Cypress: ["Juli"],
      Jest: ["Lucas", "JuanMa", "SantiJr"]
    }
  }
};

var dataSeguridad = {
  Seguridad: {
    KEYCLOAK: ["Dami"],
    COGNITO: ["?? CAPACITAR ??"],
    OKTA: ["?? CAPACITAR ??"],
    IAM: ["?? CAPACITAR ??"],
    SPRING_SECURITY: ["Dami"],
  }
}

var dataDevops = {
  Devops: {
    GITLAB_PIPELINE: ["Gero"],
    JENKINS: ["?? CAPACITAR ??"],
    GITHUB_ACTION: ["Gero"],
  }
}

var dataMobile = {
  Mobile: {
    REACT_NATIVE: ["JuanMa"],
    KOTLIN: ["?? CAPACITAR ??"],
    ANDROID: ["Tavo"],
    OBJECTIVE_C: ["?? CAPACITAR ??"],
  }
}

var dataObservabilidad = {
  Observabilidad: {
    KIBANA: ["Nacho", "Tavo"],
    OPENTELEMETRY: ["Nacho", "Tavo"],
    JAEGGER: ["Nacho", "Tavo"],
    ELASTIC_SEARCH: ["?? CAPACITAR ??"],
  }
}

var dataBackend = {
  Backend: {
      JAVA: {
        Camel: ["JuanPi"],
        ArquitecturaHexagonal: ["Gero"],
        CCC: ["Marian", "Nacho"],
        Soap: ["Marce"],
        Gradle: ["?? CAPACITAR ??"],
        ArquetiposMaven: ["Tavo"],
        Springboot: {
            MVC: ["Lean", "JuanPi"],
            Webflux: ["Gero", "JuanPi", "Marce", "Marian"],
            SpringSecurity: ["Dami"],
            SpringCloud: ["JuanPi"],
        },
        Testing: {
            JBehave: ["Marce"],
            Mockito: ["JuanPi"],
        }
      },
      PYTHON: {
        Framework: {
            Django: ["Tomi", "July"],
            FastApi: ["Tomi", "July", "Marian", "Tavo"],
            Flask: ["Tomi", "July", "Marian"],
        },
        Cloud: {
            AWS_Boto3: ["July"],
            GCP: ["July"],
            AZURE: ["?? CAPACITAR ??"],
        },
        Testing: {
            Pytest: ["Tomi", "July"],
            PyUnit: ["?? CAPACITAR ??"],
        }
      },
      BaseDeDatos: {
        SQL: {
            Modelado: ["Marce", "JuanPi", "July"],
            GestionDeEsquemas: ["Gero", "JuanPi", "July", "Tomi"],
            GestionDeObjetos: ["Marce", "JuanPi", "JuanMa"],
        },
        NoSQL: {
            GestionDeEsquemas: ["Nacho", "JuanMa", "July"],
        }
      },
      JAVASCRIPT_TYPESCRIPT: {
        Framework: {
            Node:["Lucas", "JuanMa", "Marce", "SantiJr"],
            Nest:["Lucas", "JuanMa", "SantiJr"],
        },
        Testing: ["JuanMa (Nest)"],
      },
      EVENTOS: {
        Kafka: ["Tavo", "Nacho"],
        RabitMQ: ["?? CAPACITAR ??"],
        SQS: ["Marce", "Nacho"],
      },
      CACHE: {
        Redis: ["Tavo", "July", "Nacho"],
        INFINISPAN:  ["Gero"],
      },
    }
};

// Función para generar un ID único para el nodo
function generateNodeId(name) {
  var id = name.replace(/\s/g, ''); // Eliminar espacios
  var index = 0;
  while (nodeIds[id + index]) {
    index++;
  }
  nodeIds[id + index] = true;
  return id + index;
}

function generateNodesAndEdges(data, parentNodeId, level) {
  var nodesAndEdges = { nodes: [], edges: [] };

  var offsetY = 0;
  var direction = 1; // Variable para alternar la dirección de desplazamiento
  //var colors = ['#FF5733', '#FF6347', '#FF8C00', '#FFA07A', '#FFD700'];
  //var colors = ['#00FFFF', '#00BFFF', '#1E90FF', '#4169E1', '#0000FF'];
  //var colors = ['#D820B4', '#B521D9', '#8116D4', '#3929C8', '#1E8ED8', '#28CACD'];
  var colors = ['#0000FF', '#1E8ED8', '#3929C8', '#8116D4', '#B521D9', '#D820B4'];

  for (var key in data) {
    if(key.length <= 1)
        continue;

    var names = "";
    if(data[key].length > 0){
        for (var i = 0; i < data[key].length; i++) {
            var expertName = data[key][i];
            if (expertName) {
                names += expertName + ", ";
            }
        }
    }

    offsetY += 500 * direction;
    direction *= -1;

    var nodeId = generateNodeId(key);
    var node = {
        id: nodeId,
        level: level,
        size: 60 - level * 10,
        label: key,
        shape: 'dot',
        title: names,
        color: {
            border: '#FFF0FF', // Cambia el color del borde del nodo según el nivel
            background: colors[level - 1] // Color de fondo del nodo (puedes ajustarlo si es necesario)
        }
    };

    nodesAndEdges.nodes.push(node);

    if (parentNodeId) {
      nodesAndEdges.edges.push({ from: parentNodeId, to: nodeId, width: 20 });
    }

    if (typeof data[key] === 'object' && Object.keys(data[key]).length > 0) {
      var childNodesAndEdges = generateNodesAndEdges(data[key], nodeId, level + 1);
      nodesAndEdges.nodes = nodesAndEdges.nodes.concat(childNodesAndEdges.nodes);
      nodesAndEdges.edges = nodesAndEdges.edges.concat(childNodesAndEdges.edges);
    }
  }

  return nodesAndEdges;
}

function displayJSON(data){

    nodes = [];
    edges = [];

    // Añadir nodos
    console.log("Generando nodos...");
    var rootNodeId = generateNodeId('root');
    var nodesAndEdges = generateNodesAndEdges(data, rootNodeId, 1);
    nodes = nodesAndEdges.nodes;
    edges = nodesAndEdges.edges;

    console.log("Nodos generados:", nodes);
    console.log("Aristas generadas:", edges);

    var container = document.getElementById("network");

    var networkData = {
      nodes: nodes,
      edges: edges,
    };
    var options = {

//        layout:{
//        hierarchical:
//            {
//              direction: 'LR',
//              enabled: true,
//              levelSeparation: 300, // Controla la distancia vertical entre los niveles del gráfico
//              nodeSpacing: 400, // Controla la distancia horizontal entre los nodos
//              treeSpacing: 500 // Controla la distancia horizontal entre los árboles (subgrafos)
//            }
//        },
//          physics: {
//            hierarchicalRepulsion: {
//              centralGravity: 0.001, // Para evitar que los nodos se agrupen en el centro
//              springLength: 1000, // Longitud de los resortes entre los nodos
//              nodeDistance: 1000, // Distancia mínima entre los nodos
//              springConstant: 0.0001, // Fuerza de los resortes
//              damping: 1 // Amortiguación
//            },
//            repulsion: {
//              nodeDistance: 1000, // Para evitar que los nodos se agrupen en el centro
//            },
//          },
//layout: {
//    hierarchical: {
//      enabled: true,
//      levelSeparation: 2500, // Aumenta la separación vertical entre niveles
//      nodeSpacing: 3000, // Aumenta la separación horizontal entre nodos en el mismo nivel
//      treeSpacing: 4000 // Aumenta la separación horizontal entre árboles (subgrafos)
//    }
//  },
//  physics: {
//    barnesHut: {
//      gravitationalConstant: -2000, // Ajusta la gravedad para dispersar los nodos
//      springConstant: 0.05, // Fuerza de los resortes
//      damping: 0.09 // Amortiguación
//    },
//    stabilization: {
//      iterations: 2500 // Ajusta el número de iteraciones para la estabilización
//    }
//  },
      nodes: {
        shape: "dot",
        font: "17px arial black", // Cambiar el tamaño de la letra de los nodos

      },
    };

    network = new vis.Network(container, networkData, options);

    // Manejar el clic en los nodos del primer diagrama
    network.on("click", function(properties) {
        if (properties.nodes.length > 0) {
            var clickedNodeId = properties.nodes[0].replace(new RegExp("[0-9]"), "");
            console.log("clickedNodeId: " + clickedNodeId);
            // Cargar el nuevo JSON según el nodo clickeado

            switch (clickedNodeId) {
              case "FRONTEND":
                displayJSON(dataFrontend);
                break;
              case "MOBILE":
                displayJSON(dataMobile);
                break;
              case "DEVOPS":
                displayJSON(dataDevops);
                break;
              case "OBSERVABILIDAD":
                displayJSON(dataObservabilidad);
                break;
              case "CLOUDS":
                displayJSON(dataClouds);
                break;
              case "FUTURE":
                displayJSON(dataFuture);
                break;
              case "BACKEND":
                displayJSON(dataBackend);
                break;
              default:
                displayJSON(dataInit);
                break;
            }


        }
    });

    console.log("Diagrama de flujo generado con éxito.");
}