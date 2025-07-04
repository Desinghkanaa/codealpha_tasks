const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');



app.use(express.json());
app.use(cors());

//Database connection with mongoDb mongodb+srv://desingh123:desingh@2003@cluster0.gwaox6q.mongodb.net/

mongoose.connect("mongodb+srv://desinghkanaa:00001111@cluster0.tphusgz.mongodb.net/")


//API Creation
app.get("/", (req, res) => {
    res.send("Express App is running")
})

//Image Store Engine
const storage = multer.diskStorage({
    destination: './upload/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: storage })

//Creating and upload Endpoint of the image
// app.use('/image', express.static('/upload/image'))
app.use('/image', express.static(path.join(__dirname, 'upload/image')));


app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({
        success: true,
        image_url: `http://localhost:${port}/image/${req.file.filename}`,
    });
});








//Creating Schema end point

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true
    },
})


app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product)
    await product.save();
    console.log("Saved")

    res.json({
        success: true,
        name: req.body.name,
    })
})


//Creating API for deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All product fetched")
    res.send(products);
})

//Schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//Creating end point for registed user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({
        email: req.body.email
    })
    if (check) {
        return res.status(400).json({ success: false, error: "Existing user found" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})




//Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
})


//Creating endpoint for new collection
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetch")
    res.send(newcollection)

})


//Creating endpoint for women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: 'women' })
    let popular_in_women = products.slice(0, 4);
    console.log("popular in women fetched");
    res.send(popular_in_women)

})


//creating middleware to fetch user 
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authendicate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "plese authenticate valid token" })
        }
    }
}


//Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    // console.log(req.body, req.user)
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.ItemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})


//Creating endpoint for removing products in cartdata
app.post('/removeCart', fetchUser, async (req, res) => {
    console.log("Removed:", req.body.ItemId)
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.ItemId] > 0) {
        userData.cartData[req.body.ItemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added")
    }

})


//creating endpoint to get cartdata
app.post('/getcart',fetchUser, async (req, res)=>{
    console.log("GetCart");
    
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port)
    }
    else {
        console.log("Error :" + error);

    }
})

