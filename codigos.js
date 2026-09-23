
const supabaseUrl = 'https://wufqpdujbuvsvjtfagiv.supabase.co';

const supabaseKey =
    'sb_publishable_UXPWKCl0vWuM-lgwKvr-dQ_V47i30ll';


// Cliente de Supabase
let supabaseClient = null;


// ============================================
// CUANDO CARGA EL HTML
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    console.log("JavaScript cargado correctamente");


    // -----------------------------
    // BOTÓN CONECTAR
    // -----------------------------

    const btnConectar =
        document.getElementById('btnConectar');

    if (btnConectar) {

        btnConectar.addEventListener(
            'click',
            conectarSupabase
        );

    } else {

        console.error(
            "No se encontró btnConectar"
        );
    }


    // -----------------------------
    // BOTÓN BUSCAR
    // -----------------------------

    const btnBuscar =
        document.getElementById('btnBuscar');

    if (btnBuscar) {

        btnBuscar.addEventListener(
            'click',
            buscarCategoria
        );

    } else {

        console.error(
            "No se encontró btnBuscar"
        );
    }

});


// ============================================
// CONECTAR CON SUPABASE
// ============================================

function conectarSupabase() {

    try {

        // Verificamos que la librería esté cargada
        if (typeof supabase === 'undefined') {

            alert(
                "ERROR: La librería de Supabase no está cargada."
            );

            console.error(
                "No existe window.supabase"
            );

            return;
        }


        // Creamos el cliente solamente una vez
        if (!supabaseClient) {

            supabaseClient =
                supabase.createClient(
                    supabaseUrl,
                    supabaseKey
                );

        }


        console.log(
            "Cliente Supabase:",
            supabaseClient
        );


        alert(
            "✅ CONEXIÓN EXITOSA"
        );


    } catch (error) {

        console.error(
            "Error al conectar:",
            error
        );

        alert(
            "❌ ERROR DE CONEXIÓN: " +
            error.message
        );

    }

}


// ============================================
// BUSCAR CATEGORÍA
// ============================================

async function buscarCategoria() {

    console.log(
        "Botón BUSCAR presionado"
    );


    // --------------------------------
    // Verificar conexión
    // --------------------------------

    if (!supabaseClient) {

        alert(
            "⚠️ Primero debes presionar CONECTAR"
        );

        return;
    }


    // --------------------------------
    // Obtener valores
    // --------------------------------

    const inputId =
        document.getElementById(
            'id_categoria'
        );

    const inputNombre =
        document.getElementById(
            'nombre_categoria'
        );

    const inputEstado =
        document.getElementById(
            'estado'
        );


    const id =
        inputId.value.trim();

    const nombre =
        inputNombre.value.trim();


    console.log("ID:", id);
    console.log("Nombre:", nombre);


    // --------------------------------
    // Validar búsqueda
    // --------------------------------

    if (!id && !nombre) {

        alert(
            "⚠️ Ingresa un ID o un Nombre para buscar"
        );

        return;
    }


    try {

        // --------------------------------
        // Crear consulta
        // --------------------------------

        let query =
            supabaseClient
                .from('categorias')
                .select('*');


        // --------------------------------
        // Buscar por ID
        // --------------------------------

        if (id) {

            query =
                query.eq(
                    'id_categoria',
                    id
                );

        }


        // --------------------------------
        // Buscar por nombre
        // --------------------------------

        if (nombre) {

            query =
                query.ilike(
                    'nombre',
                    `%${nombre}%`
                );

        }


        console.log(
            "Ejecutando consulta..."
        );


        // --------------------------------
        // Ejecutar consulta
        // --------------------------------

        const {
            data,
            error
        } = await query;


        // --------------------------------
        // Comprobar error
        // --------------------------------

        if (error) {

            console.error(
                "Error de Supabase:",
                error
            );

            throw error;
        }


        console.log(
            "Datos encontrados:",
            data
        );


        // --------------------------------
        // No hay resultados
        // --------------------------------

        if (!data || data.length === 0) {

            alert(
                "❌ No se encontró ninguna categoría"
            );

            return;
        }


        // --------------------------------
        // Mostrar resultado
        // --------------------------------

        inputId.value =
            data[0].id_categoria;

        inputNombre.value =
            data[0].nombre;

        inputEstado.value =
            data[0].estado;


        // --------------------------------
        // Mensaje
        // --------------------------------

        alert(
            `✅ Se encontraron ${data.length} resultado(s).`
        );


    } catch (error) {

        console.error(
            "Error completo:",
            error
        );


        alert(
            "❌ Error al buscar:\n" +
            error.message
        );

    }

}
