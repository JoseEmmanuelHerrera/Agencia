const express = require('express');
const router  = express.Router();

const pool = require('../database.js');

router.get('/', async(req, res) =>{
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos
    });
}) 

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        auto:auto
    });

});

router.post('/create', async(req, res) => {
var creacion = new Date().toISOString();
const { nombre, matricula, verificacion, fechaRegistro, marca } = req.body;
const auto = {
    nombre, matricula, verificacion, fechaRegistro: creacion, estado: 1, marca
};
    await pool.query('INSERT INTO autos set ?', [auto]);
    res.json({
        status: 200,
        message: "Se ha creado correctamente",
        auto:auto
    });

});

router.post('/update/:id', (req, res) => {
    var actualizacion = new Date().toISOString();
    const { id } = req.params;
    const { nombre, matricula, verificacion, fechaActualizacion, marca } = req.body;

    const auto = { nombre, matricula, verificacion, fechaActualizacion: actualizacion, marca };

    pool.query('UPDATE autos SET ? WHERE  id = ?', [auto, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        auto:auto
    });
});

router.post('/delete/:id', async(req, res) =>{
   const { id } = req.params;
   await pool.query('UPDATE autos SET estado = 0 WHERE id = ?', [id]);
   res.json({
       status: 200,
       message: "Se ha eliminado corectamente"
   });
});


module.exports = router;