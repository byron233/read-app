const { throws } = require('assert');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfUtils = require('pdf-to-text');
const fs = require('fs-extra');

//configuraciones de multer
var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../uploads'));
        console.log('Se subio el archivo')
    },
    filename: (req, file, cb) =>{
        cb(null,  Date.now() + '-' + file.originalname)
    }
});
var upload = multer({
    storage,
    dest: path.join(__dirname, '/uploads'),
    fileFilter: (req, file, cb)=>{
        const fileTypes = /.pdf|.doc|.docx/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }else{
            //Error
            cb('Error: Archivo no soportado');
        }

    }
}).single('doc');

router.get(('/'), (req,res)=>{
    res.render('index');
});

router.post('/game', (req, res)=>{
    var {txt, numbWords} = req.body;
    res.render('game',{txt, numbWords});
});

router.post('/pdf', upload , async(req, res)=>{
    var errors;
    var pdfPath = req.file.path;
    var name = req.file.originalname;
    pdfUtils.info(pdfPath, (err, info)=>{
         if(err){
             throws(err);
         }else{
             //Sirviendo
            var {author, pages} = info;

        
            pdfUtils.pdfToText(pdfPath, (err, data)=>{
                if(err){
                    throws(err)
                }else{
                    console.log(req.file)
                    setTimeout(()=>{
                        res.json({
                            name,
                            author,
                            pages,
                            text: data,
                            path: req.file.filename
                        });
                    },2000)
                }
            });
            
         }
    });

    


    //Sirviendo
    
})

router.post('/pages/:desde/:hasta/:pathFile', (req, res)=>{
    var  {hasta, desde, pathFile} = req.params;
    var options = {from: desde, to: hasta};
    var pdfPath = path.join(__dirname, `../uploads/${pathFile}`);
    pdfUtils.pdfToText(pdfPath, options, (err, data)=>{
        if(err){
            throws(err)
        }else{
            setTimeout(()=>{
                res.json({
                    text: data
                });
            },2000)
        }
    });
})

router.delete('/:name', (req, res)=>{
    var {name} = req.params;
    var pdfPath = path.join(__dirname, `../uploads/${name}`);
    fs.remove(pdfPath, err=>{
        if(err) throw err;
        res.json({msg:'success!'})
    })
})


module.exports = router;