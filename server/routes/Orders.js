const express = require("express");
const router = express.Router();
const { Orders, sequelize } = require('../models');
const nodemailer = require('nodemailer');

router.get("/getHistory/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' ORDER BY orders.orderId DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
});

router.get("/pendingOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='1' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/placedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='6' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/notDepositedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='4' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/depositedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='5' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/depositedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='5' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/acceptedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='3' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/dispatchedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='40' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/closedOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='38' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/delayOrders/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' AND orders.status='41' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/order/:oId", async (req, res) => {
    const oId = req.params.oId;
    const query = "SELECT orders.fullAmount, orderitems.id AS orderitemId, designs.id, designs.coverImage, designs.design_name, orderitems.quantity, orderitems.size, designs.price, (SELECT sizes.id FROM sizes WHERE sizes.size=orderitems.size) AS sizeId, SUM( orderitems.quantity * orderitems.purchasedUnitPrice ) AS totals, CASE WHEN orders.PaymentMethod = '7' AND orders.status = '1' THEN 1 WHEN orders.PaymentMethod = '9' AND orders.status = '4' THEN 1 ELSE 0 END AS canbecancel FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId INNER JOIN orders ON orders.orderId = orderitems.orderId INNER JOIN masterdata ON masterdata.id = orders.status WHERE orders.orderId = '" + oId + "' AND orderitems.isDeleted='0' GROUP BY orderitems.orderId, orderitems.itemId, orderitems.size ORDER BY orders.placedDate";
    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
});

router.get("/orderTotal/:oId", async (req, res) => {
    const oId = req.params.oId;
    const query = "SELECT orders.fullAmount FROM orders WHERE orders.orderId = '" + oId + "'";
    const orderFullAmount = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderFullAmount);
});

router.post("/cancelItem", async (req, res) => {
    const orderId = req.body.orderId;
    const itemId = req.body.itemId;
    const size = req.body.size;
    const removeWholeOrder = req.body.removeWholeOrder;


    const query = "UPDATE orderitems SET isDeleted='1' WHERE orderId='" + orderId + "' AND itemId='" + itemId + "' AND size='" + size + "'";
    const deleteItem = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    if (removeWholeOrder == 1) {
        const query = "UPDATE orders SET isDeleted='1', notifications='deleted', flag='0' WHERE orderId='" + orderId + "'";
        const deleteItem1 = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    } else {
        const quety1 = "SELECT SUM( CASE WHEN designs.discountedPrice IS NOT NULL THEN designs.discountedPrice * orderitems.quantity ELSE designs.price * orderitems.quantity END ) AS itemTotal FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId WHERE orderitems.orderId = '" + orderId + "' AND orderitems.isDeleted='0'";
        const totalItemValue = await sequelize.query(quety1, { type: sequelize.QueryTypes.SELECT });
        const quety2 = "SELECT deliveryValue, couponValue FROM orders WHERE orders.orderId = '" + orderId + "'";
        const ordervalues = await sequelize.query(quety2, { type: sequelize.QueryTypes.SELECT });
        var totals = Number(totalItemValue[0].itemTotal)+Number(ordervalues[0].deliveryValue)-Number(ordervalues[0].couponValue)
        const query3 = "UPDATE orders SET orders.notifications='edited',orders.flag='0', orders.fullAmount = "+totals+" WHERE orders.orderId = '"+orderId+"'";
        const deleteItem2 = await sequelize.query(query3, { type: sequelize.QueryTypes.UPDATE });

    }
    res.json(deleteItem);
})

router.post("/cancelOrder", async (req, res) => {
    const orderId = req.body.orderId;
    const query = "UPDATE orderitems SET isDeleted='1' WHERE orderitems.orderId='" + orderId + "'";
    const deleteOrder = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    const query1 = "UPDATE orders SET isDeleted='1', notifications='deleted', flag='0' WHERE orderId='" + orderId + "'";
    const deleteOrder1 = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    res.json(deleteOrder);
})

router.get("/byIdForUpdate/:id", async (req, res) => {

    const id = req.params.id;
    const query1 = "SELECT sizes.size,sizes.id AS sizeId, inventories.id, inventories.quantity from `sizes` INNER JOIN `inventories` on inventories.size_id=sizes.id INNER JOIN `designs` on inventories.colour_id=designs.color_id AND inventories.type_id=designs.type_id WHERE designs.id='" + id + "'";
    const sizeList = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
    res.json(sizeList);
})

router.get("/getuser/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = "SELECT * FROM users WHERE id='" + uid + "'";
    const customerDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(customerDetails);
})


router.put("/updateOrder", async (req, res) => {
    try {
        const oId = req.body.oId;
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;
        const size = req.body.sizeLabel;
        const prevSizeLabel = req.body.prevSizeLabel;
        const orderitemId = req.body.orderitemId;
        const prevQuantity = req.body.prevQuantity;
        const sizeId = req.body.size;
        const uid = req.body.uid;
        const uname = req.body.uname;
        const query = "UPDATE orderitems SET quantity='" + quantity + "' , size='" + size + "' WHERE id='" + orderitemId + "'";
        const updateList = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

        const quety1 = "SELECT SUM( CASE WHEN designs.discountedPrice IS NOT NULL THEN designs.discountedPrice * orderitems.quantity ELSE designs.price * orderitems.quantity END ) AS itemTotal FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId WHERE orderitems.orderId = '" + oId + "' AND orderitems.isDeleted='0'";
        const totalItemValue = await sequelize.query(quety1, { type: sequelize.QueryTypes.SELECT });
        const quety2 = "SELECT deliveryValue, couponValue FROM orders WHERE orders.orderId = '" + oId + "'";
        const ordervalues = await sequelize.query(quety2, { type: sequelize.QueryTypes.SELECT });
        var totals = Number(totalItemValue[0].itemTotal)+Number(ordervalues[0].deliveryValue)-Number(ordervalues[0].couponValue)
        const query3 = "UPDATE orders SET orders.notifications='edited',orders.flag='0',orders.fullAmount = "+totals+" WHERE orders.orderId = '"+oId+"'";
        const totalUpdate = await sequelize.query(query3, { type: sequelize.QueryTypes.UPDATE });
        // const query1 = "UPDATE orders SET orders.notifications='edited', orders.fullAmount =( SELECT SUM( designs.price * orderitems.quantity ) FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId WHERE orderitems.orderId = orders.orderId ) WHERE orders.orderId = '" + oId + "'";
        // const totalUpdate = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });

        if (quantity > prevQuantity) {
            const query2 = "UPDATE inventories SET quantity=quantity-('" + quantity + "'-'" + prevQuantity + "') WHERE size_id='" + sizeId + "' AND colour_id=(SELECT color_id FROM designs WHERE id='" + itemId + "') AND type_id=(SELECT type_id FROM designs WHERE id='" + itemId + "')";
            const inventUpdate1 = await sequelize.query(query2, { type: sequelize.QueryTypes.UPDATE });
        } else {
            const query3 = "UPDATE inventories SET quantity=quantity+('" + prevQuantity + "'-'" + quantity + "') WHERE size_id='" + sizeId + "' AND colour_id=(SELECT color_id FROM designs WHERE id='" + itemId + "') AND type_id=(SELECT type_id FROM designs WHERE id='" + itemId + "')";
            const inventUpdate2 = await sequelize.query(query3, { type: sequelize.QueryTypes.UPDATE });
        }
        const query4 = "SELECT * FROM users WHERE id='" + uid + "'";
        const customerDetails = await sequelize.query(query4, { type: sequelize.QueryTypes.SELECT });

        const query5 = "SELECT * FROM orders INNER JOIN masterdata ON orders.PaymentMethod=masterdata.id WHERE orderId='" + oId + "'";
        const orderDetails = await sequelize.query(query5, { type: sequelize.QueryTypes.SELECT });

        var emailDetails = {
            name: uname,
            orderId: oId,
            email: customerDetails[0].email,
            message: 'Dear customer, <br />Your order has been successfully edited. Thank you for shopping with us.',
            description: orderDetails[0].decription,
            url: '',
            subject: 'CeylonFolk order confirmation',
            total: orderDetails[0].fullAmount,
            urlMsg: ''
        }
        if (emailDetails.description === 'bank transfer') {
            emailDetails.description = 'Bank Deposit';
            emailDetails.urlMsg = 'Upload the deposit slip';
            emailDetails.url = 'http://localhost:3000/deposit?id=' + uid + '&orderIdFromEmail=' + oId + '';
        } else if (emailDetails.description === 'cash on delivery') {
            emailDetails.description = 'Cash on Delivery';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id=' + uid + '';
        } else if (emailDetails.description === 'payhere') {
            emailDetails.description = 'Online payment method';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id=' + uid + '';
        }
        sendEmail(emailDetails)
        res.json({ data: 1 });
    }
    catch (e) {
        res.json({ data: 0 });

    }
})

async function sendEmail(emailDetails) {
    const htmlEmail = `
            <h4> ${emailDetails.message} <h4>
            <ul> 
                <li>Name: ${emailDetails.name} </li>
                <li>Order ID: ${emailDetails.orderId} </li>
                <li>Total amount for the order: ${emailDetails.total} </li>
                <li>Payment method: ${emailDetails.description} </li>
            </ul>
            
            <p>${emailDetails.urlMsg}: <a href=${emailDetails.url}>Click here to route to the site</a></p>`


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "testceylonfolk@gmail.com",
            pass: "pkjjt@1234"
        }
    });
    const mailOptions = {
        from: 'testceylonfolk@gmail.com', // sender address
        to: emailDetails.email, // list of receivers
        replyTo: 'testceylonfolk@gmail.com',
        subject: emailDetails.subject, // Subject line
        text: emailDetails.message, // plain text body
        html: htmlEmail

    };
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return 0
        }
        else {
            return 1
        }
    });

}

router.get("/getUserDetails/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = "SELECT * FROM users WHERE id='" + uid + "'";
    const deposits = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(deposits);
})

router.get("/getCount", async (req, res) => {
    let data = [
        pendingOrders = '',
        acceptedOrders = '',
        dispatchedOrders = '',
        printedOrders = '',
    ]

    const query1 = "SELECT COUNT(status) AS pendingCount FROM orders WHERE status='1' AND isDeleted='0' OR status='4'AND isDeleted='0' OR status='5' AND isDeleted='0' OR status='6' AND isDeleted='0'";
    const pending = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: '',
        dispatchedOrders: '',
        printedOrders: '',
    }


    const query2 = "SELECT COUNT(status) AS acceptCount FROM orders WHERE status='3' AND isDeleted='0'";
    const accept = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: '',
        printedOrders: '',
    }


    const query3 = "SELECT COUNT(status) AS dispatchCount FROM orders WHERE status='40' AND isDeleted='0'";
    const dispatched = await sequelize.query(query3, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        printedOrders: '',
    }

    const query4 = "SELECT COUNT(status) AS rejectCount FROM orders WHERE status='41' AND isDeleted='0'";
    const rejected = await sequelize.query(query4, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        printedOrders: rejected[0].rejectCount,
    }
    res.json(data);
})

router.get("/getCustomizeCount", async (req, res) => {
    let data = [
        pendingOrders = '',
        acceptedOrders = '',
        dispatchedOrders = '',
        rejectedOrders = '',
        printedOrders = '',
    ]

    const query1 = "SELECT COUNT(status) AS pendingCount FROM customizeorders WHERE status='Pending' AND deleteFlag='false'";
    const pending = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: '',
        dispatchedOrders: '',
        rejectedOrders: '',
        printedOrders: '',
    }

    const query2 = "SELECT COUNT(status) AS acceptCount FROM customizeorders WHERE status='Accept' AND deleteFlag='false'";
    const accept = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: '',
        rejectedOrders: '',
        printedOrders: '',
    }

    const query3 = "SELECT COUNT(status) AS dispatchCount FROM customizeorders WHERE status='Dispatched' AND deleteFlag='false'";
    const dispatched = await sequelize.query(query3, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        rejectedOrders: '',
        printedOrders: '',
    }

    const query4 = "SELECT COUNT(status) AS rejectCount FROM customizeorders WHERE status='Rejected' AND deleteFlag='false'";
    const rejected = await sequelize.query(query4, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        rejectedOrders: rejected[0].rejectCount,
        printedOrders: '',
    }

    const query5 = "SELECT COUNT(status) AS printedCount FROM customizeorders WHERE status='Printed' AND deleteFlag='false'";
    const printed = await sequelize.query(query5, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        rejectedOrders: rejected[0].rejectCount,
        printedOrders: printed[0].printedCount,
    }
    res.json(data);
})

router.get('/getSales', async (req, res) => {
    try {
        const query1 = "CREATE OR REPLACE VIEW total_sales AS SELECT COALESCE(SUM(fullAmount),0) AS sales_amount FROM orders  WHERE status='40' UNION ALL SELECT COALESCE(SUM(totalAmount),0) AS sales_amount FROM customizeorders  WHERE status='Dispatched';";
        const query2 = "SELECT SUM(sales_amount) as sales_amount FROM total_sales;"
        const salesAmount = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
        res.json(salesAmount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/getAllPendingCount', async (req, res) => {
    try {
        const query1 = "CREATE OR REPLACE VIEW pendings AS SELECT COUNT(status) AS pendingCount FROM orders WHERE status='1' AND isDeleted='0' OR status='4'AND isDeleted='0' OR status='5' AND isDeleted='0' OR status='6' AND isDeleted='0' UNION ALL SELECT COUNT(status) AS pendingCount FROM customizeorders WHERE status='Pending' AND deleteFlag='false';";
        const query2 = "SELECT SUM(pendingCount) as sum_of_pendings FROM pendings;"
        const sumOfPendingCount = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
        res.json(sumOfPendingCount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/getInhouseDistribution', async (req, res) => {
    try {
        const query = "SELECT MONTHNAME(placedDate) Month, SUM(fullAmount) AS 'monthly_amount' FROM orders WHERE YEAR(placedDate) = '2021' && status='40' GROUP BY MONTH(placedDate)";
        const salesDistribution = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(salesDistribution);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/getCustomizeDistribution', async (req, res) => {
    try {
        const query = "SELECT MONTHNAME(placedDate) Month, SUM(totalAmount) AS 'monthly_amount' FROM customizeorders WHERE YEAR(placedDate) = '2021' && status='Dispatched' GROUP BY MONTH(placedDate)";
        const salesDistribution = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(salesDistribution);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/allOrders", async (req, res) => {
    const query = "SELECT orders.orderId, users.firstName, users.lastName, users.contactNo, orders.fullAmount, DATE(orders.placedDate) AS placedDate, masterdata.decription, ( SELECT masterdata.decription FROM `masterdata` WHERE masterdata.id = orders.PaymentMethod ) AS paymentMethodDescription FROM `orders` INNER JOIN `users` ON users.id = orders.customerId INNER JOIN `masterdata` ON masterdata.id = orders.status WHERE orders.isDeleted = 0 ORDER BY orders.placedDate ASC";
    const orders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orders);
})

router.get("/getOrders/:id", async (req, res) => {
    const id = req.params.id;

    if (id == 1) {
        const query = "SELECT orders.orderId, users.firstName, users.lastName, users.contactNo, orders.fullAmount, DATE(orders.placedDate) AS placedDate, masterdata.decription FROM `orders` INNER JOIN `users` ON users.id = orders.customerId INNER JOIN `masterdata` ON masterdata.id = orders.PaymentMethod WHERE status='1' AND isDeleted='0' OR status='4'AND isDeleted='0' OR status='5' AND isDeleted='0' OR status='6' AND isDeleted='0' ORDER BY orders.placedDate ASC";
        const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(orderDetails);
    }
    else if (id == 2) {
        const query = "SELECT orders.orderId, users.firstName, users.lastName, users.contactNo, orders.fullAmount, DATE(orders.placedDate) AS placedDate, masterdata.decription FROM `orders` INNER JOIN `users` ON users.id = orders.customerId INNER JOIN `masterdata` ON masterdata.id = orders.PaymentMethod WHERE orders.status='3' AND isDeleted='0' ORDER BY orders.placedDate ASC";
        const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(orderDetails);
    }
    else if (id == 3) {
        const query = "SELECT orders.orderId, users.firstName, users.lastName, users.contactNo, orders.fullAmount, DATE(orders.placedDate) AS placedDate, masterdata.decription FROM `orders` INNER JOIN `users` ON users.id = orders.customerId INNER JOIN `masterdata` ON masterdata.id = orders.PaymentMethod WHERE orders.status='40' AND isDeleted='0' ORDER BY orders.placedDate ASC";
        const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(orderDetails);
    }
    else {
        const query = "SELECT orders.orderId, users.firstName, users.lastName, users.contactNo, orders.fullAmount, DATE(orders.placedDate) AS placedDate, masterdata.decription FROM `orders` INNER JOIN `users` ON users.id = orders.customerId INNER JOIN `masterdata` ON masterdata.id = orders.PaymentMethod WHERE orders.status='38' AND isDeleted='0' ORDER BY orders.placedDate ASC";
        const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(orderDetails);
    }

})

router.get("/selectedOrderDetails/:oId", async (req, res) => {
    const id = req.params.oId;
    const query = "SELECT DISTINCT orders.orderId, orders.fullAmount,orders.PaymentMethod, orders.status, orders.specialNotes, users.firstName, users.lastName, users.contactNo FROM `orders`INNER JOIN `orderitems` ON orders.orderId = orderitems.orderId INNER JOIN `masterdata` ON masterdata.id = orders.status INNER JOIN `users` ON orders.customerId = users.id WHERE orders.orderId ='" + id + "' ";
    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
})

router.get("/selectedOrderItemDetails/:oId", async (req, res) => {
    const id = req.params.oId;
    const query = "SELECT orderitems.quantity, orderitems.size, designs.design_name, designs.coverImage FROM `orderitems` INNER JOIN `designs` ON orderitems.itemId = designs.id WHERE orderitems.orderId ='" + id + "'";
    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
})

router.post("/statusChange", async (req, res) => {
    const orderId = req.body.orderId;
    const status = req.body.status;

    if (status == 1 || status == 6 || status == 5) {
        const query = "UPDATE orders SET status = '3' WHERE orderId='" + orderId + "'";
        const statusChanged = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json(statusChanged);
    }
    else {
        const query = "UPDATE orders SET status = '40' WHERE orderId='" + orderId + "'";
        const statusChanged = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json(statusChanged);
    }
})


module.exports = router;
