const supabaseUrl = 'https://wufqpdujbuvsvjtfagiv.supabase.co';
const supabaseKey = 'sb_publishable_UXPWKCl0vWuM-lgwKvr-dQ_V47i30ll';

// Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// Esperamos a que el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar en el HTML");
    }

    // Botón BUSCAR
    const btnBuscar = document.getElementById('btnbuscar');

    if (btnbuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar en el HTML");
    }
});


// Función para conectar con Supabase
function conectarSupabase() {
    try {

        // Si aún no existe el cliente, lo creamos
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(
                supabaseUrl,
                supabaseKey
            );
        }

        alert("CONEXIÓN EXITOSA");

        console.log(
            "Cliente Supabase inicializado correctamente:",
            supabaseClient
        );

    } catch (error) {

        alert("ERROR DE CONEXIÓN");

        console.error(
            "Detalles del error:",
            error
        );
    }
}


// Función para buscar una categoría
async function buscarCategoria() {

    // Verificar que el cliente esté conectado
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    // Obtener los valores del formulario
    const id = document
        .getElementById('id_categoria')
        .value
        .trim();

    const nombre = document
        .getElementById('nombre_categoria')
        .value
        .trim();

    // Validar que al menos uno esté lleno
    if (!id && !nombre) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {

        // Construir la consulta
        let query = supabaseClient
            .from('categorias')
            .select('*');

        // Filtrar por ID
        if (id) {
            query = query.eq('id_categoria', id);
        }

        // Filtrar por nombre
        if (nombre) {
            query = query.ilike(
                'nombre',
                `%${nombre}%`
            );
        }

        // Ejecutar consulta
        const { data, error } = await query;

        if (error) {
            throw error;
        }

        // No hay resultados
        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // Mostrar el primer resultado
        document.getElementById('id_categoria').value =
            data[0].id_categoria;

        document.getElementById('nombre_categoria').value =
            data[0].nombre;

        document.getElementById('estado').value =
            data[0].estado;

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

        console.log("Resultados encontrados:", data);

    } catch (error) {

        alert("Error al buscar ❌: " + error.message);

        console.error(
            "Detalle del error:",
            error
        );
    }
}


