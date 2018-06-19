const moment = require('moment')
const addEvent=(req,res)=>{

    const { body } = req;
   // console.log(req.body)
    req.app.get('db')
            .create_event([body.title,body.start,body.end,
            body.projId
            ])
            .then(response=>res.status(200).json('hi babe'))
}

const getEvent=(req,res)=>{
   // console.log('params',req.params.id)
    
    const { id } = req.params;
    req.app.get('db')
            .get_events([id])
            .then(response=>{
                
              const result = response.map(element=>{
                
                    return {
                        
                        title: element.title,
                        end: element.end_date,
                        start: element.start_date
                    }
                })
                res.status(200).json(result)
            })
}


module.exports={
    addEvent,
    getEvent
}

