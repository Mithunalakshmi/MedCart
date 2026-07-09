const db = require("../config/db");

// Total Revenue Monthwise
const getRevenueGraph = (req, res) => {

    const sql = `
        SELECT
        MONTH(created_at) AS month,
        SUM(total_price) AS revenue
        FROM orders
        GROUP BY MONTH(created_at)
        ORDER BY MONTH(created_at)
    `;

    db.query(sql,(err,result)=>{

        if(err)
            return res.status(500).json(err);

        res.json(result);

    });

};


// Sales Graph
const getSalesGraph = (req,res)=>{

    const sql=`
        SELECT
        MONTH(created_at) AS month,
        COUNT(id) AS orders
        FROM orders
        GROUP BY MONTH(created_at)
        ORDER BY MONTH(created_at)
    `;

    db.query(sql,(err,result)=>{

        if(err)
            return res.status(500).json(err);

        res.json(result);

    });

};

module.exports={

    getRevenueGraph,
    getSalesGraph

};