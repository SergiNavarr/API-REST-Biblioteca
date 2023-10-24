import { pool } from "./database.js";

class LibroController{
    async getAll(req, res){
        try{
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        }catch(error){
            console.log(error);
        }
    }

    async getOne(req, res){
        try{
            const libro = req.body;
            const id_libro = parseInt(libro.id);
            const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [id_libro]);
            if (result.length === 0) {
                throw new Error('Libro no encontrado.');
            }
            res.json(result);
        }catch(error){
            console.log(error);
            res.status(404).json({error: 'id inexistente'});
        }
    }
    
    async add(req, res){
        try{
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?,?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
            res.json({"Id insertado": result.insertId});
        }catch(error){
            console.log(error);
        }
    }

    async delete(req, res){
        try{
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
            res.json({"Registros eliminados": result.affectedRows});
        }catch(error){
            console.log(error);
        }
    }

    async update(req, res){
        try{
            const libro = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año_publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN, libro.id]);
            res.json({"Registros actualizados": result.changedRows});
        }catch(error){
            console.log(error);
        }
    }
}

export const libro = new LibroController();